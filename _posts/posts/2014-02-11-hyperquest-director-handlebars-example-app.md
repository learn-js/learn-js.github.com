---
title: "Create a Node.js app that consumes APIs & is composed of small modules"
slug: hyperquest-director-handlebars-example-app
published: true
layout: post
type: post
redirect_to: "http://makerlog.org/posts/hyperquest-director-handlebars-example-app"
---

> **September 7, 2014 update:**
> This tutorial now works with the [localwiki.net api](http://localwiki.net/api/v4/) that the Seattle LocalWiki now uses.

> This post is part of the **[npm recipes](http://learnjs.io/npm-recipes)** series, where we explore the thousands of npm modules one "recipe" at a time.

The goal for this tutorial is to create a server-side Node.js application that pulls data from a content API and serves it to the browser as HTML. We'll use the API of a the [Seattle LocalWiki](http://localwiki.net/seattle) as the content API. Learn more about the API here: [http://localwiki.net/api/v4/](http://localwiki.net/api/v4/)

And read the LocalWiki API documentation here: [localwiki.net/main/API_Documentation](http://localwiki.net/main/API_Documentation)

First we'll run through example usage of each of the modules used in this project, then we'll build the actual application.

### Our project will use these modules:
- [hyperquest](https://www.npmjs.org/package/hyperquest) - for requesting data from the API
- [director](https://www.npmjs.org/package/director) - for routing requests to the server
- [handlebars](https://npmjs.org/package/handlebars) - for the HTML templates served to the browser
- [handlebars-layouts](https://npmjs.org/package/handlebars-layouts) - so we can have jade/django style layouts using handlebars
- [st](https://www.npmjs.org/package/st) - for serving static files
- [event-stream](https://www.npmjs.org/package/event-stream) - for working with the data stream we get back from hyperquest
- [rework-npm-cli](https://www.npmjs.org/package/rework-npm-cli) - for bundling css files
- [myth](https://www.npmjs.org/package/myth) - a preprocessor for our css
- [normalize-css](https://github.com/sethvincent/normalize-css) - reset the css for the browser
- [skelestyle-typography](https://www.npmjs.org/package/skelestyle-typography) - a base set of typography css styles
- [nodemon](https://www.npmjs.org/package/nodemon) - for running a development server

### Source code

You can find the full source code for this post here: [github.com/learn-js/hyperquest-director-handlebars-example-app](https://github.com/learn-js/hyperquest-director-handlebars-example-app).

## Basic usage examples

Here we'll take a look at some basic usage examples of each of the modules used in the application.

### hyperquest

Hyperquest is a module for making streaming http requests.

Here's an example:

```
var request = require('hyperquest');

var req = request('http://localwiki.net/api/v4/pages/?region__slug=seattle&tags=pizza&format=json');
req.pipe(process.stdout);
```

This will pipe the response from the LocalWiki API to `process.stdout` (which console.log is an alias for in Node).
Notice that we're requesting all pages from the `seattle` region tagged with `pizza` and asking for the response to be in the `json` format.

### director

Director is used to handle routing requests in our server application. It can also be used for client-side and command line tools.

### Here's an example of server-side usage of director:

```
var http = require('http');
var director = require('director');

var port = process.env.PORT || 3000;
var router =   new director.http.Router();

var server = http.createServer(function(req, res){
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/', function(){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('the root url');
});

router.get('/pizza', function(){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('i like pizza');
});

router.get('/pizza/:adjective', function(adjective){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('pizza is really ' + adjective);
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);
```

### Let's look at this example in chunks:

**Require the `http` and `director` modules:**

```
var http = require('http');
var director = require('director');
```

**Set a port variable and instantiate the router object we'll use for routing requests:**

```
var port = process.env.PORT || 3000;
var router = new director.http.Router();
```

**Create a server, using `router.dispatch()` to handle requests:**

```
var server = http.createServer(function(req, res){
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end('not found');
    }
  });
});
```

If there's an error the browser will be sent a 404 message.

**Set up a route for the route url:**

```
router.get('/', function(){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('the root url');
});
```

**An example of an arbitrary route:**

```
router.get('/pizza', function(){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('i like pizza');
});
```

**An example of using url parameters to alter responses:**

```
router.get('/pizza/:adjective', function(adjective){
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end('pizza is really ' + adjective);
});
```

**Start the server, listen on the port in the `port` variable, and print a message to the console:**

```
server.listen(port);
console.log('app running on http://127.0.0.1:' + port);
```

### handlebars & handlebars-layouts

Handlebars is a common templating language. You can learn about its syntax and basic usage at [handlebarsjs.com](http://handlebarsjs.com). In this example we'll revise the director example to serve views compiled by Handlebars. We'll also use the handlebars-layouts module to allow for block layouts similar to those found in jade and django.

### Here's the example:

```
var fs = require('fs');
var http = require('http');
var director = require('director');

var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);

Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());
var template = Handlebars.compile(fs.readFileSync('views/index.html').toString());

var site = {
  title: "Exampal usage of Handlebars",
  description: "Learn to use handlebars with node.js!"
}

var port = process.env.PORT || 3000;
var router = new director.http.Router();

var server = http.createServer(function(req, res){
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/', function(){
  var page = {
    title: "This is the index page",
    content: "This is the fornt page of the example handlebars site."
  }

  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end(template({ site: site, page: page }));
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);
```

### And here's the example described in chunks:

**Require the fs, http, and director modules:**

```
var fs = require('fs');
var http = require('http');
var director = require('director');
```

**Require handlebars and the handlebars-layouts modules:**

```
var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);
```

**Create a partial using `Handlebars.registerPartial()` and create a template using `Handlebars.compile()`:**

```
Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());
var template = Handlebars.compile(fs.readFileSync('views/index.html').toString());
```

**Create a `site` object with properties we'll use in the handlebars templates:**

```
var site = {
  title: "Exampal usage of Handlebars",
  description: "Learn to use handlebars with node.js!"
}
```

**Create a port variable and instantiate the router:**

```
var port = process.env.PORT || 3000;
var router = new director.http.Router();
```

**Create the server:**

```
var server = http.createServer(function(req, res){
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});
```

**Create a root route:**

```
router.get('/', function(){
  var page = {
    title: "This is the index page",
    content: "This is the fornt page of the example handlebars site."
  }

  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end(template({ site: site, page: page }));
});
```

This creates a `page` object for use in the index template.

Note the following line:

```
this.res.end(template({ site: site, page: page }));
```

This uses the `template()` function that we created using `Handlebars.compile()`, and we're passing in the `site` and `page` objects for use in the template.

**Start the server and print a message to the console:**

```
server.listen(port);
console.log('app running on http://127.0.0.1:' + port);
```

### The views used in this example

**Here's the layout view:**

```
<!doctype html>
<html lang="en-us">
<head>
  <title>{{site.title}}</title>
  <link rel="stylesheet" href="/static/bundle.css">
</head>
<body>

<header>
  <div class="container">
    <h1><a href="/">{{site.title}}</a></h1>
    <div>{{site.description}}</div>
  </div>
</header>

<main id="main-content" role="main">
  {% raw %}{{#block "body"}}{{/block}}{% endraw %}
</main>

</body>
</html>
```

This line: `{% raw %}{{#block "body"}}{{/block}}{% endraw %}` defines a block that we can override to place content into in views that use this one as a layout.

**The index view:**

```
{% raw %}
{{#extend "layout"}}

{{#replace "body"}}
<div class="container">
  <h1>{{page.title}}</h1>
  <div>{{page.content}}</div>
</div>
{{/replace}}

{{/extend}}
{% endraw %}
```

The `{% raw %}{{#extend "layout"}}{{/extend}}{% endraw %}` block allows this view to use the layout view as the layout.

Everything inside of this block: `{% raw %}{{#replace "body"}} ... {{/replace}}{% endraw %}` is rendered inside of the body block definition in the layout view.

### st

st is a module for serving static files that pairs well with the director module.

Here's an example:

```
var http = require('http');
var st = require('st');

var staticFiles = st({ path: __dirname + '/static', url: '/' });

http.createServer(function(req, res) {
  if (staticFiles(req, res)) return
  else res.end('not a static file');
}).listen(3000);
```

Create a folder named static, and a file inside of it named example.txt. Put some text in that .txt file.

Now when you go to `http://localhost:3000/example.txt` that file will be rendered. Note that if you go to the root url with this set up you'll be shown the contents of the static directory. You can change that option by setting `index` to either false, or to a file that should be used as the index to the static files. Like this:

```
var staticFiles = st({ path: __dirname + '/static', url: '/', index: false });
```

### event-stream

The event-stream module has a few uses, and in this case we'll be using its `wait()` method to wait until an end of a stream so that we can process the data that's coming in all at once.

### Here's an example that integrates shows event-stream usage along with hyperquest:

```
var request = require('hyperquest');
var wait = require('event-stream').wait;

var api = 'http://localwiki.net/api/v4/';
var tag = 'pizza';
var pagesRequest = request(api + 'pages/?region__slug=seattle&tags=' + tag + '&format=json');

pagesRequest
  .pipe(wait(function(err, data){
    var pages = JSON.parse(data).results;

    var pageTitles = '';
    for (var i=0; i<pages.length; i++){
      pageTitles += pages[i].name + ', ';
    }

    console.log('pages tagged with ' + tag + ': ' + pageTitles);
  }));
```

### Here's the example broken into chunks and explained:

**Require the hyperquest, combine-streams, and event-stream modules:**

```
var request = require('hyperquest');
var wait = require('event-stream').wait;
```

Note that we're just using the `wait()` method from event-stream.

**Set an `api` variable with the api url we'll be using and set the name of the tag we'll be requesting to `pizza`:**

```
var api = 'http://localwiki.net/api/v4/';
var tag = 'pizza';

```

**Make a request for all pages tagged with pizza:**

```
var pagesRequest = request(api + 'pages/?region__slug=seattle&tags=' + tag + '&format=json');
```

**Pipe the response stream:**

```
  pagesRequest
    .pipe(wait(function(err, data){
      var pages = JSON.parse(data).results;
```

The `data` argument we get back from the `wait` is a string of JSON that needs to be parsed into a JavaScript object. The `results` property is an array of pages.

**Print the response to the console:**

```
    var pageTitles = '';
    for (var i=0; i<pages.length; i++){
      pageTitles += pages[i].name + ', ';
    }

    console.log('pages tagged with ' + tag + ': ' + pageTitles);
  }));
```

For this example we're printing the names of all the pages that are tagged with pizza to the console.

### rework-npm-cli & myth

rework-npm-cli is a command-line tool that uses [rework-npm](https://npmjs.org/rework-npm) to bundle css files that are packaged and distributed via npm. It's also useful for importing multiple local css files and bundling them into one file.

**Basic usage of rework-npm-cli looks like this:**

```
rework-npm source.css -o bundle.css
```

myth is a preprocessor for css that automatically adds prefixing for cross-browser support and provides polyfills for new CSS specs.

**Basic usage of myth looks like this:**

```
myth input.css output.css
```

**Use them together by piping them like this:**

```
rework-npm source.css | myth > bundle.css
```

### normalize-css & skelestyle-typography

These two modules expose css files that we can import and bundle using the `rework-npm` command.

Install them like any npm module:

```
npm install --save normalize-css skelestyle-typography
```

These css modules each have a `style` property in their package.json files that determine what css we can use.

Import their css styles using the standard css `@import` statement:

```
@import "normalize-css";
@import "skelestyle-typography";
```

Then, using the `rework-npm` command, those files will be included into the bundle.css file:

```
rework-npm source.css -o bundle.css
```

### nodemon

nodemon is a command-line tool for running node applications that restart when files are changed.

Basic usage is just replacing the `node` command with `nodemon`:

```
nodemon server.js
```

We'll look at a more complicated example at the end of this post.



## Building the application

Now that we've run through the example usage of each module, building the actual application will almost be like review. We'll be plugging those modules together to form an application that grabs content from the SeattleWiki API, and serves that data to the browser as formatted HTML.

## Setup the project

### System dependencies

You'll need Node.js installed. For a guide to setting up a development environment, check out this post: [Setting up a JavaScript / Node.js development environment](http://learnjs.io/blog/2014/01/22/js-development-environment/).

### Files and folders


Create a new project folder and navigate to it on the terminal:

```
mkdir example-project
cd example-project
```

Create folders for static files and views:

```
mkdir static views
```

Create the server.js file and the source.css file:

```
touch server.js source.css
```

Create layout, index, and page views in the views folder:

```
touch views/layout.html views/index.html views/page.html
```

Create a package.json file by running this command:

```
npm init
```

Answer the questions that it asks. Hit enter at a prompt to keep the default value.

### Install dependencies

**Install the development dependencies:**

```
npm install --save-dev rework-npm-cli myth nodemon
```

The `--save-dev` option saves the modules and their current version numbers to the `devDependencies` field in the package.json file.

**Install the project dependencies:**

```
npm install --save hyperquest director handlebars handlebars-layouts st event-stream skelestyle-typography normalize-css
```

The `--save` option saves the modules and their current version numbers to the `dependencies` field in the package.json file.


Your `dependencies` and `devDependencies` fields should now look like this:

```
"dependencies": {
  "director": "~1.2.2",
  "event-stream": "~3.1.0",
  "handlebars": "~1.3.0",
  "handlebars-layouts": "~0.1.3",
  "hyperquest": "~0.2.0",
  "normalize-css": "^2.3.1",
  "skelestyle-typography": "0.0.4",
  "st": "~0.2.5"
},
"devDependencies": {
  "rework-npm-cli": "0.0.1",
  "myth": "~0.3.0",
  "nodemon": "~1.0.14"
}
```

### Create the server

First we'll add the server code to the server.js file. This mostly compiles previous examples that we've shown into one full file.

### Here's the full server.js file:

```
var fs = require('fs');
var http = require('http');
var st = require('st');
var director = require('director');
var request = require('hyperquest');
var wait = require('event-stream').wait;
var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);

var wiki = {
  name: 'Seattle LocalWiki',
  url: 'http://localwiki.net/seattle',
  api: 'http://localwiki.net/api/v4/'
}

Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());

var templates = {
  index: getView('index'),
  page: getView('page')
}

var port = process.env.PORT || 3000;
var router =   new director.http.Router();
var staticFiles = st({ path: __dirname + '/static', url: '/static', passthrough: true })

var server = http.createServer(function(req, res){

  /*
  * if the request is for a static file, handle it here
  */
  if (staticFiles(req, res)) return;

  /*
  * otherwise, let the router handle the request
  */
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});

router.get('/', function(){
  var html = templates.index({ wiki: wiki });
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end(html);
});

router.get('/:id', function(id){
  var self = this;
  var pagesRequest = request(wiki.api + '/pages/?region__slug=seattle&tags=' + id + '&format=json');

  pagesRequest
    .pipe(wait(function(err, data){

      var html = templates.page({
        wiki: wiki,
        tag: id,
        pages: JSON.parse(data).results
      });

      self.res.writeHead(200, { 'Content-Type': 'text/html' });
      self.res.end(html);
    }));
});

server.listen(port);
console.log('app running on http://127.0.0.1:' + port);

/*
* helper function for pulling in a handlebars template
*/
function getView(file){
  return Handlebars.compile(fs.readFileSync('./views/' + file + '.html').toString());
}

```

### Here's the server.js file broken into chunks and explained:

**Require the project dependencies:**

```
var fs = require('fs');
var http = require('http');
var st = require('st');
var director = require('director');
var request = require('hyperquest');
var wait = require('event-stream').wait;
var Handlebars = require('handlebars');
var hbsLayouts = require('handlebars-layouts')(Handlebars);
```

**Create a wiki object that will be used in templates:**

```
var wiki = {
  name: 'Seattle LocalWiki',
  url: 'http://localwiki.net/seattle',
  api: 'http://localwiki.net/api/v4/'
};
```

**Register the layout partial:**

```
Handlebars.registerPartial('layout', fs.readFileSync('views/layout.html').toString());
```

**Use the `getView()` function to create template functions we can use later:**

```
var templates = {
  index: getView('index'),
  page: getView('page')
};
```

We'll look at the `getView()` helper function later in the code.

**Create the port variable, and instantiate router and staticFiles response handler:**

```
var port = process.env.PORT || 3000;
var router =  new director.http.Router();
var staticFiles = st({ path: __dirname + '/static', url: '/static', passthrough: true });
```

**Create the server:**

```
var server = http.createServer(function(req, res){

  /*
  * if the request is for a static file, handle it here
  */
  if (staticFiles(req, res)) return;

  /*
  * otherwise, let the router handle the request
  */
  router.dispatch(req, res, function(err){
    if (err) {
      res.writeHead(404);
      res.end();
    }
  });
});
```

The `staticFiles` response handler takes care of a request if it matches any of the available static files. Otherwise the `router` handler takes care of the request.

**Create the root route:**

```
router.get('/', function(){
  var html = templates.index({ wiki: wiki });
  this.res.writeHead(200, { 'Content-Type': 'text/html' });
  this.res.end(html);
});
```

**Create the page route:**

```
router.get('/:id', function(id){
  var self = this;
  var pagesRequest = request(wiki.api + '/pages/?region__slug=seattle&tags=' + id + '&format=json');
```

We use `id` as a parameter that's used in the requests we send to the wiki API.

** Request the pages from the API, use the `template.page()` function to build the HTML that's sent to the browser:**

```
  pagesRequest
    .pipe(wait(function(err, data){

      var html = templates.page({
        wiki: wiki,
        tag: id,
        pages: JSON.parse(data).results
      });

      self.res.writeHead(200, { 'Content-Type': 'text/html' });
      self.res.end(html);
    }));
});
```

Like in the event-stream example above, this section takes the string we get in the `data` argument, parses the JSON, and is added to the object along with the `wiki` that's passed into the `templates.page()` function to build the HTML that's sent to the browser.

**Start the server and print a message to the console:**

```
server.listen(port);
console.log('app running on http://127.0.0.1:' + port);
```

**Create helper function that reads an HTML file to compile a Handlebars template:**

```
/*
* helper function for pulling in a handlebars template
*/
function getView(file){
  return Handlebars.compile(fs.readFileSync('./views/' + file + '.html').toString());
}
```

### Create the project views

The views for this project are very similar to the examples we used above when describing the use of Handlebars.

### The layout.html view:

```
<!doctype html>
<html lang="en-us">
<head>
{{#block "head"}}
  <title>{{ wiki.name }}</title>
  <link rel="stylesheet" href="/static/bundle.css">
{{/block}}
</head>
<body>

<header>
  <div class="container">
    <h1><a href="/">Pages on {{ wiki.name }}</a></h1>
  </div>
</header>

<main id="main-content" role="main">
  {{#block "body"}}{{/block}}
</main>

</body>
</html>
```

### The index.html view:

```
{{#extend "layout"}}

{{#replace "body"}}
<div class="container">
  <p>Check out some of the pages on the {{ wiki.name }}!</p>
  <div id="tags">
    <h2>Here are some examples:</h2>
    <ul>
      <li><a href="/wallingford">Wallingford</a></li>
      <li><a href="/pizza">Pizza</a></li>
      <li><a href="/pioneersquare">Pioneer Square</a></li>
    </ul>
  </div>
</div>
{{/replace}}

{{/extend}}
```

### The page.html view:

```
{{#extend "layout"}}

{{#replace "body"}}
<div class="container">
  <h1>{{ tag.name }}</h1>
  <p>All pages on the <a href="{{ wiki.url }}">{{ wiki.name }}</a> tagged with <b>{{ tag }}</b>.</p>
  <div id="pages">
    {{#each pages}}
    <h2><a href="{{ ../wiki.url }}/{{ name }}" target="_blank">{{name}}</a></h2>
    {{/each}}
  </div>
</div>
{{/replace}}

{{/extend}}
```

### Creating the source.css file

I'll keep the css simple. Just something to show how rework-npm-cli works for bundling css.

Add this to your source.css file:

```
@import "normalize-css";
@import "skelestyle-typography";

.container {
  width: 70%;
  margin: 0px auto;
}
```

Feel free to add whatever css rules you like to improve the style of the project.

Next we'll look at the commands needed to bundle the css and start a development server.

### Create npm scripts in your package.json file

#### We'll need three npm scripts:
- One for bundling the css.
- One for watching the css files for changes and rebundling the css
- One for starting the server.

You'll add each one of these to the `scripts` field in the package.json file:

```
"scripts": {

},
```

#### Bundling the css:

```
rework-npm source.css | myth > static/bundle.css
```

This will create the bundle.css file that imports the css styles from normalize-css and skelestyle-typography.

We'll add this as an npm script called `bundle-css`:

```
"bundle-css": "rework-npm source.css | myth > static/bundle.css"
```

It can now be run on it's own with `npm run bundle-css`.

#### Watching the css for changes:

```
nodemon -e css --ignore static/* --exec 'npm run bundle-css'
```

This uses npm to watch the css file for changes, ignoring everything in the static folder, and executes the bundle-css script on each change.

We'll call this script `watch-css`:

```
"watch-css": "nodemon -e css --ignore static/* --exec 'npm run bundle-css'"
```

It can now be run on it's own with `npm run watch-css`.

#### Running the development server

```
nodemon -e js,html server.js & npm run watch-css
```

This nodemon command watches JavaScript and HTML files for changes and will restart the server. It also runs the `watch-css` command to kick it off and watch for css changes.

Let's use it as the `start` script:

```
"start": "nodemon -e js,html server.js & npm run watch-css"
```

It can now be run with `npm start`.

The `scripts` field in te package.json file should now look like this:

```
  "scripts": {
    "bundle-css": "rework-npm source.css | myth > static/bundle.css",
    "watch-css": "nodemon -e css --ignore static/* --exec 'npm run bundle-css'",
    "start": "nodemon -e js,html server.js & npm run watch-css"
  },
```

The command `npm start` will get your server running, and you'll be able to access the site at http://localhost:3000.


### More like this

This post is part of the **[npm recipes](http://learnjs.io/npm-recipes)** series. We're compiling the posts into a book.


### This post is open source
[This post is open source](https://github.com/learn-js/learn-js.github.com/blob/master/_posts/2014-02-11-hyperquest-director-handlebars-example-app.md). Make revisions to this post by forking the repository, making changes and making a pull request. Here's the file in the site's repo: [github.com/learn-js/learn-js.github.com/blob/master/_posts/2014-02-11-hyperquest-director-handlebars-example-app.md](https://github.com/learn-js/learn-js.github.com/blob/master/_posts/2014-02-11-hyperquest-director-handlebars-example-app.md).

You can also find the full source code for this post here: [github.com/learn-js/hyperquest-director-handlebars-example-app](https://github.com/learn-js/hyperquest-director-handlebars-example-app).
