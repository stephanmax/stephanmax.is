---
title: "X3D in the Browser"
published: 2020-06-04
---

This semester I am attending <i>Information Visualization on the Internet</i> at the <span lang="de">Fernuniversität</span> (distance university) Hagen where we recently started dealing with declarative 3D graphics and the standards <abbr title="Virtual Reality Modeling Language">VRML</abbr> and <abbr title="Extensible 3D Graphics">X3D</abbr>. This is a short tutorial on how to render an X3D scene in the browser.

We will start from absolute scratch. This is what you will need:

* A [WebGL-capable browser](https://www.x3dom.org/contact/)
* A text editor (or your favorite code editor, IDE, …)

You are just here for the result and not interested in coding it yourself? No problem, just head over to the [Glitch app](https://x3d-in-browser.glitch.me/) I prepared and play around with it. You can even save that page to your local machine and dissect it there—it is just a single HTML file.

OK, let’s get our hands dirty, shall we? Spin up your editor and create a new HTML file. It doesn’t matter what you name it. We will start with an HTML skeleton.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X3D in the Browser</title>
</head>
<body>
  <h1>X3D in the Browser</h1>
</body>
</html>
```

Next up, we will include the fantastic <a href="">X3DOM</a> (pronounced <i>X-Freedom</i>) runtime in our code. The official standard [X3D](https://www.web3d.org/) is an amazing push from the Web 3D Consortium to make 3D scenes declarative and a first-class citizen of the open web. Unfortunately, to this date no browser implements this standard out of the box. That’s where X3DOM comes in and does all the heavy lifting for us. It allows us to throw X3D scene code straight into our HTML and even to interact with it via the JavaScript <abbr title="Document Object Model">DOM</abbr> <abbr title="Application Programming Interface">API</abbr>.

All we need to do is include X3DOM’s JavaScript and CSS file. (X3DOM is also available [via npm](https://github.com/x3dom/dist) and thus the <i>unpckg</i> CDN.) If you were following a different tutorial, worked inside a web server environment, and got strange errors along the lines of “Mixed content; this request has been blocked,” make sure the URLs you copy and paste start with the secure `https://`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X3D in the Browser</title>

  <script src="https://www.x3dom.org/download/x3dom.js"></script> 
  <link rel="stylesheet" href="https://www.x3dom.org/download/x3dom.css">
</head>
<body>
  <h1>X3D in the Browser</h1>
</body>
</html>
```

And that is almost it! All that’s left to do for us is adding an X3D scene and let X3DOM do the rest:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X3D in the Browser</title>

  <script src="https://www.x3dom.org/download/x3dom.js"></script> 
  <link rel="stylesheet" href="https://www.x3dom.org/download/x3dom.css">
</head>
<body>
  <h1>X3D in the Browser</h1>
  <x3d width="600px" height="400px"> 
    <scene> 
      <shape> 
        <appearance> 
          <material diffuseColor="1 0 0"></material> 
        </appearance> 
        <box></box> 
      </shape>
    </scene> 
  </x3d>
</body>
</html>
```

Open the HTML page above in your WebGL-capable browser and you will be greeted by a red cube that you can pan around, rotate, zoom in on…

![A red rotated cube rendered inside the browser](/images/x3d-in-browser/simple_demo.png)

I know it might not seem much, but remember that this is a declarative 3D scene right inside your browser that you have absolute control over. Head on over to my [app on Glitch](https://x3d-in-browser.glitch.me/) to see how you can easily change the material color—literally—at the push of a button.

From here on the sky’s the limit, really. As a next step, I can recommend checking out [X3DOM’s examples portal](https://www.x3dom.org/examples/) for more interesting and complete demos.
