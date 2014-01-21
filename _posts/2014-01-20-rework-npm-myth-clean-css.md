---
title: "Using rework-npm for bundling css from npm along with myth and clean-css"
slug: rework-npm-myth-clean-css
published: true
layout: post
---

In this tutorial we'll focus on bundling css that's published on npm using three modules:

- [rework-npm-cli](https://github.com/sethvincent/rework-npm-cli), a module for `@import`ing css from the `node_modules` folder, based on [rework-npm](https://github.com/conradz/rework-npm).
- [myth](https://github.com/segmentio/myth), a preprocessor module that generates cross-browser css based on [rework](https://github.com/reworkcss/rework).
- [clean-css](https://github.com/GoalSmashers/clean-css), a module that minifies css files.


### To get started, open a terminal to make a directory for your project and move into it:

```
mkdir my-project-name
cd my-project-name
```

### Now create a package.json file using `npm init`

```
npm init
```

This command will ask you questions about your project. Answer all the questions and it'll create a package.json file for you.

### Install dependencies

Install rework-npm-cli, myth, and clean-css using the `npm install` command:

```
npm install --save-dev rework-npm-cli myth clean-css
```

The `--save-dev` option saves these modules as development dependencies to your package.json file.

### Create project files.

We'll need two files for now: source.css and index.html.

Create them using the terminal:

```
touch source.css index.html
```
The `touch` command creates a file if it doesn't already exist.

### Create the build script in package.json

In your package.json file you should have a scripts field that looks something like this:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Revise it to look like this:

```
"scripts": {
    "bundle": ""
  },
```

Next we'll look into the functionality of rework-npm-cli, myth, and clean-css, and create the build script using commands that they expose.

### Using rework-npm-cli

The rework-npm-cli module exposes a `rework-npm` command that allows usage of the [rework-npm](https://github.com/conradz/rework-npm) module on the command line, and typical usage looks like this:

```
rework-npm source.css -o bundle.css
```

Add the rework-npm-cli command to the start script in the package.json file so it looks like this:

```
"scripts": {
    "bundle": "rework-npm source.css -o bundle.css"
  },
```

Now we can run `npm run bundle` to generate a bundle.css file.

To test out the functionality of the `rework-npm` command, let's install a sample package I created called [skelestyle-typography](https://github.com/sethvincent/skelestyle-typography).

```
npm install --save skelestyle-typography
```

Now add an import statement to your source.css file:

```
@import "skelestyle-typography";
```

Note that rework-npm requires double quotes.

### Now bundle the css

```
npm run bundle
```

You'll see the contents of the skelestyle-typography css package in your bundle.css. It should look something like this:

```
body,
button,
html,
input,
select,
textarea {
  font-size: 20px;
  line-height: 1.6;
  font-family: Georgia,serif;
  font-smoothing: antialiased;
  font-weight: 300;
  color: #444;
}

::-moz-selection {
  color: #323230;
  background-color: #d6d6d6;
  text-shadow: none;
}

::selection {
  color: #323230;
  background-color: #d6d6d6;
  text-shadow: none;
}

*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Helvetica Neue',Helvetica,sans-serif;
  text-rendering: optimizeLegibility;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 5px;
}

.post h1,
.post h2,
.post h3,
.post h4,
.post h5,
.post h6 {
  margin-top: 40px;
}

a {
  color: #3c80c3;
  -webkit-transition: color ease .2s;
  transition: color ease .2s;
  text-decoration: none;
}

a:hover {
  color: #57A3E8;
}

a:active,
a:focus {
  color: #1e4062;
}

p {
  margin-top: 5px;
  margin-bottom: 10px;
}

code {
  font-family: Monaco,Menlo,monospace;
  padding: 5px 10px;
  background-color: #fdfdfb;
  border: 1px solid #dadad8;
  font-size: 13px;
  border-radius: 2px;
  white-space: nowrap;
}

pre {
  font-family: Monaco,Menlo,monospace;
  font-size: 13px;
  padding: 10px 15px;
  background-color: #fdfdfb;
  border: 1px solid #dadad8;
  border-radius: 3px;
  overflow-x: auto;
  margin-bottom: 35px;
}

pre code {
  background-color: none;
  border: 0;
  padding: 0;
  white-space: pre;
}
```

### Create an index.html file

Create an index.html file and add this content:

```
<html>
<head>
  <meta charset="utf-8">
  <title>rework-npm, myth, & clean-css.</title>
  <link rel="stylesheet" href="bundle.css">
</head>
<body>

<h1>Site title</h1>
<h3>Subheader</h3>

<p>A bunch of text that is here to see what text looks like.</p>

</body>
</html>
```

Check out this site in a browser and you'll see the skelestyle-typography styles have been included and applied.

### Overriding values

You can override any css rule just like normal. For example:

```
@import "skelestyle-typography";

body {
  color: red;
}
```

Add the above body statement to your source.css file, now bundle the css again:

```
npm run bundle
```

You'll see that the body statement you added is at the bottom of bundle.css, and if you check out index.html in the browser again, you're added css is making all the text red.

Let's extend this example now with the myth command line tool.

### Using myth

[myth](https://github.com/segmentio/myth) is described on github as a "A CSS preprocessor that acts like a polyfill for future versions of the spec."

So we can use upcoming css features now!

As an example, let's add some variables to source.css:

```
@import "skelestyle-typography";

:root {
  var-gray: #323232;
  var-serif: Georgia, serif;
}

body {
  color: var(gray);
  font-family: var(serif);
}
```

Bundle the css again with `npm run bundle`

Now you'll see this at the bottom of your bundle.css file:

```
body {
  color: #323232;
  font-family: Georgia, serif;
}
```

It worked!

[Read more about the funtionality provided by myth](https://github.com/segmentio/myth). I've found that it provides all I need from a CSS preprocessor.

Now let's add in another command line tool to minify the css.

### Using clean-css

[clean-css](https://github.com/GoalSmashers/clean-css) is great for minifying css files, and fits in well with the other tools we've looked at so far.

First, revise the bundle script in the package.json file to pipe the output of `myth` to the `cleancss` command:

```
 "scripts": {
    "bundle": "rework-npm source.css | myth | cleancss -o bundle.css"
  },
```

Now, run `npm run bundle` again, and your bundle.css file is now minified!

You've probably grown tired of running `npm run bundle` over and over amiright? Let's take a look at how that can be automated.

### Watching files with nodemon

We can use the nodemon command line tool to watch files for changes and automatically run the bundle script.

First, install nodemon:

```
npm install --save-dev nodemon
```

Next, add a `start` script to the scripts field in your package.json file:

```
"start": "nodemon -e css --ignore bundle.css --exec 'npm run bundle'"
```

This watches all files with an extensions of css, and executes the `npm run bundle` command each time a css file is changed. We ignore bundle.css because otherwise we'd likely get stuck in a loop of updating files.

Run `npm start` and edit the source.css file. Every time you save you'll see the bundle.css file update with your new changes!

## More like this

If you liked this post you might be interested in the Learn.js series of books.
[Pre-order the Introduction to JavaScript & Node.js book for $10](http://gum.co/learnjs02) or the [4-book bundle of the Learn.js series for $25](http://gum.co/bundle01) to get updates as they are released.

<a href="http://gum.co/bundle01" class="buy button">Buy the 4-book Learn.js bundle - $25</a>

<a href="http://gum.co/learnjs01" class="buy button">Buy the Learn.js Intro to JS book - $10</a>

## This post is open source
[This post is open source](https://github.com/learn-js/learn-js.github.com/blob/master/_posts/2014-01-20-rework-npm-myth-clean-css.md). Fork and make fixes, or suggest changes by adding an issue: [github.com/learn-js/learn-js.github.com/issues](https://github.com/learn-js/learn-js.github.com/issues).
