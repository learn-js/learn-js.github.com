---
title: "Learning to code? You should learn about development environments"
slug: learn-about-development-environments
published: true
layout: post
type: post
---

## Wait, what is this development environment thing?
A development environment is like a digital workshop. A workspace and set of tools for building software projects.

Before you release your project to the world wide web, you work on it in your development environment.

This is usually your laptop or desktop computer at home or work. It's the command-line tools, text editor, and other programs that work with your programming language of choice.

Learning to code is difficult, but learning about the wide array of tools involved with setting up a development environment is what makes it so challenging going from writing a little JavaScript on sites like Codecademy to building actual web projects.

## What's included in a development environment?
For programming languages like Ruby, JavaScript, and Python, a development environment usually includes these things:

- Programming language
- Tool for managing programming language versions and individual environments for projects
- Package manager for installing libraries of code (sometimes included with the programming language).
- Tool for managing the dependencies of a project (sometimes included in the package manager).
- Version control system (often people use git, and host code on GitHub)
- Tool for running tasks like building & testing your project
- Testing tools to ensure your code works
- Text editor

### A Ruby development environment
If you're working on a Ruby project, a development environment would likely include these tools:

- [rvm](http://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv) for managing versions of Ruby
- the gem command for installing Ruby libraries (included with the Ruby language)
- [bundler](http://bundler.io/) for managing the dependencies of a project (using the Gemfile)
- [git](http://git-scm.com/) for the version control system
- [rake](https://github.com/jimweirich/rake) for running tasks like building or testing the project
- [minitest](https://github.com/seattlerb/minitest) or [rspec](http://rspec.info/) for testing the code
- [atom](https://atom.io/), [sublime](http://www.sublimetext.com/), or [vim](http://vim-adventures.com/) for the text editor


### A JavaScript development environment
If you're working on a JavaScript/Node.js project, a development environment would likely include these tools:

- [nvm](https://github.com/creationix/nvm) for managing versions of Node.js (or just install from nodejs.org)
- [npm](https://www.npmjs.org/) for installing JavaScript modules (included with Node.js)
- [npm](https://www.npmjs.org/) for managing the dependencies of a project (using the package.json file)
- [git](http://git-scm.com/) for the version control system
- [npm run](https://www.npmjs.org/doc/cli/npm-run-script.html), [gulp](http://gulpjs.com/) or [grunt](http://gruntjs.com/) for running tasks like building or testing the project
- [tape](https://github.com/substack/tape) or [mocha](http://visionmedia.github.io/mocha/) for testing the code
- [atom](https://atom.io/), [sublime](http://www.sublimetext.com/), or [vim](http://vim-adventures.com/) for the text editor

### A Python development environment
If you're working on a JavaScript/Node.js project, a development environment would likely include these tools:

- [virtualenv](http://virtualenv.readthedocs.org/en/latest/) for creating individual environments for each project
- [pip](https://pip.pypa.io/en/latest/) for installing Python libraries
- [pip](https://pip.pypa.io/en/latest/) for managing the dependencies of a project (using the requirements.txt file)
- [git](http://git-scm.com/) for the version control system
- [fabric](http://www.fabfile.org/) for running tasks like building or testing the project
- [unittest](https://docs.python.org/2/library/unittest.html) for testing the code
- [atom](https://atom.io/), [sublime](http://www.sublimetext.com/), or [vim](http://vim-adventures.com/) for the text editor

There are a lot of similarities and subtle differences between those three languages! Things get even more complex when you start developing in a more diverse range of languages. Throw in Objective-C, Java, C++ or other languages with more language-specific tools, and your little digital workshop starts to get cluttered.

For now we'll only include these three web-focused languages, Ruby, JavaScript, and Python, to keep things simple.

## Part of a workflow
A development environment is one stage in the workflow, or release cycle, of a project.

###A common workflow for web projects has these environments:
- **Development:** create the project on your computer.
- **Staging:** move the project to a private or semi-public server for testing purposes
- **Production:** move the project to production to make it live after it is approved in staging environment

### Development
The development environment is usually your laptop or desktop computer, but can also be a remote computer. Sometimes people use services like nitrous.io, terminal.com or even Digital Ocean or Linode as the place where they work on projects. This trend has grown with the usage of Google Chromebooks and other small laptops.

But for the purpose of this article, we'll assume that your development environment is on your personal computer.

Everything you need to build and maintain your project should exist in your development environment, and will ideally be similar or identical to the production environment on which your project will be released.

Each person on a team will have their own development environment, and code is shared and collaborated on with the help of a version control system like git.

It's useful for a team to have similar or identical development environments to ensure that strange errors don't create roadblocks for particular members of a team.

### Staging
The staging environment is where you can test your project in an environment that is identical to the production environment. It's also where the team and other stakeholders in a project evaluate and make decisions about the progress of a project.

After approval, a project is moved to the production environment.

### Production
This is it, the moment you've been waiting for. You've moved your project to production, so it's live and anyone can see it.

There are a lot of things that can go wrong in between the idea for a project, building the project, and making the project public. A well-organized and maintained development environment is a big part of successfully building projects and moving them to production. It's hard to build in a messy workshop.

One of the best practices for making it easy to move a project between development, staging, and production environments is to make sure they are identical.

## How can a development environment be identical to production?

The development, staging, and production environments should have the same operating system (and ideally same version of OS), the same version of the programming language, the same dependencies and versions of those dependencies, and use the same version control & task-runner tools.

Most of those requirements are easy to meet if you've been thoughtful about organizing your project. The hardest components to make identical are often the operating system and programming language version.

Let's say you've decided that your production environment is going to run Ubuntu 14.04, and it's a Node.js project.

You've got a Windows machine, so your development environment is wildly different. You've installed Node.js a while ago, so you've got version 0.9.0 on your Windows machine, while the production server has the latest Node version.

You could easily reinstall Node to get the versions in sync, but you'd still have completely different operating systems.

This is where you can use [Vagrant](https://www.vagrantup.com/), a tool for managing virtual machines, which helps you manage guest operating systems that run inside of your operating system.

![os in os](http://cdn.meme.li/instances/500x/48728903.jpg)

Using vagrant, you can run an instance of Ubuntu 14.04 on your Windows machine, use Ubuntu as your development environment, and install the latest Node version so that your development environment now matches your production environment!

And that friend that uses a Mac that wants to help with your project? They can use vagrant to run Ubuntu 14.04 on their computer so that their development environment is the same as yours! No weird Mac vs. Windows issues on your team.

## Hey, that's a lot of stuff

It is. Learning to set up a development environment can be the hardest part of learning to code. But it's worth it! Being purposeful and organized in your approach to your development environment helps you build & maintain projects, as well as work on a team effectively.

Want help learning about development environments? I'm working on a book that teaches how to set up Ruby, JavaScript, and Python development environments, the basics of using git, vagrant, and various text editors, and walks you through building simple web applications using each of the three languages.

<div class="discover">
<p>The book <i>Development Environments for Beginners</i> is about to have it's first major release. You can find out about the release and get an early sample copy by signing up for the Learn.js newsletter:</p>
</div>

You can also learn more about the book at [developmentenvironments.com](http://developmentenvironments.com).
