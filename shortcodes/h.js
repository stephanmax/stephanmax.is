module.exports = (buf, opts) => {
  const id = encodeURIComponent(buf.trim().replace(/\s+/g, '-').toLowerCase());
  
  return `<h${opts.level}><a id="${id}" href="#${id}">${buf}</a></h${opts.level}>`;
}
