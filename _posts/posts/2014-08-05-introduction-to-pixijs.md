---
title: "Introduction to pixi.js"
slug: introduction-to-pixijs
published: true
layout: post
type: post
---

Pixi.js is a wonderful library dedicated to serving as a fast and simple rendering engine. It can be used with a number of other JavaScript game libraries, and can do both canvas and WebGL rendering.

In this chapter we go through a really simple introduction to using pixi.js. We'll draw a baby zombie image to the screen to show basic usage of the renderer, stage, sprite, and texture functionality of pixi.js.

## Create a project folder
Create a new folder for the project and change directory into it.

```
mkdir pixi-intro
cd pixi-intro
```

### Create a package.json file

```
npm init
```

Answer the prompts from `npm init` and in the end you'll get a package.json file.


## Install pixi.js via npm

```
npm install --save GoodBoyDigital/pixi.js
```

The version that's published to npm is out of date, so we can install directly from GitGub using the command above. The `--save` option saves pixi.js as a dependency in your package.json file.

## Get an image to use

You can use this baby zombie image if you want:

```
https://raw.githubusercontent.com/sethvincent/hogjam4/gh-pages/images/menu-image/05.png
```

Or use whatever image you want.

Just make sure your image is named zombie.png and is placed in the root of your project directory.

## Create an index.js file

```
touch index.js
```

## Edit the index.js file
Let's make a simple example that just draws an image to the screen.


### Require pixi.js into your program:

```
var PIXI = require('pixi.js');
```
We're requiring the pixi.js module as `PIXI` because that's how the pixi.js object is capitalized in their documentation.


### Create a renderer for the game

```
var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);
```

Here we're using pixi's canvas renderer. You can use WebGL really easily. Just use `PIXI.WebGLRenderer` instead. We're making the renderer fill the full width and height of the screen by passing in `window.innerWidth` and `window.innerHeight` as arguments.

### Attach the renderer to the body of the html file

```
document.body.appendChild(renderer.view);
```

### Create a stage to draw on.

```
var stage = new PIXI.Stage;
```

We'll be drawing our image by adding it as a sprite that is drawn on this stage.

### Create a texture and sprite with an image

```
var zombieTexture = PIXI.Texture.fromImage('zombie.png');

var zombie = new PIXI.Sprite(zombieTexture);
```

First we create a texture using the `PIXI.Texture.fromImage()` method, passing in a relative url to an image as an argument.

Next we create a sprite using the `PIXI.Sprite()` method, and passing in the texture as an argument.

### Set the position of the zombie sprite

```
zombie.position.x = window.innerWidth / 2 - 150;

zombie.position.y = window.innerHeight / 2 - 150;
```

The zombie image is 300 by 300 pixels, so the above code will center the sprite in the middle of the window.

### Add the zombie sprite to the stage

```
stage.addChild(zombie);
```

This adds our sprite to the stage so it'll get drawn when the `renderer.render()` method executes.

### Create a draw function to run the renderer

```
function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}
```

The above draw function runs the `renderer.render()` method, with the `stage` passed in as an argument. It also runs `requestAnimationFrame` with the `draw()` function itself as the argument, which ensures that `draw()` will run repeatedly as a loop.

### Kick off the application

```
draw();
```

We run the `draw()` function for the first time to kick off the game, and because we call `requestAnimationFrame` inside the draw function, it'll get called recursively and run on each frame of `requestAnimationFrame`.

## Full example code

Here's the index.js file in its entirety:

````
    var PIXI = require('pixi.js');

    var renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Stage;

    var zombieTexture = PIXI.Texture.fromImage('zombie.png');
    var zombie = new PIXI.Sprite(zombieTexture);

    zombie.position.x = window.innerWidth / 2 - 150;
    zombie.position.y = window.innerHeight / 2 - 150;

    stage.addChild(zombie);

    function draw() {
      renderer.render(stage);
      requestAnimationFrame(draw);
    }

    draw();

````

## Run a development server

You can run this on your local machine using the `beefy` module to bundle dependencies using Browserify, and serve the files with a development server that has live-reload built in.

### Install beefy and browserify globally

If you haven't already, install beefy and browserify:

```
npm install -g beefy browserify
```

### Start the server

Run this to start your development server:

```
beefy index.js --live
```

You'll see output like:

```
listening on http://localhost:9966/
```

So you'll be able to go to [http://localhost:9966/](http://localhost:9966/) in your browser and see the game running.

<br>

<div class="highlight">
  <h3>Interested in learning to make JavaScript games?</h3>

  <p>This is an excerpt from our book <i>Making 2D JavaScript Games</i>. You can purchase it alone, or bundled with all our other books & screencasts.</p>

  <p><a href="https://gumroad.com/l/BOuP" target="_self" class="button buy">6 books & 10 screencasts - $95</a></p>
  <p><a href="https://gumroad.com/l/learnjs02" target="_self" class="button buy">Making 2D JavaScript Games - $15</a></p>
</div>


## Want to learn more about pixi.js?

Make sure to review the project website: [pixijs.com](http://www.pixijs.com/)

Check out the pixi.js GitHub repository: [github.com/GoodBoyDigital/pixi.js](https://github.com/GoodBoyDigital/pixi.js)

You can read the project's documentation here: [goodboydigital.com/pixijs/docs](http://www.goodboydigital.com/pixijs/docs/)
