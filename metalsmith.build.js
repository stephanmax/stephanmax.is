const Metalsmith = require('metalsmith');
const Collections = require('metalsmith-auto-collections');
const DateInFileName = require('metalsmith-date-in-filename');
const Debug = require('metalsmith-debug');
const Excerpts = require('metalsmith-excerpts');
const Feed = require('metalsmith-feed');
const Layouts = require('metalsmith-layouts');
const Moment = require('metalsmith-moment');
const Shortcodes = require('metalsmith-shortcode-parser');
const Slug = require('metalsmith-slug');
const SyntaxHighlighting = require('metalsmith-prism');
const Updated = require('metalsmith-updated');

const mathjax = require('./metalsmith-mathjax.js');
const metadata = require('./metadata.json');


module.exports = () => {
  Metalsmith(__dirname)
  .metadata(metadata)
  .source('./src')
  .destination('./build')
  .clean(false)
  .ignore([
    '.DS_Store'
  ])
  .use(Excerpts())
  .use(DateInFileName({
    override: true
  }))
  .use(Updated({
    verbose: true
  }))
  .use(Shortcodes({
    files: ['.html'],
    shortcodes: require('./shortcodes')
  }))
  .use(mathjax())
  .use(Collections({
    pattern: ['writing/*.html'],
    settings: {
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(Moment(['date', 'updated']))
  .use(SyntaxHighlighting())
  .use(Slug({
    pattern: ['*.html'],
    renameFiles: true,
    lower: true
  }))
  .use(Feed({
    collection: 'writing',
    limit: false,
    destination: 'feed.xml',
    preprocess: file => ({
      ...file,
      url: `${metadata.site.url}/${file.collection}/${file.slug}`,
      description: file.contents
    })
  }))
  .use(Layouts({
    engine: 'ejs',
    directory: 'layouts',
    default: 'article.ejs',
    pattern: ['**/*.html', '*.html']
  }))
  .use(Debug())
  .build(err => {
    if (err) {
      console.log('❌ Build failed:', err)
    }
    else {
      console.log('✅ Build complete.')
    }
  })
};
