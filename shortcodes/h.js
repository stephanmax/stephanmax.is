module.exports = (buf, opts) => {
  const id = encodeURIComponent(buf.trim().replace(/\s+/g, '-').toLowerCase());
  
  return `<h${opts.level}>${buf} <a id="${id}" class="anchor" href="#${id}" aria-hidden="true">#</a></h${opts.level}>`;
}
