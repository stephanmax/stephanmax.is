const fs = require('fs');

module.exports = (buf) => {
  return fs.readFileSync(`./assets/img/${buf}.svg`);
}
