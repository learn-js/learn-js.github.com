---
title: "Using Browserify with Ruby on Rails"
slug: using-browserify-with-rails
published: true
layout: post
type: post
---

Working on a Ruby on Rails project I had a moment where I realized, "Hey, I haven't used Browserify with Rails before, maybe I should try that out!"

So I did.

I tried two gems: [sprockets-browserify](https://github.com/janv/sprockets-browserify) and [browserify-rails](https://github.com/hsume2/browserify-rails). I found that neither worked when I installed them and followed the instructions in their readmes.

But then I realized, "Wait, I shouldn't really need a gem for this."

So instead, I did this:

### Create a package.json file in the project root.

I created a bare-minimum package.json file:

```
{
  "name": "project-name",
  "devDependencies": {},
  "dependencies": {}
}
```

### Install browserify and watchify

I installed browserify and watchify as development dependencies:

```
npm install --save-dev browserify watchify
```

### Set up npm scripts


I added a few npm scripts to the package.json file:

```
"scripts": {
  "bundle": "browserify app/assets/javascripts/index.js -o app/assets/javascripts/bundle.js"
  "watch-js": "watchify app/assets/javascripts/index.js -o app/assets/javascripts/bundle.js",
  "start": "npm run watch-js & rails s"
},
```

The bundle script creates a browserified js bundle.

The watch-js script watches index.js for changes and regenerates the bundle.

The start script runs the watch-js script and also starts the rails server.


### Rewrote the application.js file to only include the bundle.js file

In the `app/assets/javascripts/application.js` file I made it only require the bundle generated by browserify/watchify:

```
//= require bundle
```

### The package.json file should look something like this now:

```
{
  "name": "project-name",
  "devDependencies": {
    "browserify": "^3.32.1",
    "watchify": "^0.6.2"
  },
  "scripts": {
    "bundle": "browserify app/assets/javascripts/index.js -o app/assets/javascripts/bundle.js"
    "watch-js": "watchify app/assets/javascripts/index.js -o app/assets/javascripts/bundle.js",
    "start": "npm run watch-js & rails s"
  },
}
```

### Create an index.js file

Create a file named index.js at `app/assets/javascripts/index.js`. Use it like you would any browserify project!

### Run npm start

Running `npm start` will start the watch-js script and rebuild the bundle when you make changes, as well as start the rails development server.