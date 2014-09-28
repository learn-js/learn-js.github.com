---
title: "Setting up a JavaScript / Node.js development environment"
slug: js-development-environment
published: true
layout: post
type: post
---

The most difficult part of getting started with a language isn't necessarily learning the syntax, data types, control structures, or other parts of the language itself. The hardest part is often learning the tools associated with the language's ecosystem. This tutorial provides a quick look at getting Node.js set up on your computer and using Node.js tools for both server and browser code.

## Installing git

[Git](http://git-scm.com) is version control software commonly used for open source projects in combination with [GitHub.com](http://github.com).

If you are using a Mac, you can install git using [homebrew](http://brew.sh/):

```
brew install git
```

> For more information about homebrew, check out the project's homepage: [brew.sh](http://brew.sh/).

On Debian/Ubuntu, install using apt-get:

```
apt-get install git
```

For Windows machines, download git from the git website: [git-scm.com/downloads](http://git-scm.com/downloads)

## Installing node.js

I recommend installing node.js directly from the nodejs.org website: [http://nodejs.org/downloads](http://nodejs.org/downloads).

Choose the download package for your operating system.

After installing on your computer, open your terminal and run `node --version`. If everything is installed correctly this should display the current version number for Node.js that you've installed.

## Javascript in the browser

You don't need to install anything for javascript in the browser. The browser takes care of that for you. I recommend using Chrome for the tutorials on this site. Firefox is also excellent, and if you choose to use it, there will be just slight differences between the developer tools compared to Chrome.

Download Chrome here: [https://www.google.com/intl/en/chrome/browser/](https://www.google.com/intl/en/chrome/browser/)

To get the most out of Chrome, become familiar with its built-in developer tools. The best resource for getting started is [Code School's Discover DevTools course](http://discover-devtools.codeschool.com/), a free interactive tutorial for learning the Chrome DevTools.

Also refer to the main documentation for chrome: [developers.google.com/chrome-developer-tools](https://developers.google.com/chrome-developer-tools/)

## Package manager: npm
When you install node.js, you get npm.

**npm:** [http://npmjs.org](http://npmjs.org)

You may also want to use [bower](http://bower.io/) or [component](http://component.io), two package managers that specifically target client-side code. Remember that javascript packages distributed via npm are not limited to node.js, and can also be used in the browser in many cases through the use of module bundlers like [browserify](http://browserify.org) and [webpack](http://webpack.github.io/).


## Setting up an example project
Next we'll set up the initial file/directory structure of a simple project.

Create a directory for your project and move into that directory:

```
mkdir project-name
cd project-name
```

Run this command to create a package.json file:

```
npm init
```

Answer the questions to generate a package.json file.
Next, install browserify, beefy, and tape as development dependencies:

```
npm install --save-dev browserify beefy tape
```

Create the following files:

```
touch server.js client.js test.js
```

Revise the package.json scripts field to look like this:

```
"scripts": {
    "test": "node test.js",
    "bundle": "browserify client.js -o bundle.js",
    "start": "npm run bundle && node server.js"
  },
```

Now you can run `npm test` to run the tests in your test.js file, and `npm start` to bundle the client javascript using browserify and start the server in the server.js file.

As a next step, take a look at [this tutorial on using Browserify with Express](http://learnjs.io/blog/2013/12/22/express-and-browserify/).

## More like this

If you liked this post you might be interested in the Learn.js series of books.
[Pre-order the Introduction to JavaScript & Node.js book for $15](http://gum.co/learnjs02) or the [4-book bundle of the Learn.js series for $38](http://gum.co/bundle01) to get updates as they are released.

<a href="http://gum.co/bundle01" class="buy button">Buy the 4-book Learn.js bundle - $38</a>

<a href="http://gum.co/learnjs01" class="buy button">Buy the Learn.js Intro to JS book - $15</a>
