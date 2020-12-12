const Async = require('async');

module.exports = (opts) => {
  return function(files, metalsmith, done) {
    const convert = (fileKey, done) => {
      if (!fileKey.endsWith('.html')) {
        return done();
      }

      const file = files[fileKey];
      const content = file.contents.toString('utf8');

      file.contents = Buffer.from(content.replace(
        /src\=\"\.\.\/\.\.\/images/gi,
        `src="${opts.hostname}/writing/images`
      ));

      return done();
    };

    Async.eachSeries(Object.keys(files), convert, done);
  };
};
