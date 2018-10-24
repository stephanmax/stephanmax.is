module.exports = (buf, opts) => {
  return `<div class="demo" id="demo"></div>
    <script>
      (function() {
        const shadowHost = document.getElementById('demo');
        const shadowRoot = shadowHost.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = '${buf.replace(/\r?\n|\r/g, '')}';
      })();
    </script>`
}
