---
title: 'Backbone & jQuery meet Browserify: easy.'
slug: backbone-jquery-browserify
published: true
layout: post
type: post
redirect_to: "http://makerlog.org/posts/backbone-jquery-browserify"
---

Using browserify with modules from npm can be a little overwhelming at first, so what if we were able to use a couple of common front-end development libraries using along with browserify to ease the process of getting started? 

It's possible to build applications using [backbone](https://github.com/jashkenas/backbone) and [jquery](https://github.com/jquery/jquery) that are bundled by [browserify](https://github.com/substack/node-browserify), and in this post we'll take a look at the basics of how that works. We'll use a tool called [beefy](https://github.com/chrisdickinson/beefy) as the development server.

To get started, create a directory for your project, change directory into it, and run `npm init` to create a package.json file for your project:

```
mkdir my-project
cd my-project
npm init
```

Answer the questions from the `npm init` prompt.

## Install jquery and backbone:
`npm install --save jquery backbone`

## Create a view module in a file named app-view.js:

```
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  initialize: function(){
    console.log('wuuut')
    this.render();
  },

  render: function(){
    $('body').prepend('<p>wooooooooooooooo</p>');
  }
});
```

This should look familiar if you've used Backbone before, with the slight variation of exporting the view using module.exports.

In jQuery versions previous to v2.1.0, you would have to require it with a nasty line like this:

```
var $ = require('jquery/dist/jquery')(window);
```

But now in 2.1.0 we can require the module like we would expect:

```
var $ = require('jquery');
```

### Create an index.js file with this code to use the module:

```  
    var AppView = require('./app-view');

    var appView = new AppView();
```

## Install browserify and beefy to use to bundle the code and create a dev server:

```
npm install --save-dev browserify beefy
```

Add a `start` command and a 'bundle' command to your package.json scripts object, so that it looks like this:

```
"scripts": {
    "start": "beefy index.js:bundle.js --live",
    "bundle": "browserify index.js -o bundle.js"
  },
```

Now, you can run `npm start` and view the simple Backbone/jQuery app bundled by browserify at `http://localhost:9966`. Beefy will watch your files for changes, then regenerate and serve a bundle.js file and reload the browser window each time you save a file. Convenient!

And when you're ready to deploy your project, you can run `npm run bundle` to get an actual bundle.js file. Host this thing on GitHub Pages or wherever you like.


## More details about making jQuery work with CommonJS/node.js/browserify
Want to know exactly when proper support for CommonJS lands in the main jquery repository? [Search for CommonJS in the jQuery issues queue](http://bugs.jquery.com/search?q=CommonJS) to get a sense of the progress that developers have made.

I'll update this post with revised details when upcoming versions of jQuery are released.

See the full, operational code on github: [github.com/learn-js/jquery-backbone-browserify-example](https://github.com/learn-js/jquery-backbone-browserify-example).

If you're getting started learning javascript & node.js you may want to purchase the **[Learn.js bundle of books](http://gum.co/bundle01)** that go more in depth with building applications using node.js, npm, and browserify. **[Learn more about the series](http://learnjs.io/#books)**.
