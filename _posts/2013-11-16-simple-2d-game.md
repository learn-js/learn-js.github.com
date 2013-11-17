---
title: A super simple starting point for 2d javascript games
slug: simple-2d-game
published: true
layout: post
---


Here's the goal: I wanted the smallest and simplest starting point for 2d games I could come up with, using a clear and concise API. 

This article shows what I've got so far on my way to that goal.

### Install node.js

We're using node.js in this example, because we're using modules that are stored on npm, and that use the core node.js `events` module. We're using browserify so that we can use node-style modules in the browser.

You can install node.js from [nodejs.org/download](http://nodejs.org/download). I like to use a tool called [nvm to install and manage different versions of node.js](https://github.com/creationix/nvm).

### Create a folder for your game and change directory into it:
```
mkdir new-simple-game
cd new-simple-game
```

### Create a package.json file with the npm command:

```
npm init
```

Answer all the questions, and it'll create a package.json file for you.

### Install the gameloop and crtrdg-keyboard modules:

```
npm install gameloop crtrdg-keyboard
```

### Install the browserify and beefy modules if you haven't already:

```
npm install -g beefy browserify
```

The -g option installs these modules globally so they can be used on the command line

### Add this command to your scripts in the package.json file:

```
beefy game.js:bundle.js --live
```

So the scripts object should look like this in your package.json file:

```
"scripts": {
  "start": "beefy game.js:bundle.js --live"
}
```

To run your game locally you'll be able to run `npm start`, then check out your game at `http://localhost:9966`.


### Create a game.js file

```
var Game = require('gameloop');
var Keyboard = require('crtrdg-keyboard');

var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var game = new Game({
  renderer: canvas.getContext('2d'),
});

var keyboard = new Keyboard(game);

var box = {
  x: 0,
  y: 0,
  w: 10,
  h: 10,
  color: '#ffffff',
  speed: 5
}

box.update = function(interval){
  if ('W' in keyboard.keysDown) box.y -= box.speed;
  if ('S' in keyboard.keysDown) box.y += box.speed;
  if ('A' in keyboard.keysDown) box.x -= box.speed;
  if ('D' in keyboard.keysDown) box.x += box.speed;

  if (box.x < 0) box.x = 0;
  if (box.y < 0) box.y = 0;
  if (box.x >= canvas.width - box.w) box.x = canvas.width - box.w;
  if (box.y >= canvas.height - box.h) box.y = canvas.height - box.h;
}

box.draw = function(context){
  context.fillStyle = box.color;
  context.fillRect(box.x, box.y, box.w, box.h);
}

game.on('update', function(interval){
  box.update();
});

game.on('draw', function(context){
  context.fillStyle = '#E187B8';
  context.fillRect(0, 0, canvas.width, canvas.height);
  box.draw(context);
});

game.start();
```

### The game.js file broken into chunks with thorough descriptions:

Require the gameloop and crtrdg-keyboard modules so you can use them to create your game's functionality:

```
var Game = require('gameloop');
var Keyboard = require('crtrdg-keyboard');
```

Find the canvas tag in the html and set the size of the canvas to the width and height of the window:

```
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

Create a new game, passing in the 2d drawing context as the renderer:

```
var game = new Game({
  renderer: canvas.getContext('2d'),
});
```

Create keyboard object, so you can listen for when keys are pressed:

```
var keyboard = new Keyboard(game);
```

Create a simple box that can be moved around the screen when keys are pressed:

```
var box = {
  x: 0,
  y: 0,
  w: 10,
  h: 10,
  color: '#ffffff',
  speed: 5
}
```

Implement an update() method on box that handles keyboard input and checking the box's position against the canvas boundaries:

```
box.update = function(interval){
  if ('W' in keyboard.keysDown) box.y -= box.speed;
  if ('S' in keyboard.keysDown) box.y += box.speed;
  if ('A' in keyboard.keysDown) box.x -= box.speed;
  if ('D' in keyboard.keysDown) box.x += box.speed;

  if (box.x < 0) box.x = 0;
  if (box.y < 0) box.y = 0;
  if (box.x >= canvas.width - box.w) box.x = canvas.width - box.w;
  if (box.y >= canvas.height - box.h) box.y = canvas.height - box.h;
}
```

Implement a draw method on box that draws a simple rectangle:

```
box.draw = function(context){
  context.fillStyle = box.color;
  context.fillRect(box.x, box.y, box.w, box.h);
}
```

Listen for the update event on the game object, and run the box.update() method on each update event:

```
game.on('update', function(interval){
  box.update();
});
```

Listen for the draw event on the game object.
Paint the canvas pink and run the box.draw() method on each draw event:

```
game.on('draw', function(context){
  context.fillStyle = '#E187B8';
  context.fillRect(0, 0, canvas.width, canvas.height);
  box.draw(context);
});
```

Start the game:

```
game.start();
```


### Create an index.html file

```
touch index.html
```

Open index.html in your text editor and add this html code to the file:

```
<!doctype html>
<html>
<head>
  <title>2d game made with javascript</title>
  <style>
    body { margin: 0px;}
  </style>
</head>
<body>
  <canvas id="game"></canvas>
  <script src="bundle.js"></script>
</body>
</html>
```

### Run npm start to check out your game

```
npm start
```

Go to [http://localhost:9966](http://localhost:9966) to see the beginnings of your game!

## Next steps
Check out the modules we used for more usage details: [gameloop](http://github.com/sethvincent/gameloop), [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard).

### More modules
Also check out the crtrdg.js project at [crtrdg.com](http://crtrdg.com) and the [game modules wiki](https://github.com/hughsk/game-modules/wiki/Modules) for more cool modules you can use to make javascript games.

### Book about 2d javascript games
I'm working on a book about making 2d games with javascript. I'm releasing a few chapters at a time, and [you can buy it early at a discount](https://gumroad.com/l/learnjs02). You can also [buy it bundled with 3 other books about javascript](https://gumroad.com/l/bundle01). Not ready to buy the books but still want to follow along and be the first to know about new book releases and related projects? [Sign up for our newsletter](http://eepurl.com/rN5Nv).