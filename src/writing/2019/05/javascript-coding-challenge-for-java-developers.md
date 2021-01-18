---
title: "A JavaScript Coding Challenge for Java Developers"
published: 2019-05-18
---

I recently had the pleasure of running a <i>coding dojo</i> in my company. A coding dojo is a meeting of software developers who try to solve a certain coding challenge, so-called <i>katas</i>. This method is inspired by Japanese martial arts where <i>dojo</i> is a training room and <i>kata</i> a specific exercise. In the end it is exactly that: mastering an exercise, learning by doing, and getting your hands dirty outside the scope of your day-to-day business.

We do a coding dojo once a month, with 8–12 developers, and typically with a Java kata. Lately, my coworkers have indicated interest in JavaScript, though, and since I am and always will be a JavaScript engineer I was up for the challenge—getting Java developers excited for the dynamically typed, functional, quirky-but-beautiful world of JavaScript.

## The Preparation

I knew from the beginning that I didn’t just want to take an off-the-shelf kata. Don’t get me wrong, I think solving classic algorithm puzzles with a new language is time well-spent. It’s just time I did not have. I wanted to get my colleagues excited and at the same time let them code on something with a real-world touch. In 90 minutes.

I talked to some of them and the following picture was unfolding before me:

* There was no interest in server-side Node at all. Which makes sense because none of them will code JavaScript for the server in the foreseeable future.
* They were interested in frameworks, but we are an IT consultancy and our different customers might use different tools. So which one should I choose? It also just feels wrong to me to start with Vue or React before talking about vanilla JS.
* Luckily, there was some interest in the JavaScript way of thinking and approaching things.

That gave me a good baseline: Come up with a vanilla JS coding challenge that facilitates the discussion about JavaScript’s peculiarities and paves the way to frameworks!

## The Task: Build a Simple Redux Store

That’s what I ultimately came up with and it ticked all the boxes.

* Many web applications that use frameworks like React still rely on the redux pattern for data flow and state management
* The underlying principles are not overly complicated and can be covered nicely in a little intro session before the coding dojo
* It leads to a lot of JavaScript beauty if implemented correctly (and elegantly)

Also, how cool would it be to plug our own redux store into a little React app in a second coding dojo?

I prepared a node project, a sample redux store for a collection of notes, test cases, and some intro slides to explain my thinking behind the challenge as well as the redux principles (store, actions, reducers).

My stack looked like this:

* Vanilla JS
* VS Code
* Quokka (as a scratch pad)
* Testing:
    * Mocha (Runner)
    * Chai (Assertions)
    * Sinon (Mocking)

## The Execution

Ten developers (including two with basic and two with advanced JS skills) attended the dojo and—after my little introduction—had 80 minutes to spend on the task. We settled for round-robin pair programming (driver and navigator) in 5-minute intervals with a strict test-driven development approach (red, green, refactor).

And it worked great!

It was amazing to see how open-minded my colleagues were and how excited they got over time. In the end, they managed to turn 11 out of 17 tests green (a couple of them stayed for an extra hour and implemented another 5) and built a simple working redux implementation.

Here are just some of the JavaScript topics that we touched on the go:

* Immutability
* Objects
* Higher-order functions
* Deconstruction
* Rest and spread operator
* Scope
* Fat-arrow notation
* Closures and `this`
* Testing
* Code organization and modules

Not too shabby for 90 minutes. But the best part was the real excitement for JavaScript that I sensed in the room. The feedback was great and I will definitely do more JavaScript coding dojos from now on.

## Do You Want to Try?

If you are intrigued and want to tackle this kata with your team as well, head over to the [Github repository](https://github.com/stephanmax/javascript-kata-redux). You can checkout the tag `start` for an initial node project with prepared but disabled tests and the tag `sample-solution` for my humble take on implementing a simple redux store for notes. The latest head of the `master` branch includes the sample solution plus a little middleware implementation that you could use for further demonstrations (logging actions) or discussions (stacking middleware).

If you happen to actually execute this coding kata in one our your coding dojos, I would love to hear back from you how it went.
