const fs = require('fs');

module.exports = (buf, opts) => {
  let svg = fs.readFileSync(`./assets/img/${buf}.svg`, {encoding: "utf8"});

  if (opts.width) {
    svg = svg.replace('<svg ', `<svg width="${opts.width}" `);
  }

  return svg;
}
