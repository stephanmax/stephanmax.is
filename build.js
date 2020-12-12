const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const marked = require('marked');
const metalsmithDebug = require('metalsmith-debug');
const moment = require('metalsmith-moment');
const syntaxHighlighting = require('metalsmith-prism');

const absoluteImagePaths = require('./plugins/absolute-imagepaths.js');

const metadata = require('./data/metadata.json');

const mdRenderer = new marked.Renderer();

mdRenderer.image = (href, title, text) => title ? `
  <figure>
    <img src="${href}" alt="${text}" title="${title}" />
    <figcaption>${title}</figcaption>
  </figure>
` : `
  <img src="${href}" alt="${text}" />
`;

const filesToIgnore = [
  '.DS_Store'
];

metalsmith(__dirname)
.metadata(metadata)
.source('./src')
.destination('./build')
.clean(true)
.ignore(filesToIgnore)
.use(markdown({
  renderer: mdRenderer
}))
.use(collections({
  writing: {
    pattern: ['writing/**/*.html'],
    sortBy: 'published',
    reverse: true
  }
}))
.use(syntaxHighlighting())
.use(excerpts())
.use(moment([
  'published',
  'updated'
]))
// Make image paths absolute in production so Netlify does not use Cloudfront CDN
// https://community.netlify.com/t/cdn-change-netlify-cdn-or-cloudfront/3582/10
.use(absoluteImagePaths({
  hostname: process.env.NODE_ENV === 'production' ? metadata.site.url : ''
}))
.use(layouts({
  engine: 'ejs',
  directory: 'layouts',
  default: 'article.ejs',
  pattern: ['**/*.html', '*.html']
}))
.use(metalsmithDebug())
.build(err => {
  if (err) {
    console.log('❌ Build failed:', err)
  }
  else {
    console.log('✅ Build complete.')
  }
});
