const Metalsmith = require('metalsmith')
const Layouts = require('metalsmith-layouts')
const DateInFileName = require('metalsmith-date-in-filename')
const Moment = require('metalsmith-moment')
const Collections = require('metalsmith-auto-collections')
const Debug = require('metalsmith-debug')
const Slug = require('metalsmith-slug')
const Shortcodes = require('metalsmith-shortcode-parser')
const Feed = require('metalsmith-feed')
const SyntaxHighlighting = require('metalsmith-prism')

const metadata = require('./metadata.json')

const isDev = !!process.env.DEVELOPMENT

module.exports = () => {
  Metalsmith(__dirname)
  .metadata(metadata)
  .source('./src')
  .destination('./build')
  .clean(false)
  .ignore([
    '.DS_Store'
  ])
  .use(DateInFileName({
    override: true
  }))
  .use(Shortcodes({
    files: ['.html'],
    shortcodes: require('./shortcodes')
  }))
  .use(Collections({
    pattern: ['writing/*.html'],
    settings: {
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(Moment(['date']))
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
      url: `${metadata.site.url}/${file.collection}/${file.slug}`
    })
  }))
  .use(Layouts({
    engine: 'ejs',
    directory: 'layouts',
    default: 'index.ejs',
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
}
