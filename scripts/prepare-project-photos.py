#!/usr/bin/env python3
"""Prepare multiple project ZIPs once. Writes review candidates, never the live catalog."""
import argparse, copy, hashlib, io, json, math, re, unicodedata, zipfile
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw


def key(value):
    value = re.sub(r'\(\d+\)$', '', value).strip()
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', value).lower())


def prepare(archives, catalog, output, quality=82, replace=False):
    records = json.loads(Path(catalog).read_text())['projects']
    lookup = {key(p['title']): p for p in records}
    grouped = {}
    for archive in archives:
        source = lookup.get(key(Path(archive).stem))
        if not source:
            raise ValueError(f'No exact project-title match for {Path(archive).name}')
        if source.get('photos') and not replace:
            raise ValueError(f'{source["title"]} already has photographs; review replacement explicitly.')
        grouped.setdefault(source['id'], {'source': source, 'archives': []})['archives'].append(Path(archive))
    output = Path(output).resolve()
    if output.is_relative_to(Path(__file__).resolve().parent.parent):
        raise ValueError('Use a staging directory outside the website checkout')
    output.mkdir(parents=True, exist_ok=False)
    manifest = {'projects': [], 'assets': [], 'duplicates': [], 'unsupported': []}
    for group in grouped.values():
        project = copy.deepcopy(group['source'])
        project.update(photos=[], coverId=None, status='draft', approved=False, editorial={'layout': 'photographic'})
        seen, thumbnails = set(), []
        for archive in group['archives']:
            with zipfile.ZipFile(archive) as z:
                if sum(x.file_size for x in z.infolist()) > 1024**3:
                    raise ValueError(f'{archive.name} exceeds the staging size limit')
                for entry in sorted(z.infolist(), key=lambda e: e.filename):
                    name = Path(entry.filename)
                    if entry.is_dir() or '__MACOSX' in name.parts or name.name.startswith('._'):
                        continue
                    if name.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp', '.avif'}:
                        manifest['unsupported'].append({'archive': archive.name, 'file': entry.filename})
                        continue
                    if entry.file_size > 50*1024**2:
                        raise ValueError(f'{name.name} exceeds the per-image size limit')
                    raw = z.read(entry)
                    source_hash = hashlib.sha256(raw).hexdigest()
                    if source_hash in seen:
                        manifest['duplicates'].append({'project': project['id'], 'file': entry.filename})
                        continue
                    seen.add(source_hash)
                    with Image.open(io.BytesIO(raw)) as original:
                        if original.width*original.height > 50_000_000:
                            raise ValueError(f'{name.name} exceeds the pixel limit')
                        image = ImageOps.exif_transpose(original).convert('RGB')
                    image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                    relative = Path('assets/projects')/project['slug']/(source_hash[:16]+'.webp')
                    destination = output/'public'/relative
                    destination.parent.mkdir(parents=True, exist_ok=True)
                    image.save(destination, 'WEBP', quality=quality, method=6)
                    encoded = destination.read_bytes()
                    if not encoded:
                        raise ValueError(f"Image export is empty: {name.name}")
                    with Image.open(destination) as check:
                        check.load()
                    photo_id = project['slug']+'-'+source_hash[:16]
                    project['photos'].append({'id': photo_id, 'src': relative.as_posix(), 'width': image.width,
                        'height': image.height, 'caption': '', 'alt': '', 'sourceFile': name.name,
                        'sourceSha256': source_hash})
                    manifest['assets'].append({'path': 'public/'+relative.as_posix(), 'bytes': len(encoded),
                        'sha': hashlib.sha1(b'blob '+str(len(encoded)).encode()+b'\0'+encoded).hexdigest()})
                    thumb = ImageOps.contain(image, (280, 190))
                    thumbnails.append((thumb, str(len(thumbnails)+1).zfill(2)+' / '+name.stem[-35:]))
        if not project['photos']:
            raise ValueError(f'No supported photographs for {project["title"]}')
        project['coverId'] = project['photos'][0]['id']
        project['sourceNote'] = 'Supplied archives: '+', '.join(p.name for p in group['archives'])+'. Captions, cover and story require review.'
        sheet = Image.new('RGB', (1200, math.ceil(len(thumbnails)/4)*225), '#f8f1e5')
        draw = ImageDraw.Draw(sheet)
        for i, (thumb, label) in enumerate(thumbnails):
            x, y = (i%4)*300, (i//4)*225
            sheet.paste(thumb, (x+(300-thumb.width)//2, y))
            draw.text((x+10, y+198), label, fill='#302a28')
        review = output/'review'; review.mkdir(exist_ok=True)
        sheet.save(review/(project['slug']+'.jpg'), quality=85)
        manifest['projects'].append(project)
    (output/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archives', nargs='+')
    parser.add_argument('--catalog', default='public/content/projects.json')
    parser.add_argument('--output', required=True, help='New staging directory outside the website checkout')
    parser.add_argument('--quality', type=int, default=82, choices=range(1, 101), metavar='1-100')
    parser.add_argument('--replace', action='store_true', help='Prepare replacement candidates for populated albums')
    args = parser.parse_args()
    result = prepare(args.archives, args.catalog, args.output, args.quality, args.replace)
    print(json.dumps({'projects': len(result['projects']), 'photos': len(result['assets']),
        'duplicates': len(result['duplicates']), 'unsupported': len(result['unsupported']),
        'bytes': sum(a['bytes'] for a in result['assets']), 'catalogChanged': False}))
