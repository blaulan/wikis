---
layout: default
parent: Python
nav_order: 2
title: Visualization Catalog
author: Yue Wu <me@blaulan.com>
created:  2019-11-02 22:47:53
modified: 2020-08-27 20:25:05
tags: [python, work]
---

- Dynamic Plot in Jupyter Notebook
```python
# https://stackoverflow.com/a/21361994
import seaborn as sns
from IPython import display
import matplotlib.pyplot as plt
for i in range(10):
    plt.clf()
    sns.distplot(data)
    display.clear_output(wait=True)
    display.display(plt.gcf())
    time.sleep(1)
display.clear_output()
```

- 使用 `folium` 在地图上绘制
```python
def plot_nodes(path, layer, color):
    coords = []
    for c in path:
        if c not in city_coords:
            print(c)
            continue
        city = city_coords[c]
        coord = [city['lat'], city['lon']]
        folium.Circle(
            location=coord, tooltip=folium.map.Tooltip(c, sticky=False, permanent=True),
            radius=20, fill=True, color=color, fillColor=color
        ).add_to(layer)
        coords.append(coord)
    folium.PolyLine(
        coords, color=color, weight=2.5, opacity=1
    ).add_to(base_map)
    return coords
```

## References

![Effectively Using Matplotlib]({{ site.imgbase }}/matplotlib-pbpython-example.png)

- [Effectively Using Matplotlib - Practical Business Python](http://pbpython.com/effective-matplotlib.html)
- [A Dramatic Tour through Python’s Data Visualization Landscape](https://dsaber.com/2016/10/02/a-dramatic-tour-through-pythons-data-visualization-landscape-including-ggplot-and-altair)
