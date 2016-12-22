var metalsmith = require('metalsmith');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'stephanmax.is',
      description: "Portfolio, blog, and digital playground of software engineer Stephan Max"
    }
  })
  .source('./src')
  .destination('./public')
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Build complete.');
    }
  });
