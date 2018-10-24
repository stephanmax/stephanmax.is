const md5 = require('nano-md5')

module.exports = (buf, opts) => {
  const id = md5(buf)
  
  return `<div class="demo" id="demo-${id}"></div>
    <template id="demo-template-${id}">
      ${buf}
    </template>
    <script>
      (function() {
        const shadowHost = document.getElementById('demo-${id}');
        const shadowRoot = shadowHost.attachShadow({mode: 'open'});
        const demoTemplate = document.getElementById('demo-template-${id}');
        shadowRoot.appendChild(document.importNode(demoTemplate.content, true));
      })();
    </script>`
}
