---
title: "Creating standalone JavaScript library builds with browserify, watchify, and uglify-js"
slug: creating-js-library-builds-with-browserify-and-other-npm-modules
published: true
layout: post
type: post
npmrecipe: true
---

Recently I had the opportunity to use Browserify as one of the tools for creating a JavaScript module for a client that is building a mapping product for architects and urban planners. 

In that project I used Browserify and npm scripts to bundle the module into a file the client could use as a standalone library that could be added to any web page that needed to use the tool.

It was a fairly straightforward and flexible build process, and here I'll outline a similar structure that you could use in your projects.

Our example project will be named Pizza, because our example library will do nothing but return the string `'Pizza'`. Deal with it.

This post is part of our **[npm recipes series](/npm-recipes)**, and we'll be looking at the **[browserify](https://github.com/substack/node-browserify)**, **[watchify](https://github.com/substack/watchify)**, and **[uglify-js](https://github.com/mishoo/UglifyJS2)** modules. We'll be exploring how to use these three development tools together to make a simple build process.

## Create your package.json file

To create a package.json file run this command:

```
npm init
```

Answer the questions that it asks (hit enter to keep the default answers) and you should get a package.json file that looks something like this:

```
{
  "name": "library-builds",
  "version": "0.0.0",
  "description": "creating standalone library builds with browserify, watchify, and uglify-js",
  "main": "index.js",
  "dependencies": {},
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "BSD-2-Clause"
}
```

## Set up the project files & directories

### Create an index.js file. 
For this example I'm just making it a function that returns the string `'Pizza'`. Because pizza.

```
module.exports = function(){
  return 'Pizza';
}
```

### Create an index.html file

We'll use an overly simple html file for testing out the usage of the library:

```
<!doctype html>
<html>
<head>
  <title>browserify module</title>
</head>
<body>
  <script src="dist/pizza.js"></script>
  <script>
    console.log(pizza())
  </script>
</body>
</html>
```

### Create a dist folder

In the dist folder we'll store the pizza.js and pizza.min.js files. You can create it using the `mkdir` command:

```
mkdir dist
```

## Install development dependencies

```
npm install --save-dev browserify watchify uglify-js
```

By including the `--save-dev` option these modules will be saved to the `devDependencies` field in your package.json file.


## Module usage examples

### Using browserify

You can install browserify globally so you can run it's packaged `browserify` command in the terminal:

```
npm install -g browserify
```

Here's a simple example of using the `browserify` command:

```
browserify index.js -o dist/pizza.js
```


The key part of bundling standalone modules with Browserify is the `--s` option. It exposes whatever you export from your module using node's `module.exports` as a global variable. The file can then be included in a `<script>` tag.

You only need to do this if for some reason you *need* that global variable to be exposed. In my case the client needed a standalone module that could be included in web pages without them needing to worry about this Browserify business.

Here's an example where we use the `--s` option with an argument of pizza:

```
browserify index.js --s pizza > dist/pizza.js
```

This will expose our module as a global variable named `pizza`.

To get source maps to make debugging easier, use the `-d` option:

```
browserify index.js -d --s pizza > dist/pizza.js
```

See more options and useful help by running `browserify --help`.

### Using watchify

To watch js files for revions you can use watchify, which uses browserify to re-bundle your modules each time you edit a file.

You can install watchify globally so you can run it's packaged `watchify` command in the terminal:

```
npm install -g watchify
```

Basic usage is similar to browserify. Here's what we'll use in this case:

```
watchify index.js -d --s pizza -o dist/pizza.js -v
```

`watchify` uses all the same arguments as `browserify`, with the difference that the `-o` option for the output file is mandatory.

### Using uglify-js
We'll probably want to build a minified version of the library, so we can use the uglify-js module for that.

You can install uglify-js globally so you can run it's packaged `uglifyjs` command in the terminal:

```
npm install -g uglify-js
```

Basic usage looks like this:

```
uglifyjs index.js -c > dist/pizza.min.js
```

Note that when using this module on the command line there's no dash. Just `uglifyjs`. That's messed me up before.

The `-c` option compresses the output.

To see all options and get some nice help text, you can run `uglifyjs --help`.

To use the `uglifyjs` command with the `browserify` command, we'll pipe the output of browserify to uglify-js:

```
browserify index.js --s pizza | uglifyjs -c > dist/pizza.min.js
```

Let's take a look at how we can move these commands into the npm scripts

## Add build scripts to the "scripts" field

Add the example usages we created above to the `scripts` field of your package.json file so that the `scripts` field looks like this:

```
"scripts": {
  "build-debug": "browserify index.js -d --s pizza > dist/pizza.js",
  "build-min": "browserify index.js --s pizza | uglifyjs -c > dist/pizza.min.js",
  "build": "npm run build-debug && npm run build-min",
  "watch": "watchify index.js -d --s pizza -o dist/pizza.js -v"
},
```

## Run the build scripts!

Create the debug build of the library:

```
npm run build-debug
```

Create the minified build:

```
npm run build-min
```

Create both the debug and minified builds:

```
npm run build
```

Watch the main file for changes and automatically regenerate the debug build:

```
npm run watch
```

## Usage of the library

All we have to do is include the dist/pizza.js or dist/pizza.min.js files in the page, then use that `pizza` variable that was exposed using Browserify.

In our case, pizza is a function that returns the string `Pizza`. For you, it might be a constructor function, object, or whatever you need to provide the necessary functionality.

## More like this

Learn more about using npm scripts by taking a look at this article by the author of browserify: [task automation with npm run](http://substack.net/task_automation_with_npm_run).

For an example of running similar tasks for bundling css that's packaged through npm, check out this article: [Using rework-npm for bundling css from npm along with myth and clean-css](http://learnjs.io/blog/2014/01/20/rework-npm-myth-clean-css/)

Get more [npm recipes](http://learnjs.io/npm-recipes) delivered as part the Learn.js newsletter:

<div id="mc_embed_signup">
<form action="http://learnjs.us5.list-manage.com/subscribe/post?u=b5b4f7fda673e887e9380b619&amp;id=3eb1d4ee40" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div class="mc-field-group">
  <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Your email">
  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
</div>
  <div id="mce-responses" class="clear">
    <div class="response" id="mce-error-response" style="display:none"></div>
    <div class="response" id="mce-success-response" style="display:none"></div>
  </div>
    <div style="position: absolute; left: -5000px;"><input type="text" name="b_b5b4f7fda673e887e9380b619_3eb1d4ee40" value=""></div>
</form>
</div>