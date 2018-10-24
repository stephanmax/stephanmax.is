const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const dateInFileName = require('metalsmith-date-in-filename')
const moment = require('metalsmith-moment')
const collections = require('metalsmith-collections')
const paths = require('metalsmith-paths')
const debug = require('metalsmith-debug')
const metallic = require('metalsmith-metallic')
const slug = require('metalsmith-slug')

const isDev = !!process.env.DEVELOPMENT

module.exports = function() {
  metalsmith(__dirname)
    .metadata({
      site: {
        author: 'Stephan Max',
        name: 'stephanmax.is',
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
    .use(dateInFileName({
      override: true
    }))
    .use(moment(['date']))
    .use(collections({
      posts: {
        pattern: ['writing/*.md'].concat(isDev ? ['writing/drafts/*.md'] : []),
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(metallic())
    .use(markdown())
    .use(slug({
      pattern: ['*.md'],
      renameFiles: true,
      lower: true
    }))
    .use(paths())
    .use(layouts({
      engine: 'ejs',
      directory: 'src/_layouts',
      default: 'index.ejs',
      pattern: ['**/*.html', '*.html']
    }))
    .use(debug())
    .build(function (err) {
      if (err) {
        console.log('Build failed:', err)
      }
      else {
        console.log('Build complete.')
      }
    })
  }
