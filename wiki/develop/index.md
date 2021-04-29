---
layout: default
title: Apps
nav_order: 2
has_children: true
---

# Applications

## youtube-dl Examples

```bash
# extract bilibili playlist
# "(.+?)"(, )? -> https:$1\n
$('.title').map(function(){return this.getAttribute('href')})

# download with youtube-dl or you-get
cat youtube-dl.txt | xargs youtube-dl 
youtube-dl -a youtube-dl.txt
you-get -I youtube-dl.txt
```

## Intellij IDEA Copyright

```text
@Author: Yue Wu <me@blaulan.com>
@Date:   $today.format("yyyy-MM-dd HH:mm:ss")
```
