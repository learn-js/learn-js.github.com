---
title: "Making weird retro interactive art with gretro & gameloop"
slug: making-weird-retro-interactive-art-with-gretro-and-gameloop
published: true
layout: post
type: post
---

This will serve as a basic introduction to the [gretro](https://github.com/mohayonao/gretro), a JavaScript module that provides an API for drawing 2D art on a canvas that has the style of a retro video game.

Here's a quick example of gretro usage:

```
var gretro = new Gretro.Canvas(200, 200);

  gretro
    .stroke(2)
    .fill([ 1, 2, 16 ])
    .circle(50, 50, 20);
```

The above code is used to make a circle like this on the canvas:

![circle on canvas](/img/gretro.png)

The rest of this tutorial will explore using the gretro API along with animation & mouse interaction to make a fun and simple playground for retro art that you can modify however you see fit.

## Set up & install

> System dependency: For this project you'll need node.js installed.
> See [this post on node.js development environments](http://learnjs.io/blog/2014/01/22/js-development-environment/) if you need help with this step.

First, open your terminal and create a new directory for working on this project.

```
cd /the/directory/you/want/to/put/this/project/in
mkdir gretro-example
cd gretro-example
```

Next, we'll create a package.json file. Run `npm init` in the terminal. It'll prompt you for some details about your project. Answer them and it'll create the package.json file. We'll use this to store the list of dependencies of the project.

### Now we can install gretro:

```
npm install --save gretro
```

The `--save` option adds gretro to the package.json file's dependency list.

### Browserify
We'll need to bundle this code for the browser using browserify, so let's install that module along with beefy for creating a local development server:

```
npm install --save-dev beefy browserify
```

### Create an index.js file

At the terminal, create an index.js file for our project code to live in:

```
touch index.js
```

### Open that file with your favorite text editor, and add this code:

```
var Gretro = require('gretro');
```

This allows us to use the gretro functionality in our project.

### Next add these lines:

```
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);
```

The above code creates a canvas element, assigns the 2d drawing context to a variable named `context`, and adds the canvas element to the body of the html document. When we run this, our canvas element will be added to the page.

## Some gretro code

Now let's add the example code from the beginning of the post to the index.js file:

```
var gretro = new Gretro.Canvas(200, 200);

gretro
  .stroke(2)
  .fill([ 1, 2, 16 ])
  .circle(50, 50, 20);
```

## Drawing the image to the canvas
Gretro generates image data, and we need to draw the images it generates to the canvas we created. Try adding this code to the index.js file:

```
var imageData = context.createImageData(200, 200);
imageData.data.set(gretro.toRGBA());
context.putImageData(imageData, 0, 0);
```

We're creating the `imageData` variable as a place to store the image that gretro generates. We set imageData `data` property to be the RGBA output of gretro. Then we draw that image to the canvas using `context.putImageData`.

## Full code of this example

The full code should look like this:

```
var Gretro = require('gretro');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var gretro = new Gretro.Canvas(200, 200);

gretro
  .stroke(2)
  .fill([ 1, 2, 16 ])
  .circle(50, 50, 20);

var imageData = context.createImageData(200, 200);
imageData.data.set(gretro.toRGBA());
context.putImageData(imageData, 0, 0);
```

### Run this example by going to the terminal and running the beefy command:

```
beefy index.js
```
### To the browser!
Go to http://127.0.0.1:9966 to see the results. These examples work best in chrome, but will also render in firefox.

Cool! We drew a circle. Next let's make things a little more interesting by animating the circle.

## Animating the circle

For this we'll use a module I wrote named [gameloop](https://github.com/sethvincent/gameloop).

### First, install gameloop:

```
npm install --save gameloop
```
### Now require gameloop in the index.js file:

```
var Gameloop = require('gameloop');
```

Add the above live just after the line where you require gretro.

### Next, after the `document.body.addChild` line, add this code:

```
var game = Gameloop({ renderer: context });
```

This creates an instance of the gameloop, and indicates that the game will be rendered using the 2d drawing context of the canvas.

### We'll also need to set the width and height of the canvas by adding this code:

```
canvas.width = 200;
canvas.height = 200;
```

## Gameloop events

We'll be using the `update` and `draw` events of gameloop to make our animation of the circle work.

Let's make the circle throb – increase and decrease in size repeatedly.

### Add the event listeners for `update` and `draw`:

```
game.on('update', function (dt) {

});

game.on('draw', function (context) {

});
```

### Revise the `update` event listener to look like this:

```
var size = 0;
var i = 2;

game.on('update', function (dt) {
  size += i;
  if (size > 100) i = -2;
  if (size < 0) i = 2;
});
```

Here we're using the `size` variable to determine how big and how small the circle will get. The `i` variable determines how much the size increases or decreases with each update of the animation.

### Now, cut the entire gretro-specific code from the first example and paste it into the callback of the `draw` event listener so it looks like this:

```
game.on('draw', function (context) {
  var gretro = new Gretro.Canvas(200, 200);

  gretro
    .stroke(2)
    .fill([ 1, 2, 16 ])
    .circle(50, 50, 20);

  var imageData = context.createImageData(200, 200);
  imageData.data.set(gretro.toRGBA());
  context.putImageData(imageData, 0, 0);
});
```

### We need to edit the arguments of the `.circle` method to incorporate the `size` variable:

```
.circle(50, 50, size);
```

We also should revise the arguments of `Gretro.Canvas` and `context.createImageData` to use the canvas width and height that we set earlier:

```
var gretro = new Gretro.Canvas(canvas.width, canvas.height);

...

var imageData = context.createImageData(canvas.width, canvas.height);
```

Finally, we need to start the animation.

### Add this code to the bottom of the file:

```
game.start();
```

## Full code of the animated example:

```
var Gretro = require('gretro');
var Gameloop = require('gameloop');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var game = Gameloop({ renderer: context });

canvas.width = 200;
canvas.height = 200;

var size = 0;
var i = 2;

game.on('update', function (dt) {
  size += i;
  if (size > 100) i = -2;
  if (size < 0) i = 2;
});

game.on('draw', function (context) {
  var gretro = new Gretro.Canvas(canvas.width, canvas.height);

  gretro
    .stroke(2)
    .fill([ 1, 2, 16 ])
    .circle(50, 50, size);

  var imageData = context.createImageData(canvas.width, canvas.height);
  imageData.data.set(gretro.toRGBA());
  context.putImageData(imageData, 0, 0);
});

game.start();
```

Run `beefy index.js` again (or if it is still running, refresh the browser) and you should see the animated circle!

For the next example let's add some mouse interaction. We'll make the circle follow the point of the mouse as it moves.

## Mouse interaction

For simple mouse interaction, let's use the [crtrdg-mouse](https://github.com/sethvincent/crtrdg-mouse) module.

### Require crtrdg-mouse at the top of the index.js file:

```
var Gretro = require('gretro');
var Gameloop = require('gameloop');
var Mouse = require('crtrdg-mouse');
```

### Create a new `Mouse` object:

```
...

var mouse = new Mouse(game, canvas);
var size = 0;
var i = 2;

...
```

### Use the mouse.location.x and mouse.location.y properties to set the position of the circle:

```
  gretro
    .stroke(2)
    .fill([ 1, 2, 16 ])
    .circle(mouse.location.x, mouse.location.y, size);
```

That should be it!

## Full code of mouse example:

```
var Gretro = require('gretro');
var Gameloop = require('gameloop');
var Mouse = require('crtrdg-mouse');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var game = Gameloop({ renderer: context });

canvas.width = 200;
canvas.height = 200;

var mouse = new Mouse(game, canvas);
var size = 0;
var i = 2;

game.on('update', function (dt) {
  size += i;
  if (size > 100) i = -2;
  if (size < 0) i = 2;
});

game.on('draw', function (context) {
  var gretro = new Gretro.Canvas(canvas.width, canvas.height);

  gretro
    .stroke(2)
    .fill([ 1, 2, 16 ])
    .circle(mouse.location.x, mouse.location.y, size);

  var imageData = context.createImageData(canvas.width, canvas.height);
  imageData.data.set(gretro.toRGBA());
  context.putImageData(imageData, 0, 0);
});

game.start();
```

Go back to http://127.0.0.1:9966, refresh, and when you hover over the canvas you'll see the circle following your mouse!

## More about gretro

This gives you an idea of the API of gretro and how to integrate it with other modules.

Learn more about gretro at [https://github.com/mohayonao/gretro](https://github.com/mohayonao/gretro), and at [the project's wiki](https://github.com/mohayonao/gretro/wiki).

You can play with some cool examples of gretro usage here: [http://mohayonao.github.io/gretro/](http://mohayonao.github.io/gretro/)

## Your mission:
Revise these examples to make something strange. And if you do, be sure to tell  me about it!
