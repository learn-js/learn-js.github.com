---
title: "Making GIFs on the command-line with gifify"
slug: making-gifs-command-line-gifify
published: true
layout: post
type: post
---

I like making gifs.

You also probably like making gifs.

It's a thing we do.

On a regular basis I'll have video from television shows or movies or other video I've taken myself like screencasts that I want to turn into a gif.

Turning video into a gif can be done using online services, but I need a quick way to do it on the command line.

I've previously used this bash script: [gist.github.com/SlexAxton/4989674](https://gist.github.com/SlexAxton/4989674)

But I was excited to discover an npm module that was built for this purpose: [gifify](https://github.com/vvo/gifify)

It can be used on the command line _and_ as a Node module that supports streams.

## Installation

gifify has three dependencies:

- [ffmpeg](http://ffmpeg.org/)
- [imagemagick](http://www.imagemagick.org/)
- [giflossy](https://pornel.net/lossygif)

Here are instructions for installing those dependencies on a Mac:

### ffmpeg & imagemagick
You'll need [homebrew](http://brew.sh) if you don't already have it.

To install ffmpeg & imagemagick with homebrew run this command:

```
brew install ffmpeg & imagemagick
```

### giflossy

This tool for reducing image file size needs to be installed from the source.

I found that I needed to install automake before following the install instructions for giflossy:

```
brew install automake
```

Follow full instructions here: [github.com/pornel/giflossy#building-gifsicle-on-unix](https://github.com/pornel/giflossy#building-gifsicle-on-unix)

After following those install instructions you'll have a `gifsicle` command available.

### Install gifify

Now that we have the dependencies installed we can install gifify using npm:

```
npm install -g gifify
```

The `-g` option installs the package globally so that we can use its `gifify` command.

### Using gifify

The moment we've been waiting for: let's make a gif.

Here's the options for the command-line usage:

```
> gifify -h

Usage: gifify [options] [file]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    --fps <n>            Frames Per Second, defaults to 10
    --from <position>    Start position, hh:mm:ss or seconds, defaults to 0
    --colors <n>         Number of colors, up to 255, defaults to 80
    --compress <n>       Compression (quality) level, from 0 (no compression) to 100, defaults to 40
    -o, --output <file>  Output file, defaults to stdout
    --resize <WxH>       Resize output, use -1 when specifying only width or height. `350x100`, `400x-1`, `-1x200`
    --speed <n>          Movie speed, defaults to 1
    --to <position>      End position, hh:mm:ss or seconds, defaults to end of movie
```

I found that with some videos I've needed to use the `gt-faststart` command that comes with ffmpeg on a video before the `gifify` command would work.

So I would first make a compatible video:

```
qt-faststart video.mov video2.mov
```

Then run `gifify`:

```
gifify video2.mov -o video.gif
```

Here's an example of a gif I made from the video of one of the first games I've made:

![jumpbud](/img/jumpbud.gif)

### gifify on GitHub: 

[github.com/vvo/gifify](https://github.com/vvo/gifify)

### gifify on npm: 

[npmjs.org/gifify](https://npmjs.org/gifify)