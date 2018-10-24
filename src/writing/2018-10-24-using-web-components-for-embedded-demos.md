---
title: Using Web Components for Embedded Demos
layout: post.ejs
custom_css: highlight.css
---

[demo]
<p>A blue paragraph inside the Shadow DOM</p>
<p><button>Add a paragraph</button></p>
<style>
  p {
    color: #00f;
  }
</style>
<script>
  var button = demo.querySelector('button');
  button.addEventListener('click', function(e) {
    var p = document.createElement('p');
    p.textContent = 'Another paragraph inside the Shadow DOM';
    demo.appendChild(p);
  });
</script>
[/demo]
