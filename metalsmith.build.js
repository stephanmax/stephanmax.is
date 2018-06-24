const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const dateInFileName = require('metalsmith-date-in-filename')
const moment = require('metalsmith-moment')
const collections = require('metalsmith-collections')
const paths = require('metalsmith-paths')
const debug = require('metalsmith-debug')

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
      '_**',
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
    .use(markdown())
    .use(paths())
    .use(layouts({
      engine: 'ejs',
      directory: 'src/_layouts',
      default: 'index.ejs',
      pattern: '*.html'
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
