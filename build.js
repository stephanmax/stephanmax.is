const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const marked = require('marked');
const metalsmithDebug = require('metalsmith-debug');
const syntaxHighlighting = require('metalsmith-prism');

const metadata = require('./data/metadata.json');

const filesToIgnore = [
  '.DS_Store'
];

const mdRenderer = new marked.Renderer();

mdRenderer.image = (href, title, alt) => {
  if (title) {
    return `<figure><img src="${href}" alt="${alt}" title="${title}"><figcaption>${title}</figcaption></figure>`;
  }
  else {
    return `<img src="${href}" alt="${alt}">`;
  }
}
// https://github.com/markedjs/marked/issues/773
mdRenderer.paragraph = (text) => {
  if (text.startsWith('<figure') && text.endsWith('</figure>')) {
    return text;
  }
  else {
    return `<p>${text}</p>`;
  }
}
mdRenderer.heading = (text, level, raw, slugger) => {
  const slug = slugger.slug(text);
  return `
    <h${level} id="${slug}">
      <a href="#${slug}" title="Permalink to '${text}'">${text}</a>
    </h${level}>
  `;
};

metalsmith(__dirname)
.metadata(metadata)
.source('./src')
.destination('./build')
.clean(false)
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
.use(layouts({
  engine: 'ejs',
  directory: 'layouts',
  default: 'article.ejs',
  pattern: ['**/*.html', '*.html', '**/*.xml']
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
