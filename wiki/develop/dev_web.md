---
layout: default
parent: Apps
nav_order: 1
title: Web Snippets
author: Yue Wu <me@blaulan.com>
created:  2016-01-09 00:00:00
modified: 2020-08-27 20:25:05
tags: [dev, work]
---

## JavaScript

- Wait 3 seconds and jump to the root page:
```javascript
<script type="text/javascript">
    setTimeout(function () {
        window.location.replace("/");
    }, 3000);
</script>
```

- [Submit](https://stackoverflow.com/questions/25983603/how-to-submit-html-form-without-redirection) html form without redirection:
```javascript
function SubForm () {
    $.ajax({
        url: '/post',
        type: 'post',
        data:$('#myForm').serialize(),
        success:function(){
            console.log("worked");
        }
    });
}
```

### JS Bookmarklet

- Load English/Chinese Version of Current Wiki Page:
```javascript
javascript:(function() {
    window.location.href = document
    .getElementsByClassName('interlanguage-link interwiki-en')[0]
    .getElementsByTagName('a')[0].href;
})()
```

- Open All Entries in Pocket:
```javascript
javascript:(function() {
    var links = document.getElementsByClassName('item');
    for (var i = 0; i < links.length; i++) {
        window.open(links[i].getElementsByClassName('original_url')[0].href, '_blank');
    }
})();
```

### simple example of `JSMaze`

```html
<body onKeyPress="keyDown(event);">
  <script type="text/javascript" src="/assets/js/maze.js"></script>
  <script type="text/javascript">
    window.onload = function() {
      LoadMaze();
      document.getElementById('maze').innerHTML = [
        '\n<h2 align="center">Seems Like a Wrong Path?</h2><br>',
        Maze_HTML,
        '\n'+SOLVER_SETTINGS+'\n'+STATS
      ].join('');
    newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = '/assets/js/solver.js';
    document.getElementsByTagName('body')[0].appendChild(newScript);
    }
  </script>
  <div id="maze"></div>
</body>
```

### simple example of `d3.js`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>D3.JS EXAMPLE</title>
    <link type="text/css" rel="stylesheet" href="/assets/css/web_d3.css"/>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.19/topojson.min.js"></script>
  </head>
  <body>
    <div class="content">
      <h1 class="title">D3.JS EXAMPLE</h1>
      <div id="map"></div>
      <div id="brush"></div>
    </div>
    <script src="/assets/js/web_d3.js"></script>
  </body>
</html>
```
