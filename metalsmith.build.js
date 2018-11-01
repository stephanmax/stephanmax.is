const Metalsmith = require('metalsmith')
const Layouts = require('metalsmith-layouts')
const DateInFileName = require('metalsmith-date-in-filename')
const Moment = require('metalsmith-moment')
const Collections = require('metalsmith-auto-collections')
const Debug = require('metalsmith-debug')
const Slug = require('metalsmith-slug')
const Shortcodes = require('metalsmith-shortcode-parser')
const Feed = require('metalsmith-feed')
const More = require('metalsmith-more')
const SyntaxHighlighting = require('metalsmith-prism')

const isDev = !!process.env.DEVELOPMENT

module.exports = () => {
  Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Stephan Max',
      url: 'https://stephanmax.is',
      author: 'Stephan Max',
      description: 'Portfolio, blog, and digital playground of software engineer Stephan Max'
    },
    location: {
      base: 'Hamburg',
      current: 'Hamburg'
    }
  })
  .source('./src')
  .destination('./build')
  .ignore([
    '_layouts',
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
  .use(More())
  .use(Feed({
    collection: 'writing',
    limit: false,
    destination: 'feed.xml'
  }))
  .use(Layouts({
    engine: 'ejs',
    directory: 'src/_layouts',
    default: 'index.ejs',
    pattern: ['**/*.html', '*.html']
  }))
  .use(Debug())
  .build(err => {
    if (err) {
      console.log('Build failed:', err)
    }
    else {
      console.log('Build complete.')
    }
  })
}
