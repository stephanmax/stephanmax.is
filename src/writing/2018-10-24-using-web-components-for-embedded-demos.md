---
title: Using Web Components for Embedded Demos
layout: post.ejs
custom_css: highlight.css
---

When I read Heydon Pickering’s Smashing Magazine article on [Building Pattern Libraries With Shadow DOM In Markdown](https://www.smashingmagazine.com/2017/07/pattern-libraries-in-markdown/) last year it felt like a dream come true. He describes a technique to bundle up markup, styles, and JavaScript into a neat self-contained and isolated package ready to be embedded straight in your Markdown code: A <i>web component</i>. This buzzword had already been floating around for a while back then and it certainly is even more important today.

I have to admit that I was put off by the sheer amount of new stuff that piggybacked on Heydon’s article (shadow DOM vs “real” DOM, HTML templates, shortcodes) plus the flaky browser support. Today, with the new Firefox 63 release that adds support for exactly these features, I think it is time to revisit web components.

## What Are Web Components?

Web components are isolated, reusable chunks of code that can be composed to form a web application. So far, so vague. The basic idea is to put together HTML, CSS, and JavaScript and  move that package around a bigger web project without risking that it compromises other components by leaking styles or behavior or that it gets disturbed by its surroundings.

The four standards necessary to bring web components to life are

* Shadow DOM
* HTML templates
* HTML imports
* Custom components

We will only talk about the former two in this article.

## Scoped Styles with the Shadow DOM

Eric Bidelman has done a fantastic job [explaining the <i>Shadow DOM</i>](https://developers.google.com/web/fundamentals/web-components/shadowdom) already. Let’s recap by walking through a piece of code and seeing an example:

```javascript
var shadowHost = document.getElementById('demo'); // 1.
var shadowRoot = shadowHost.attachShadow({mode: 'open'}); // 2.
shadowRoot.innerHTML = '<button>Hello from the Shadow DOM</button>'; // 3.
```

1. The shadow DOM has to be attached to a node of the actual DOM which is called <b>shadow host</b>.
2. Once attached we have access to the <b>shadow root</b> which can be treated as just another DOM node. That means we can attach more DOM nodes to it, for example by setting the `innerHTML` property or calling `appendChild`.
3. Everything we add to the shadow root spans the <b>shadow tree</b>. In the example above it is only the `<button>` node.

All that leads to the button appearing below. Go ahead, click it, it’s real:

[demo fallback="PyXYrM"]
<button>Hello from the Shadow DOM</button>
[/demo]

Granted, the button doesn’t *do* anything, so you might wonder what all the fuzz is about. After all, we could have gotten the exact same result with plain old DOM API calls. Gee, even with straight HTML! You are right, but the shadow DOM comes with <i>scoped CSS</i> which is a big deal. Let me explain with another example:

```javascript
var shadowHost = document.getElementById('demo');
var shadowRoot = shadowHost.attachShadow({mode: 'open'});
shadowRoot.innerHTML = `<p>A blue paragraph inside the Shadow DOM</p>
  <style>
    p {
      color: #00f;
      font-family: sans-serif;
    }
  </style>`;
```

Which renders:

[demo fallback="WaLNvw"]
<p>A blue paragraph inside the Shadow DOM</p>
<style>
  p {
    color: #00f;
    font-family: sans-serif;
  }
</style>
[/demo]

Although we just use the `p` selector in our shadow DOM CSS, it does not interfere with the styling of the `p` elements on the rest of the page. No need to use esoteric class names, no need to keep track of the specificity—all thanks to the shadow DOM and its scoped CSS. To put it in another way, the blue paragraph above does not know it is embedded somewhere. And it doesn’t care.

## Adding JavaScript with HTML Templates

Our little demo components comprise markup and styles so far. Now we want to add behavior with JavaScript. You might want to try something like this:

```javascript
var shadowHost = document.getElementById('demo');
var shadowRoot = shadowHost.attachShadow({mode: 'open'});
shadowRoot.innerHTML = `<p>A blue paragraph inside the Shadow DOM</p>
  <style>
    p {
      color: #00f;
      font-family: sans-serif;
    }
  </style>
  <script>
    var button = demo.querySelector('button');
    button.addEventListener('click', function(e) {
      var p = document.createElement('p');
      p.textContent = 'Another paragraph inside the Shadow DOM';
      demo.appendChild(p);
    });
  </script>`;
```

Unfortunately, it doesn’t work like this. As the [W3C notes](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0), “`script` elements inserted using `innerHTML` do not execute when they are inserted.” However, we can solve this by adding the content of a HTML template to the shadow root:

```html
<template id="demo-template">
  <p>A blue paragraph inside the Shadow DOM</p>
  <p><button>Add a paragraph</button></p>

  <style>
    p {
      color: #00f;
      font-family: sans-serif;
    }
  </style>
	
  <script>
    var demo = document.getElementById('demo').shadowRoot; // B
    var button = demo.querySelector('button');
		
    button.addEventListener('click', function(e) {
      var p = document.createElement('p');
      p.textContent = 'Another paragraph inside the Shadow DOM';
      demo.appendChild(p);
    });
  </script>
</template>
```

```javascript
var shadowHost = document.getElementById('demo');
var shadowRoot = shadowHost.attachShadow({mode: 'open'});
var demoTemplate = document.getElementById('demo-template');
shadowRoot.appendChild(document.importNode(demoTemplate.content, true)); // A
```

This time the button does something:

[demo fallback="pxqoye"]
<p>A blue paragraph inside the Shadow DOM</p>
<p><button>Add a paragraph</button></p>
<style>
  p {
    color: #00f;
    font-family: sans-serif;
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

The magic happens in line `A` where we take the template’s content, import it as a DOM node, and append it to the shadow root. That way the `script` gets parsed and executed. Please note that, as opposed to the shadow DOM’s scoped CSS, JavaScript is not encapsulated from the get-go. If you query the `document` inside the shadow DOM you still target the surrounding `document`. That’s why we need line `B` to explicitly grab a handle on the  “document” established by the shadow tree below the shadow root. Moving forward we can treat the `demo` variable as if we were targetting `document`, for example call `appendChild` on it.

## A Short Node on Shortcodes

When I author code demos I want to deal with all the above as little as possible. Inspired by [Hugo’s shortcodes](https://gohugo.io/content-management/shortcodes/) I looked for a similar solution for Metalsmith (the very minimal, pluggable static site generator I use).

This is what I came up with:

* I use [metalsmith-shortcode-parser](https://github.com/csmets/metalsmith-shortcode-parser), a lightweight wrapper for [shortcode-parser](https://github.com/mendezcode/shortcode-parser), to use a shortcode with an optional caption in my Markdown: <code>&#91;demo caption="A Code Demo"&#93; ... shortcode content ... &#91;/demo&#93;</code>
* The shortcode content gets processed by a function that returns HTML and JavaScript code responsible for:
  * Calculating the MD5 hash of the shortcode content to use it as the unique id suffix inside the DOM
  * Creating an HTML `<figure>` element with the optional `<figcaption>`
  * Setting up an HTML template containing the shortcode content and appending that to a shadow DOM
  * Exposing a JavaScript variable `demo` which contains the shadow root (declared inside an <abbr title="Immediately invoked function expression">IIFE</abbr> so that `demo` and all variables in the code demo’s JavaScript do not litter the global scope)
  * Providing a fallback Codepen link if shadow DOM is not supported

Here you can find the [<code>&#91;demo&#93;</code> shortcode implementation](https://github.com/stephanmax/stephanmax.is/blob/master/shortcodes/demo.js).

## Where Do We Go from Here?

You might not have noticed that you just experienced web-component-ception. While I was talking about web components and shadow DOM I also included the accompanying demos in this very page—using web components made of shadow DOMs and HTML templates! I cannot tell you how incredibly exciting that is for me. Sure, the demos were not particularly impressive, but imagine a world where you can safely embed code experiments right inside the Markdown/HTML explaining those experiments. We are living in this world right now!

There is no need for embedding Codepen or JSFiddle anymore. Don’t get me wrong; I absolutely adore those services. In fact, I will still use links to Codepen as a fallback for Edge. But I also fancy having 100% control over my embedded code demos. The advantages are:

* Less third-party scripts, potentially leading to a faster site
* Complete control how you present/style your code demos, leading to less noise, a consistent look & feel, and offline support

In the article I linked in the intro, [Heydon Pickering underlines how this can take your pattern library to the next level](https://www.smashingmagazine.com/2017/07/pattern-libraries-in-markdown/#code-demos-without-third-parties). I believe we can also use embedded code demos to push our online tutorials to the next level. A level where demos and explanatory texts are deeply intertwined and create one coherent learning experience. Think <i>Literate Programming</i> as used in the (online) book [Physically Based Rendering](http://www.pbr-book.org/3ed-2018/Introduction/Literate_Programming.html).

I think web components can play an integral role in showcasing and explaining code right where you use it and I look forward to exploring this further.


