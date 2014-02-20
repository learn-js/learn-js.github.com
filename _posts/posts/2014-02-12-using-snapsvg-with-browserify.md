---
title: "Using Snap.svg with Browserify"
slug: using-snapsvg-with-browserify
published: false
layout: post
type: post
---

It's not currently possible to use Snap.svg with Browserify by requiring the snapsvg package that's distributed on [npm](http://npmjs.org), but there is a workaround!

A [pull request by Sam Breed](https://github.com/adobe-webplatform/Snap.svg/pull/170) adds support for the Node.js 

Temporarily, I am using my own fork that pulls in Sam's changes and provides a build that incorporates those changes.

You can install that fork like this:

```
npm install --save sethvincent/Snap.svg#a34b8af69b
```

This will hopefully just be a temporary solution until the pull request is merged into the main repository.

**Note:** you can use npm to install any repository from github by using the username/projectname pattern rather than just the module name. This works with the `npm install` command as well as adding projects directly to the `dependencies` and `devDependencies` fields in the package.json file. The commit hash is optional in many cases, and in this case is needed to pull the latest change from my fork that added the useable build.

Now, we can require the `snapsvg` module just as we would expect:

```
var Snap = require('snapsvg');

var s = Snap(800, 400);
var bigCircle = s.circle(150, 150, 100);

bigCircle.attr({
  fill: "#bada55",
});
```

## More like this

For more Snap.svg resources, check out this post: [A collection of useful Snap.svg resources](http://learnjs.io/blog/2013/11/30/snapsvg-resources/).
