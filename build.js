const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const excerpts = require('metalsmith-excerpts');
const layouts = require('metalsmith-layouts');
const metalsmithDebug = require('metalsmith-debug');
const syntaxHighlighting = require('metalsmith-prism');

const markdown = require('./plugins/metalsmith-markdown');

const metadata = require('./data/metadata.json');

const filesToIgnore = [
  '.DS_Store'
];

metalsmith(__dirname)
.metadata(metadata)
.source('./src')
.destination('./build')
.clean(false)
.ignore(filesToIgnore)
.use(markdown())
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
  pattern: ['**/*.xml', '**/*.html', '*.html']
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
