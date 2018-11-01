module.exports = (buf, opts) => {
  const escapedHTML = buf.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return `<pre><code class="language-${opts.language}">${escapedHTML}</code></pre>`
}
