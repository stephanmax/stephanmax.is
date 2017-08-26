const metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const dateInFileName = require('metalsmith-date-in-filename')
const dateFormatter = require('metalsmith-date-formatter')
const collections = require('metalsmith-collections')
const drafts = require('metalsmith-drafts')
const paths = require('metalsmith-paths')
const models = require('metalsmith-models')
const debug = require('metalsmith-debug')

module.exports = function() {
  metalsmith(__dirname)
    .metadata({
      site: {
        author: 'Stephan Max',
        name: 'stephanmax.is',
        description: 'Portfolio, blog, and digital playground of software engineer Stephan Max'
      },
      location: 'Hamburg'
    })
    .source('./src')
    .destination('./build')
    .ignore([
      '_**',
      '.DS_Store'
    ])
    .use(drafts())
    .use(dateInFileName({
      override: true
    }))
    .use(dateFormatter({
      dates: 'date'
    }))
    .use(collections({
      posts: {
        pattern: 'posts/*.md',
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(markdown())
    .use(models({
      directory: 'src/_models'
    }))
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
