var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var dateInFileName = require('metalsmith-date-in-filename');
var dateFormatter = require('metalsmith-date-formatter');
var collections = require('metalsmith-collections');
var drafts = require('metalsmith-drafts');
var paths = require('metalsmith-paths');
var models = require('metalsmith-models');

var handlebars = require('handlebars');

metalsmith(__dirname)
  .metadata({
    site: {
      author: 'Stephan Max',
      name: 'stephanmax.is',
      description: 'Portfolio, blog, and digital playground of software engineer Stephan Max',
      location: 'Hamburg'
    }
  })
  .source('./src')
  .destination('./build')
  .ignore([
    '_**'
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
    engine: 'handlebars',
    directory: 'src/_layouts',
    default: 'index.html',
    pattern: '*.html',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Build complete.');
    }
  });
