---
layout: default
title: Tags
permalink: /tags
nav_exclude: true
search_exclude: true
---

{% comment %}
check out example at:
https://github.com/pdmosses/test-nav/blob/master/_layouts/tags.html
{% endcomment %}

{% comment %}
For each page and tag, generate an array of quadruples [slug, title, tag, url]
{% endcomment %}

{% assign site_quads = "" | split: "X" %}
{% for page in site.pages %}
  {%- unless page.nav_exclude -%}
    {% for tag in page.tags %}
      {% assign slug = tag | slugify: "pretty" %}    
      {% assign quad = "" | split: "X" 
              | push: slug
              | push: page.title
              | push: tag
              | push: page.url %}
      {% assign site_quads = site_quads | push: quad %}
    {% endfor %}
  {% endunless %}
{% endfor %}

{% comment %} Group the quadruples by their slugs {% endcomment %}

{% assign site_slug_quad_hashes = site_quads 
            | group_by_exp: "item", "item[0]" %}

{% comment %} Generate a section of links for each slug {% endcomment %}

<div id='tag_cloud'>
{% for slug_quads_hash in site_slug_quad_hashes %}
  {% assign slug = slug_quads_hash.name %}
  <a href="#{{ slug }}" title="{{ slug }}">{{ slug }}</a>
{% endfor %}
</div>

{% for slug_quads_hash in site_slug_quad_hashes %}
  {% assign slug = slug_quads_hash.name %}
  {% assign quads = slug_quads_hash.items | sort %}
  <h3 id="{{ slug }}">#{{ slug }}</h3>
  <ul>
    {% for quad in quads %}
      <li><a href="{{ site.url }}{{ site.baseurl }}{{ quad[3] }}">{{ quad[1] }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
