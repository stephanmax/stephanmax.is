const md5 = require('nano-md5')

module.exports = (buf, opts) => {
  const id = md5(buf)

  let demoCode = `<figure role="group" aria-labelledby="caption-${id}">
    <div class="demo" id="demo-${id}"></div>`
  
  if (opts.caption) {
    demoCode += `<figcaption id="caption-${id}">${opts.caption}</figcaption>`
  }

  demoCode += `</figure>
    <template id="demo-template-${id}">
      ${buf}
    </template>
    <script>
      (function() {
        var shadowHost = document.getElementById('demo-${id}');
        var shadowRoot = shadowHost.attachShadow({mode: 'open'});
        var demoTemplate = document.getElementById('demo-template-${id}');
        var demoScript = demoTemplate.content.querySelector('script');
        if (demoScript) {
          demoScript.textContent = "(function() { var demo = document.getElementById(\'demo-${id}\').shadowRoot;" + demoScript.textContent + "})()"
        }
        shadowRoot.appendChild(document.importNode(demoTemplate.content, true));
      })();
    </script>`
  
  return demoCode
}
