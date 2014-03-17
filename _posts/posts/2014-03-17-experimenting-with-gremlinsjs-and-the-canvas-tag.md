---
title: "Experimenting with Gremlins.js and the canvas tag"
slug: experimenting-with-gremlinsjs-and-the-canvas-tag
published: true
layout: post
type: post
---

The [Gremlins.js](https://github.com/marmelab/gremlins.js) library is designed for [monkey testing](http://en.wikipedia.org/wiki/Monkey_test) (aka [fuzz testing](http://en.wikipedia.org/wiki/Fuzz_testing)) applications by "unleashing a horde of undisciplined gremlins" that click, scroll, and otherwise cause havoc in the app they are released in. They mimic actual events in the browser, creating click, keypress, and scroll events that can be used to check an application for weird random bugs that users might otherwise accidentally find.

To learn more about Gremlins.js I decided to pair it with the [gameloop](https://github.com/sethvincent/gameloop) module, which is desgined for creating 2d canvas games, and see what kind of weirdness I could create with the two modules.

## Here's a simple example:

```
var Game = require('gameloop');
var gremlins = require('gremlins.js');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var game = new Game({
  renderer: canvas.getContext('2d')
});

game.width = canvas.width = window.innerWidth;
game.height = canvas.height = window.innerHeight;

var boxes = [];

function Box (x, y){
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 10;
	console.log('made a box', this);
}

game.on('draw', function(c){
	c.fillStyle = '#9f8ef7';
	boxes.forEach(function(box){
		c.fillRect(box.x, box.y, box.width, box.height);
	});
});

var clicks = 0;

game.on('start', function(){
	gremlins
	.createHorde()
	.gremlin(
		gremlins.species.clicker()
		.clickTypes(['click'])
		.showAction(function(x, y){
			boxes[clicks] = new Box(x, y);
			clicks += 1;
		})
	)
	.unleash();
});

game.start();
```

## Let's take a look at this example broken down into chunks:

### Import the gameloop and gremlins.js modules using the require statement:

```
var Game = require('gameloop');
var gremlins = require('gremlins.js');
```

### Create a canvas tag and append it to the body of the html file:

```
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
```

### Create a new game object, setting the 2d context of the canvas as the game renderer:

```
var game = new Game({
  renderer: canvas.getContext('2d')
});
```

### Set a width and height for the game/canvas that's equal to the window width and height:

```
game.width = canvas.width = window.innerWidth;
game.height = canvas.height = window.innerHeight;
```

### Create an array to store all the boxes that our gremlins will create:

```
var boxes = [];
```

### Create a box constructor that the gremlins will use to create boxes:

```
function Box (x, y){
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 10;
	console.log('made a box', this);
}
```

### On the game's draw event draw each of the boxes that the gremlins have created:

```
game.on('draw', function(c){
	c.fillStyle = '#9f8ef7';
	boxes.forEach(function(box){
		c.fillRect(box.x, box.y, box.width, box.height);
	});
});
```

### Start a clicks counter that will keep track of how many times the canvas has been clicked by gremlins:

```
var clicks = 0;
```

### Start the game, unleashing a horde of gremlins:

```
game.on('start', function(){
	gremlins
	.createHorde()
	.gremlin(
		gremlins.species.clicker()
		.clickTypes(['click'])
		.showAction(function(x, y){
			boxes[clicks] = new Box(x, y);
			clicks += 1;
		})
	)
	.unleash();
});

game.start();
```

The most basic usage of the gremlins module looks like this:

```
gremlins.createHorde().unleash();
```

But in this case I want to unleash only gremlins that click, so I use the .gremlin() method to create a specific "species" of gremlin:

```
.gremlin(
	gremlins.species.clicker()
	.clickTypes(['click'])
	.showAction(function(x, y){
		boxes[clicks] = new Box(x, y);
		clicks += 1;
	})
)
```

I override the .showAction() method to create new boxes and increment the `clicks` variable. By default the gremlins will show a red circle where they click, by overriding in this way those red circles are hidden and we get to create box entities in the game.

## Running this example

To run this example, install beefy and browserify:

```
npm install -g beefy browserify
```

And run the beefy command:

```
beefy index.js:bundle.js --live
```

You can now go to `http://localhost:9966` to see this in action. This command assumes the code lives in a file named index.js. Beefy will automatically serve a minimal index.html file to the browser, which is convenient for small example projects like this.


## This is silly

This isn't how Gremlins.js is _meant_ to be used, but that's alright. It's pretty easily adapted to purposes like this, and is a fun way to learn the library. 

You should make something weird with these modules and let me know how it goes.

## See the full example

You can check out the source code for this example here: [github.com/sethvincent/gremlins-canvas-experiment](http://github.com/sethvincent/gremlins-canvas-experiment)

And see it in action here: [sethvincent.github.io/gremlins-canvas-experiment](http://sethvincent.github.io/gremlins-canvas-experiment)