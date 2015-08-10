---
title: "npm recipes as an introduction to JavaScript & Node.js"
slug: npm-recipes-introduction
published: true
layout: post
type: post
---

*npm recipes* is a new feature on Learn.js meant to showcase awesome modules found on [npm](http://npmjs.org).

There are over 50,000 modules on npm, so there's a wildly big number of opportunities for checking out how various npm modules can work together.

### Here are all the npm recipes published so far:
<br>
<ul class="posts small">
  {% for post in site.posts %}
    {% if post.published and post.npmrecipe %}
      <li class="post" id="{{ post.slug }}">
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%-d %B %Y" }}
      </li>
    {% endif %}
  {% endfor %}
</ul>

### Interested in keeping up with new npm recipes? 

<p>Get the book for free here: <a href="https://gumroad.com/l/npm-recipes">npm recipes</a></p>
