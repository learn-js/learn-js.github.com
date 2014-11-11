---
title: "Installing repositories without a package.json file using napa & browserify-shim"
slug: installing-repositories-without-a-package-json-file-using-napa-browserify-shim
published: false
layout: post
type: post
---

You use [Browserify](http://browserify.org) for bundling your browser-side JavaScript & you like it, but there's a problem: there are many useful JavaScript libraries published on GitHub that aren't published on npm & that don't have a package.json file. So what do you do?

**One solution: use [napa](https://github.com/shama/napa) & [browserify-shim](https://github.com/thlorenz/browserify-shim)**

napa is a command-line tool that allows you to install repositories from GitHub and use them as if they have a package.json file / are published to npm.

browserify-shim takes JavaScript modules that are not CommonJS-compatible but that expose a global variable, and turns them into modules that can be required using the CommonJS/Node.js `require()` statement.

To explore the usage of napa, let's set up the dependencies for a simple project. We'll install some dependencies that are published on npm and some that are only on GitHub and that do not have a package.json file.

## When are napa & browserify-shim necessary?

If a repository on GitHub has a package.json file with a `main` property pointing to the repository's main javascript file, you don't need napa.

In that case you can install the project using this syntax:

```
npm install --save github-user-name/project-name
```

But if the repository doesn't have a package.json file that's where napa comes in.

And if the JavaScript isn't CommonJS-compatible that's when browserify-shim is useful.

## Getting set up

Let's get started with our project. In this example we'll install jQuery from npm and 

First we'll create a package.json file.

## Create a package.json file


An easy way to create a package.json file is by running the command `npm init` in the terminal. Complete the prompts and it will generate a package.json file for you that looks something like this:

```
{
  "name": "napa-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## Install napa & browserify-shim

```
npm install --save-dev napa browserify-shim
```

The `--save-dev` option saves these package as development dependencies.

Let's also save browserify and beefy as development dependencies:

```
npm install --save-dev browserify beefy
```


## The `install` script

To download dependencies with napa, let's use run the `napa` command using the built-in `install` life-cycle script of npm.

This way, any time you or a team member installs the dependencies of the project using `npm install`, the dependencies that are installed with napa are also downloaded.

Revise the scripts property of your package.json file to look like this:

```
"scripts": {
  "install": "napa"
},
```

## The `napa` property

We'll add a `napa` property to the package.json file where we'll specify 

napa on GitHub: [github.com/shama/napa](https://github.com/shama/napa)