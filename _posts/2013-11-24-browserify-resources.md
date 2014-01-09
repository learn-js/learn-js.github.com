---
title: A collection of useful Browserify resources
slug: browserify-resources
published: true
layout: post
---

I've been using, reading, and writing about the development tool Browserify for a while, and thought it would be useful to compile some of the most useful resources for learning more about the tool.

## Introductions / the basics of Browserify

These articles give a great introduction to using [Browserify](https://github.com/substack/node-browserify).

### Introduction to Browserify
[superbigtree.tumblr.com/post/54873453939/introduction-to-browserify](http://superbigtree.tumblr.com/post/54873453939/introduction-to-browserify)

The basics of writing modules for the browser using node.js core modules and modules from npm.

### Using npm on the client side
[dontkry.com/posts/code/using-npm-on-the-client-side.html](http://dontkry.com/posts/code/using-npm-on-the-client-side.html)

A very thorough introduction to using npm, Browserify, and Grunt.js.

### NPM Everywhere (Slides)

[NPM Everywhere](http://slid.es/azer/npm)

Slides for introducing front-end people NPM, Browserify and their benefits.

### Introduction to Browserify
[blakeembrey.com/articles/introduction-to-browserify](http://blakeembrey.com/articles/introduction-to-browserify)

Another great look at the basics of Browserify.

### Node Packaged Modules, bringing npm modules to the web
[maxogden.com/node-packaged-modules.html](http://maxogden.com/node-packaged-modules.html)

A rundown of projects that have made developing with browserify more accessible and more interesting: requirebin.com, npmsearch.com, and Browserify CDN.

### Browserify and the Universal Module Definition
[dontkry.com/posts/code/browserify-and-the-universal-module-definition.html](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html)

An awesome look at the possibilities for using Browserify to bundle modules written in AMD, CommonJS/node.js, UMD, ECMAscript 6, and global modules. 

### Standalone Browserify Builds
[www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds)

Particularly interesting for people using Browserify as part of the development workflow on a javascript library, check out this article for learning how to generate standalone Browserify builds.

### Browserify v2 adds source maps
[thlorenz.com/blog/browserify-sourcemaps](http://thlorenz.com/blog/browserify-sourcemaps)

Learn about using source maps with Browserify in this article.


## Usage of browserify

For examples of using browserify with various javascript libraries, check out these articles.

### Using angular and grunt with browserify
[dontkry.com/posts/code/angular-browserify-grunt.html](http://dontkry.com/posts/code/angular-browserify-grunt.html)

Using angular.js with browserify is suprisingly straightforward as shown in this post.

### Basics of making maps with leaflet.js and browserify
[learnjs.io/blog/2013/11/08/leaflet-basics](http://learnjs.io/blog/2013/11/08/leaflet-basics/)

Leaflet.js is a great mapping library, and this tutorial shows how you can use it with browserify.

### Backbone & jQuery meet Browserify: easy.
[learnjs.io/blog/2013/11/23/backbone-jquery-browserify](http://learnjs.io/blog/2013/11/23/backbone-jquery-browserify)

An introduction to using backbone and jquery with browserify.

### grunt+browserify+npm+application=success
[codeofrob.com/entries/grunt+browserify+npm+application=success.html](http://codeofrob.com/entries/grunt+browserify+npm+application=success.html)

A good rundown of using Grunt.js with Browserify.

## Related tools

Browserify fits in well with other development tools. Check out some of the ones most commonly used with Browserify.

### Beefy
[didact.us/beefy](http://didact.us/beefy/)

Beefy is a great tool for running a development server that will automatically reload the browser and serve a newly generated bundle.js file each time you save a project file.

### grunt-browserify
[github.com/jmreidy/grunt-browserify](https://github.com/jmreidy/grunt-browserify)

A plugin for using browserify with grunt.

### gulp-browserify
[github.com/deepak1556/gulp-browserify](https://github.com/deepak1556/gulp-browserify)

A plugin for using browserify with gulp.

### chem
[github.com/superjoe30/chem](https://github.com/superjoe30/chem/)


Canvas-based game engine and toolchain optimized for rapid development. Chem uses browserify to compile your code. Check out some of the [useful npm packages for games](https://github.com/hughsk/game-modules/wiki/Modules).


## Comparisons to similar tools

Browserify is used primarily with npm. Both of those tools have similar counterparts like Bower and RequireJS. These articles help explain some of the differences.

### Journey from RequireJS to Browserify
[esa-matti.suuronen.org/blog/2013/03/22/journey-from-requirejs-to-browserify](http://esa-matti.suuronen.org/blog/2013/03/22/journey-from-requirejs-to-browserify)

A thorough explanation of switching from RequireJS to Browserify.

### 2013: A client side package manager oddyssey
[calvinmetcalf.com/post/61957209713/2013-a-client-side-package-manager-oddyssey](http://calvinmetcalf.com/post/61957209713/2013-a-client-side-package-manager-oddyssey)

A series of posts exploring package managers for client side code. Includes npm/Browserify.

### My strategy for client-side package managers (choosing between npm, bower, and component)
[superbigtree.tumblr.com/post/58075340096/my-strategy-for-client-side-package-managers-choosing](http://superbigtree.tumblr.com/post/58075340096/my-strategy-for-client-side-package-managers-choosing)

Exploring the differences between npm, bower, and component.

### Browserify vs. Component
[www.forbeslindesay.co.uk/post/44144487088/browserify-vs-component](http://www.forbeslindesay.co.uk/post/44144487088/browserify-vs-component)

A comparison of Browserify and Component.


## Resources

### Browserify documentation/github repository
[github.com/substack/node-browserify#browserify](https://github.com/substack/node-browserify#browserify)

Read the Browserify docs! Also check out the [issues](https://github.com/substack/node-browserify/issues).

### node.js modules documentation
[nodejs.org/docs/latest/api/modules.html#modules_modules](http://nodejs.org/docs/latest/api/modules.html#modules_modules)

To write modules for the browser using Browserify, you'll use the node.js module system, and it's a good idea to check out the code node.js module documentation.

### Packages tagged with browserify on npm
[npmjs.org/browse/keyword/browserify](https://npmjs.org/browse/keyword/browserify)

Check out the modules tagged with browserify on npm.

### Browserify on StackOverflow
[stackoverflow.com/questions/tagged/browserify](http://stackoverflow.com/questions/tagged/browserify)

Check out the questions being asked about Browserify on StackOverflow.

## Videos

### Browserify V2 and you
[vimeo.com/62988591](http://vimeo.com/62988591)

Creator of Browserify James Halliday ([@substack](https://twitter.com/substack)) gives a rundown of the changes that came through in version 2 of the project.


## Add resources
[This post is open source](https://github.com/learn-js/learn-js.github.com/blob/master/_posts/2013-11-24-browserify-resources.md). Add new resources to this list by forking the repository, making changes and making a pull request. Here's the file in the site's repo: [github.com/learn-js/learn-js.github.com/blob/master/_posts/2013-11-24-browserify-resources.md](https://github.com/learn-js/learn-js.github.com/blob/master/_posts/2013-11-24-browserify-resources.md)

Or suggest a resource by adding an issue: [github.com/learn-js/learn-js.github.com/issues](https://github.com/learn-js/learn-js.github.com/issues).
