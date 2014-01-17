---
title: "Using Browserify with Express"
slug: express-and-browserify
published: true
layout: post
---

In this brief post we'll take a look at using [express](https://github.com/visionmedia/express), a popular web app framework for node.js, with [browserify](https://github.com/substack/node-browserify), a tool for bundling javascript modules written in node.js style for the browser.

### There are a couple primary options:
- bundle your client-side code as a build step that happens before you deploy the project.
- use browserify as middleware inside the express application.

## Bundling client-side code before deployment

We'll be relying on npm scripts to create a development server and a build step for the client modules.

Create a package.json file with the `npm init` command.

Install the dependencies we'll use for developing the application:

```
npm install --save express ejs
npm install --save-dev browserify watchify nodemon
```

Make sure the `scripts` section of the file looks like this:

```
  "scripts": {
    "watch": "watchify client/main.js -o public/app.js -v",
    "build": "browserify client/main.js -o public/app.js",
    "start": "npm run watch & nodemon server.js"
  },
```

## Create the folders for the application:

```
mkdir client public views
```

## Create the files for the publication:

```
touch server.js client/main.js views/index.ejs
```

## Add this code to the server.js file:

```
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.listen(3000);
console.log('Listening on port 3000');
```

## Add this code to the index.ejs file:

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Express + Browserify.</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<main role="main"></main>

<script src="app.js"></script>
</body>
</html>
```

## The client-side code

Now, we'll use a simple Backbone view as an example of the client-side javascript.

## Install backbone and jquery as dependencies:

```
npm install backbone jquery
```

## Add this code to the `client/main.js` file:

```
var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery/dist/jquery')(window);

var AppView = Backbone.View.extend({
  render: function(){
    $('main').append('<h1>Browserify is mathematical.</h1>');
  }
});

var appView = new AppView();
appView.render();
```

Because we revised our npm scripts earlier, we can now run the `npm start` command to start the development server. Run the command:

```
npm start
```

And go to http://localhost:3000 to view the site.

Before deploying the site you'll need to run `npm run build` to bundle the client side code.


## Using browserify as middleware

For this we'll use the browserify-middleware module: [github.com/ForbesLindesay/browserify-middleware](https://github.com/ForbesLindesay/browserify-middleware).

For this example we'll refactor the existing code to use browserify-middleware.

Start with the `server.js` file:

```
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/app.js', browserify('./client/main.js'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.listen(3000);
console.log('Listening on port 3000');
```

Now modify the `start` script in package.json to remove the `npm run watch & ` portion:

```
    "start": "nodemon server.js"
```

Now when you run `npm start` the client-side code will be bundled on request rather than as a build step.

## Conclusion

I tend to prefer the first solution of using npm scripts to bundle the client-side code.
