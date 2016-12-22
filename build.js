var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var dateInFileName = require('metalsmith-date-in-filename');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
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
  .use(collections({
    posts: {
      pattern: 'posts/*.html',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'src/_layouts',
    default: 'post.html',
    pattern: '*.html',
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  }))
  .use(serve({
    port: 8083,
    verbose: true
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true
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
