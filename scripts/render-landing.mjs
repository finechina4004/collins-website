import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { editorial } from './project-editorial.mjs';

const root = new URL('../public/', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const assetVersion = path => createHash('sha256').update(read(path)).digest('hex').slice(0, 12);
const config = read('site-config.js');
const phone = config.match(/phone:\s*'([^']+)'/)[1];
const phoneLabel = config.match(/phoneLabel:\s*'([^']+)'/)[1];
const base = 'https://collinscustompools.com/';
const brand = 'Collins Custom Pools & Backyards';
const pages = new Map();
const navigation = [['Work', '/work'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']];

const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const source = JSON.parse(read('content/projects.json')).projects;
const projects = Object.entries(editorial).map(([slug, details]) => {
  const project = source.find(item => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  const previousCover = project.photos.find(photo => photo.id === project.coverId) ?? project.photos[0];
  const originalOrder = [previousCover, ...project.photos.filter(photo => photo !== previousCover)];
  const selected = details.sequence.map(id => {
    const photo = project.photos.find(item => item.id.endsWith(id));
    if (!photo) throw new Error(`Unknown photograph: ${slug}/${id}`);
    return photo;
  });
  return { ...project, ...details, cover: selected[0], selected, originalOrder };
});
if (projects.length !== source.length) throw new Error('Every project needs an editorial entry.');
const [woodland, supper, ballfield] = projects;
const projectUrl = project => `/albums/${project.slug}`;
const shareImage = woodland.photos.find(photo => photo.id === 'black-tie-08');

function picture(photo, priority = false) {
  return `<img src="/${escape(photo.src)}" alt="${escape(photo.alt || photo.caption)}" width="${photo.width}" height="${photo.height}" loading="${priority ? 'eager' : 'lazy'}" decoding="async"${priority ? ' fetchpriority="high"' : ''}>`;
}

function head(title, description, path, { image = shareImage, scripts = [], missing = false } = {}) {
  const url = new URL(path, base).href;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#263a2b">
  <meta name="robots" content="${missing ? 'noindex,follow' : 'index,follow'}">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  ${missing ? '' : `<link rel="canonical" href="${url}">`}
  <link rel="icon" type="image/svg+xml" href="/assets/collins-favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${new URL(image.src, base).href}">
  <meta property="og:image:alt" content="${escape(image.alt || image.caption)}">
  <meta name="twitter:card" content="summary_large_image">
  <link href="/site.css?v=${assetVersion('site.css')}" rel="stylesheet"/>
  ${scripts.map(script => `<script src="/${script}?v=${assetVersion(script)}" defer></script>`).join('\n  ')}
</head>`;
}

function header(active) {
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="shell header-inner">
    <a class="wordmark" href="/" aria-label="Collins home">
      <img src="/assets/collins-wordmark.svg" alt="${escape(brand)}" width="560" height="150">
    </a>
    <nav aria-label="Main navigation">
      ${navigation.map(([label, href]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ')}
    </nav>
    <a class="header-phone" href="tel:${phone}" aria-label="Call Collins at ${phoneLabel}"><span>${phoneLabel}</span><b>Call</b></a>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="shell footer-inner">
    <div><a class="footer-name" href="/">Collins</a><p>Family-owned in Aubrey, Texas.</p></div>
    <nav aria-label="Footer navigation">${navigation.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</nav>
    <a class="footer-phone" href="tel:${phone}">${phoneLabel}</a>
  </div>
</footer>`;
}

function page(path, title, description, content, options = {}) {
  const output = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  pages.set(output, `${head(title, description, path, options)}
<body>
${header(options.active ?? path)}
<main id="main">${content}</main>
${footer()}
${options.dialog ?? ''}
</body>
</html>
`.replace(/^ +$/gm, ''));
}

const textChase = (className = 'button') => `<a class="${className}" href="sms:${phone}">Text Chase</a>`;
const callCollins = (className = 'button button-quiet') => `<a class="${className}" href="tel:${phone}">Call Collins</a>`;

function projectCard(project, { lead = false, priority = false } = {}) {
  return `<article class="project-card ${lead ? 'project-card-lead' : ''}" data-color="${project.color}">
  <a href="${projectUrl(project)}" data-album-slug="${project.slug}"${lead ? ` aria-describedby="summary-${project.slug}"` : ''}>
    <div class="project-image">${picture(project.cover, priority)}</div>
    <div class="project-text">
      <h3>${escape(project.title)}</h3>
      <p id="summary-${project.slug}">${escape(project.summary)}</p>
      <span class="project-link" aria-hidden="true">View project</span>
    </div>
  </a>
</article>`;
}

function contactBand() {
  return `<section class="contact-band" id="contact">
  <div class="shell contact-band-inner">
    <div><h2>Let’s talk about your yard.</h2><p>Send me your town and what you’ve got in mind. A picture of the yard helps.</p></div>
    <div class="actions">${textChase('button button-light')} ${callCollins('button button-outline')}</div>
  </div>
</section>`;
}

const builds = [
  { id: 'custom-pools', title: 'New custom pools', text: 'We’ll walk the yard with you and talk through where the pool fits, where the steps go, and how much room you want around the water.', project: woodland },
  { id: 'complete-backyards', title: 'Complete backyards', text: 'If you want a patio and a place to cook, we’ll lay them out with the pool from the start. We also build pergolas and shade structures, turf, fire features, saunas, and backyard courts.', project: supper },
  { id: 'spas-and-remodels', title: 'Spas & pool remodels', text: 'Add a spa, update the finish or tile, or talk through a bigger change to the pool you already have.', project: projects.find(project => project.slug === 'mr-bears-residence') },
];

pages.set('index.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#203326">
  <title>Collins Custom Pools &amp; Backyards | North DFW</title>
  <meta name="description" content="Custom pools and backyards in North DFW. Call or text Chase at 469-500-7713 to talk about your yard.">
  <link rel="icon" href="/assets/collins-favicon.svg">
  <link rel="stylesheet" href="/pool-home.css">
  <link rel="canonical" href="https://collinscustompools.com/">
</head>
<body>
  <main>
    <img class="yard" src="/assets/dallas-pool.webp" fetchpriority="high" alt="Backyard pool beneath mature trees with the Dallas skyline in the distance.">
    <h1><span class="name">COLLINS</span><span class="trade">Custom Pools &amp; Backyards</span></h1>
    <address aria-label="Contact Collins">
      <div class="phone"><a href="tel:+14695007713" aria-label="Call Chase at 469-500-7713">469-500-7713</a><a class="text" href="sms:+14695007713">Text Chase</a></div>
      <a class="email" href="mailto:info@collinscustompools.com">info@collinscustompools.com</a>
    </address>
  </main>
</body>
</html>
`);

page('/work', `Our Work | ${brand}`,
  'See eight completed pools and backyards from Collins, including wooded retreats, outdoor kitchens and backyard sports courts.',
  `
<div class="shell section">
  <header class="page-intro"><h1>Our work.</h1><p>Eight backyards, from a pool tucked into the woods to one with its own baseball diamond.</p></header>
  <div class="project-grid">${projects.map((project, index) => projectCard(project, { lead: index === 0, priority: index === 0 })).join('\n')}</div>
</div>
${contactBand()}
`);

page('/services', `Pool & Backyard Services | ${brand}`,
  'Collins builds new custom pools, complete backyards, spas and pool remodels in Aubrey and across North DFW.',
  `
<div class="shell section">
  <header class="page-intro"><h1>What we build.</h1><p>Some yards need a pool and a little deck. Others need room for a grill, a covered table, and somewhere for the kids to play. We can walk through either with you.</p></header>
  <div class="service-list">
    ${builds.map(build => `<section class="service-row" id="${build.id}">
      <div><h2>${escape(build.title)}</h2><p>${escape(build.text)}</p><a class="text-link" href="${projectUrl(build.project)}">${escape(build.project.title)}</a></div>
      <a class="service-image" href="${projectUrl(build.project)}" aria-label="View ${escape(build.project.title)}">${picture(build.project.cover)}</a>
    </section>`).join('\n')}
  </div>
</div>
<section class="build-strip"><div class="shell section">
  <div class="section-heading"><h2>From yard walk to first swim.</h2></div>
  <ol class="process-list" role="list">
    <li><h3>Walk the yard</h3><p>We’ll look at where the pool could sit, how equipment can get into the yard, and what you want to keep.</p></li>
    <li><h3>Draw up the plan</h3><p>We work through the design, scope, and price with you, then line up the permits and inspections the job calls for.</p></li>
    <li><h3>Build and start it up</h3><p>We go from excavation and shell to decking and finishes, then get the pool running and walk you through it.</p></li>
  </ol>
</div></section>
${contactBand()}
`);

page('/about', `About Collins | ${brand}`,
  'Meet Chase and the family behind Collins Custom Pools & Backyards, a family-owned pool and backyard builder in Aubrey, Texas.',
  `
<div class="shell section about-spread">
  <header class="page-intro"><p class="eyebrow">Aubrey, Texas</p><h1>Meet the family behind Collins.</h1></header>
  <div class="about-letter">
    <p>Howdy, I’m Chase. I graduated from Gunter, and my family and I run Collins Custom Pools &amp; Backyards out of Aubrey.</p>
    <p>I’ll help you figure out what makes sense for your yard. My stepdad has been building pools for decades and runs the work on site. On the first walk we’ll look at things like where the afternoon shade falls, how far the grill is from the back door, and where you’d put a table.</p>
    <p>If you’ve been kicking around an idea for your yard, give me a call. We can start there.</p>
    <p class="signature">Chase</p>
    <a class="text-link" href="/work">See the yards we’ve built</a>
  </div>
</div>
${contactBand()}
`);

page('/contact', `Call or Text Collins | ${brand}`,
  'Call or text Collins at 469-500-7713 to discuss a custom pool or backyard project in Aubrey, Denton County or North DFW.',
  `
<div class="shell section contact-page">
  <header class="page-intro"><h1>Let’s talk<br>backyards.</h1><p>Text me your town and what you’re thinking about for the yard. If you have a photo from the back door, send that too.</p></header>
  <section class="contact-card" aria-labelledby="contact-card-title">
    <h2 id="contact-card-title">Call or text Chase</h2>
    <a class="contact-number" href="tel:${phone}">${phoneLabel}</a>
    <div class="actions">${textChase()} ${callCollins()}</div>
    <button class="copy-link" type="button" data-copy-phone="${phoneLabel}" hidden>Copy number</button>
    <p class="contact-copy-status" role="status"></p>
  </section>
  <section class="service-area"><h2>Where we build</h2><p>We’re based in Aubrey and work around Denton County and North DFW, including Denton, Little Elm, Prosper, Celina, and Frisco.</p></section>
</div>
`, { scripts: ['landing.js'] });

function galleryLink(project, photo, priority = false) {
  const originalNumber = project.originalOrder.indexOf(photo) + 1;
  return `<a class="photo-open" href="/${escape(photo.src)}" data-photo="${originalNumber}" data-caption="${escape(photo.caption || project.title)}" aria-label="Enlarge photo: ${escape(photo.caption || photo.alt || project.title)}">${picture(photo, priority)}</a>`;
}

function photoViewer(project) {
  return `<dialog class="photo-viewer" id="photo-viewer" aria-label="${escape(project.title)} photos">
  <div class="viewer-header"><p>${escape(project.title)}</p><button type="button" data-close aria-label="Close full-size photograph">Close</button></div>
  <div class="viewer-stage"><img alt=""><p class="viewer-error" role="status" hidden>This photo could not load. Try the next photograph or close this viewer.</p></div>
  <div class="viewer-footer">
    <div><p class="viewer-caption"></p><span class="viewer-count" role="status"></span></div>
    <div class="viewer-controls"><button type="button" data-previous aria-label="Previous photograph">Previous</button><button type="button" data-next aria-label="Next photograph">Next</button></div>
  </div>
</dialog>`;
}

for (const project of projects) {
  const related = projects.find(item => item.slug === project.related);
  const remaining = project.photos.filter(photo => !project.selected.includes(photo));
  page(projectUrl(project), `${project.title} | ${brand}`, project.summary, `
<div class="shell section album-page" data-color="${project.color}">
  <a class="text-link album-back" href="/work">All projects</a>
  <header class="album-intro">
    <div><h1>${escape(project.title)}</h1><p>${escape(project.summary)}</p></div>
    <ul aria-label="Project features">${project.features.map(feature => `<li>${escape(feature)}</li>`).join('')}</ul>
  </header>
  <div class="album-lead" style="--lead-width:${project.cover.width}px">${galleryLink(project, project.cover, true)}</div>
  <section id="photographs" aria-labelledby="photos-title">
    <h2 class="sr-only" id="photos-title">Project photos</h2>
    <div class="album-spread">${project.selected.slice(1).map(photo => `<figure>${galleryLink(project, photo)}<figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>
    ${remaining.length ? `<details class="more-photos"><summary>More photos from this yard <span>(${remaining.length})</span></summary>
      <div class="album-spread">${remaining.map(photo => `<figure>${galleryLink(project, photo)}<figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>
    </details>` : ''}
  </section>
</div>
<section class="related-strip"><div class="shell section">
  <div class="section-heading"><h2>Another backyard.</h2><a class="text-link" href="/work">All projects</a></div>
  ${projectCard(related, { lead: true })}
</div></section>
${contactBand()}
`, { image: project.cover, scripts: ['gallery.js'], dialog: photoViewer(project) });
}

page('/404', `Page not found | ${brand}`, 'Find Collins projects, services and contact information.', `
<div class="shell section"><header class="page-intro"><h1>Page not found.</h1><p>You can get back to Collins from here.</p><a class="button" href="/">Back to Collins</a></header></div>
`, { missing: true });

const urls = ['/', ...navigation.map(([, path]) => path), ...projects.map(projectUrl)];
pages.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `  <url><loc>${new URL(path, base).href}</loc></url>`).join('\n')}
</urlset>
`);

const checking = process.argv.includes('--check');
for (const [path, content] of pages) {
  if (checking) {
    if (read(path) !== content) throw new Error(`Output is stale: ${path}. Run npm run build:assets.`);
  } else {
    writeFileSync(new URL(path, root), content);
  }
}
const photoCount = projects.reduce((total, project) => total + project.photos.length, 0);
console.log(`${checking ? 'Verified' : 'Rendered'} ${urls.length} Collins pages with ${photoCount} original project photographs.`);
