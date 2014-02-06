---
title: "Introducing npm recipes as an introduction to JavaScript & Node.js"
slug: npm-recipes-introduction
published: true
layout: post
type: post
---

*npm recipes* is a new feature on Learn.js meant to showcase awesome modules found on [npm](http://npmjs.org).

There are over 50,000 modules on npm, so there's a wildly big number of opportunities for checking out how various npm modules can work together.

Interested in keeping up with new npm recipes? Subscribe to the Learn.js newsletter to get updates:

<div id="mc_embed_signup">
<form action="http://learnjs.us5.list-manage.com/subscribe/post?u=b5b4f7fda673e887e9380b619&amp;id=3eb1d4ee40" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
  <h2></h2>
<div class="mc-field-group">
  <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Your email">
  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
</div>
  <div id="mce-responses" class="clear">
    <div class="response" id="mce-error-response" style="display:none"></div>
    <div class="response" id="mce-success-response" style="display:none"></div>
  </div>
    <div style="position: absolute; left: -5000px;"><input type="text" name="b_b5b4f7fda673e887e9380b619_3eb1d4ee40" value=""></div>
</form>
</div>

### Here are all the npm recipes published so far:

<ul class="posts">
  {% for post in site.posts %}
    {% if post.published and post.npmrecipe %}
      <li class="post" id="{{ post.slug }}">
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%-d %B %Y" }}
      </li>
    {% endif %}
  {% endfor %}
</ul>