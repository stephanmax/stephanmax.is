const md5 = require('nano-md5');

module.exports = (buf, opts) => {
  const id = md5(buf).substring(0, 8);
  
  return `<span class="sidenote"><input id="sidenote-${id}" type="checkbox" aria-hidden="true"><label for="sidenote-${id}">${opts.label}</label><small>${buf}</small></span>`;
}