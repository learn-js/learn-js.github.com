---
title: "Introducing <i>npm recipes</i> as an introduction to JavaScript & Node.js"
slug: npm-recipes-introduction
published: false
layout: post
type: post
---

<ul class="posts">
  {% for post in site.posts %}
    {% if post.published and post.type == 'post' and post.npmrecipe %}
      <li class="post" id="{{ post.slug }}">
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%-d %B %Y" }}
      </li>
    {% endif %}
  {% endfor %}
</ul>