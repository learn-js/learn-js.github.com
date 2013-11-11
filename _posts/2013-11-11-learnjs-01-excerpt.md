---
title: 'Open sourcerers: assorted ideas on beginning programming (excerpt from Learn.js #1)'
slug: learnjs-01-excerpt-nov11
published: true
layout: post
---

## Enter the wild and wondrous land of javascripting.
To control a computer with code can feel like wielding a weird and mighty magic. It can seem intangible and unfamiliar, but it’s important to know that code is real and learnable. 

Magic in popular culture typically belongs to those who are born with the power.

The magic of programming belongs to those who practice.

See what some old wizards (Gerald Jay Sussman and Hal Abelson) had to say about the similarities between programming and sorcery in a book called _[Structure and Interpretation of Computer Programs](http://mitpress.mit.edu/sicp/full-text/book/book.html)_:

> A computational process is indeed much like a sorcerer's idea of a spirit. It cannot be seen or touched. It is not composed of matter at all. However, it is very real. It can perform intellectual work. It can answer questions. It can affect the world by disbursing money at a bank or by controlling a robot arm in a factory. The programs we use to conjure processes are like a sorcerer's spells. They are carefully composed from symbolic expressions in arcane and esoteric _programming languages_ that prescribe the tasks we want our processes to perform.

Let’s be sorcerers. _Open Sourcerers_. Let's write some weird little programs, and, as they say in SICP,  “conjure the spirits of the computer with our spells.”



## Overview of the future
This book is the first in a series about building projects with javascript. If you haven’t already you should sign up for updates by [subscribing to the Super Big Tree newsletter](http://eepurl.com/rN5Nv).

## Setting up a development environment
There’s a lot of wind-up to getting started programming. You should understand things like git, github, the terminal, and more.

Instead of baking that information into each book in the series, I created a book called Development Environments for Beginners that helps you set up a javascript development environment (as well as ruby and python, but you can skip those sections if needed).

From that book you’ll learn how to install node.js, work with version control and testing tools, best practices for automating tasks and other programming tips and tricks.

If you’re feeling like you could use more information about what a development environment is and how best to set one up, you can purchase the Development Environments book at [superbigtree.com/books/dev-envs](http://superbigtree.com/books/dev-envs).

If needed you can check out the Development Environments book on GitHub for free here: [github.com/sethvincent/dev-envs](http://github.com/sethvincent/dev-envs).

Though, if you’re feeling generous and able to purchase the book, that’ll get you pdf, epub, and mobi versions, as well as support my work.



## Node style
We will write in the style of node.js.

Even our code written for the browser will utilize the node.js style of modules thanks to browserify, a tool for bundling node modules for the browser.

This means that we won’t cover the RequireJS/AMD toolset for javascript development, but will focus on node/CommonJS modules.

You’ll learn more about this later in the book as we go into depth with browserify and node modules.

But for now, know that this book will be applicable to pretty much any javascript you write, and will provide additional resources for writing in the style of node.js.



## Who are you? Who am I? What is this?

### The book
This book is an introductory text. You likely got that from the title. I aim for this book to be a conversational and low-barrier approach to learning javascript. Everything we work on in this book can be done with just a browser, a terminal, and a text editor.

The book covers introductory node.js, and writing client-side code using node modules and browserify.

It’s meant as an introductory text that will get people up to speed for following books in the Learn.js series.

### The reader
I expect that the ideal reader for this book is someone who likes exploring, imagining, and inventing for themselves. You might even have some experience with javascript already. And that’s OK, because practicing, and even repetition is an important part of learning.

### The author
I’m Seth Vincent. I write code, stories, and music. 

I’m an independent programmer, designer and writer that is passionate about news, publishing and civic technology – particularly as it applies to local issues.

I’m a co-organizer of [seattle.io](http://seattle.io), [Code for Seattle](http://codeforseattle.org/), and [SeattleWiki](http://seattlewiki.net/). 

In case you couldn’t tell, I currently live in Seattle, Washington.

I write books like the one you’re reading, and build things like [crtrdg.js, a toolkit for 2d games](http://crtrdg.github.io/) at [Super Big Tree](http://superbigtree.com/).



## Keep coding
You're at a computer and your hands are sweaty. You have a text editor open and you're reading dense, arcane instructions.

You're about to write javascript for the first time.

It’s difficult, and it doesn’t make sense at first. This is normal.

You’re going to make mistakes.  There’s a trick for dealing with that problem. A trick that works really well.

The trick is to be OK with making mistakes.

Accept that you’re going to fail really hard at first.

I couldn’t ride a bike until I was embarrassingly old – in middle school. All my friends were riding bikes, and I couldn’t keep up with them unless I was on a bike. That motivated me to learn. To be a competent bike rider I had to ignore the moments when I ran into parked cars and fell over.

I had to really want it.

You will forget commas, or type semi-colons instead pf colons, or type something with a capital letter that’s supposed to be all lowercase.

You will run a program and spend agonizing minutes wondering why it spits errors, then realize you haven’t downloaded the needed dependencies.

You’re going to fuck up.

But that’s OK, because you’re OK with fucking up.

This book is meant to help guide you past common fuck-ups, but the book won’t solve all your problems for you. 

Your mastery of programming relies on how motivated you are to learn, and how diligent you are in solving frustrating errors. 

Keep coding.

_This is an excerpt from the book [Learn.js #1: an introduction to javascript and node.js](http://gum.co/learnjs01). The book is still under active development, and you can [buy it early for $10](http://gum.co/learnjs01). You can also [buy it in a bundle with three other books in the series for $25](http://gum.co/bundle01)._