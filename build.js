var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var dateInFileName = require('metalsmith-date-in-filename');
var handlebars = require('handlebars');

metalsmith(__dirname)
  .metadata({
    site: {
      author: 'Stephan Max',
      name: 'stephanmax.is',
      description: 'Portfolio, blog, and digital playground of software engineer Stephan Max'
    }
  })
  .source('./src')
  .destination('./build')
  .ignore([
    '_**'
  ])
  .use(dateInFileName({
    override: true
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: 'src/_layouts',
    default: 'default.html',
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
