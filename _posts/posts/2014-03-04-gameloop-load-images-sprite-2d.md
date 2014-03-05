---
title: "Preloading and rendering image sprites in 2d js/canvas games"
slug: gameloop-load-images-sprite-2d
published: true
layout: post
type: post
npmrecipe: true
---

Learn about using the [sprite-2d](http://github.com/sethvincent/sprite-2d), [load-images](http://github.com/sethvincent/load-images), and [gameloop](http://github.com/sethvincent/gameloop) modules to create animations for 2d canvas/javascript games.

We'll also use the [beefy](https://github.com/chrisdickinson/beefy) and [browserify](https://github.com/substack/browserify) modules as development tools.

## Set up the project

> For help getting started with Node.js/JavaScript development environments, check out this blog post: [Setting up a JavaScript / Node.js development environment](http://learnjs.io/blog/2014/01/22/js-development-environment/).

### Create and change directory into a new project folder:

```
mkdir my-project-name
cd my-project-name
```

### Now create a package.json file using `npm init`

```
npm init
```

This command will ask you questions about your project. Answer all the questions and it'll create a package.json file for you.

## Install dependencies

### Install gameloop, load-images, and sprite-2d:

```
npm install --save gameloop load-images sprite-2d
```

### Install beefy and browserify as development dependencies:

```
npm install --save-dev beefy browserify
```

## gameloop

The gameloop module creates the bare-bones states and events for a game: start, end, update, draw, pause, resume.

Here's an example:

```
var Game = require('gameloop');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new Game({
  renderer: canvas.getContext('2d')
});

game.width = canvas.width = 800;
game.height = canvas.height = 400;

game.on('start', function(){
  console.log('started', this);
});

game.on('update', function(dt){

});

game.on('draw', function(context){
  context.clearRect(0, 0, game.width, game.height);
});

game.start();
```

## load-images

The load-images module does one job: loading images.

### Basic usage looks like this:

```
loadImages(arrayOfFilePaths, function(err, images){
  console.log(err, images);
  game.images = images;
  game.start();
});
```

### Here's the gameloop example extended to include usage of the load-images module:

```
var Game = require('gameloop');
var loadImages = require('load-images');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new Game({
  renderer: canvas.getContext('2d')
});

game.width = canvas.width = 800;
game.height = canvas.height = 400;

loadImages(['zombie-baby.png', 'zombie-baby2.png'], function(err, images){
  console.log(err, images);
  game.images = images;
  game.start();
});

game.on('start', function(){
  console.log('started', this);
});

game.on('update', function(dt){

});

game.on('draw', function(context){
  context.clearRect(0, 0, game.width, game.height);
  context.drawImage(game.images['zombie-baby.png'], 50, 50);
  context.drawImage(game.images['zombie-baby2.png'], 100, 100);
});
```


## sprite-2d

The sprite-2d module does the work of looping through frames in a spritesheet to animate sprites, likely most useful for 2d canvas games.

### Basic usage looks like this:

```
var Sprite = require('sprite-2d');

var sprite = new Sprite({
  image: image,
  frames: 4,
  fps: 20
});
```

### In your update loop:

```
sprite.update(dt);
```

This advances the sprite to the next frame based on the fps specified when creating the sprite.


### In your draw loop:

```
sprite.draw(function(image, frame){
  context.drawImage(
    image, 
    frame.position,
    0,
    frame.width, 
    image.height, 
    entity.position.x,
    entity.position.y,
    frame.width, 
    image.height
  );
});
```

The `sprite.draw` method takes a callback that provides two arguments: `image` which is the actual image used for the sprite, and `frame`, which represents the current frame of the spritesheet.

These two arguments give us everything we need to draw the sprite using something like the `context.drawImage` method, like seen above.

### Here's our example extended to integrate the sprite-2d and load-images modules:

```
var Game = require('gameloop');
var loadImages = require('load-images');
var Sprite = require('sprite-2d');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new Game({
  renderer: canvas.getContext('2d')
});

game.width = canvas.width = 800;
game.height = canvas.height = 400;

var sprite;

loadImages('zombie-baby.png', function(err, images){
  if (err) throw err;

  sprite = new Sprite({
    game: game,
    image: images['zombie-baby.png'],
    frames: 4,
    fps: 8
  });

  game.start();
});

game.on('start', function(){
  console.log('started', this);
});

game.on('update', function(dt){
  sprite.update(dt)
});

game.on('draw', function(context){
  context.clearRect(0, 0, game.width, game.height);
  sprite.draw(function(image, frame){
    context.drawImage(
      image, 
      frame.position,
      0,
      frame.width, 
      image.height, 
      100,
      100,
      frame.width, 
      image.height
    );
  });
});
```

To get this to run you'll need an image in the root folder of your project named 'zombie-baby.png'. You can use this one if you want: [https://github.com/sethvincent/hogjam4/blob/gh-pages/images/zombie-baby.png](https://github.com/sethvincent/hogjam4/blob/gh-pages/images/zombie-baby.png)

## Running the example

Put the above example code into a file named `game.js`.

Use this command to run a local development server with beefy:

```
beefy game.js:bundle.js --live
```

### More like this

This post is part of the **[npm recipes](http://learnjs.io/npm-recipes)** series. We're compiling the posts into a book.

**Sign up for the Learn.js newsletter** and we'll send you the npm recipes book (and updates about new recipes) **for free**:

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

## If you liked this post you might also be interested in the Learn.js series of books.

[Pre-order the Making 2d Games with Node.js & Browserify book for $15](http://gum.co/learnjs02) or the [4-book bundle of the Learn.js series for $38](http://gum.co/bundle01).
