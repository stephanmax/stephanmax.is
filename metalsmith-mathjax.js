const Async = require('async');
const Mathjax = require('mathjax-node-page');

module.exports = (opts) => {
  return function(files, metalsmith, done) {
    const convert = (fileKey, done) => {
      const file = files[fileKey];

      if (!file.math) {
        return done();
      }

      const content = file.contents.toString('utf8');

      Mathjax.mjpage(content, {format: ['TeX']}, {html: true}, (result) => {
        file.contents = new Buffer(result);
        return done()
      });
    };

    Async.eachSeries(Object.keys(files), convert, done);
  };
};
