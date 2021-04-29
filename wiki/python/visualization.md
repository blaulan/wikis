---
layout: default
parent: Python
nav_order: 2
title: Visualization Catalog
author: Yue Wu <me@blaulan.com>
created:  2019-11-02 22:47:53
modified: 2021-04-12 18:44:11
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
def plot_nodes(nodes, layer, color='#ff0000', connect=False):
    coords = []
    for n in nodes:
        coord = [n['lat'], n['lon']]
        tooltip = folium.map.Tooltip(n['name'], sticky=False, permanent=True)
        folium.Circle(
            location=coord, tooltip=tooltip,
            radius=20, fill=True, color=color, fillColor=color
        ).add_to(layer)
        coords.append(coord)
    if connect:
        folium.PolyLine(
            coords, color=color, weight=2.5, opacity=1
        ).add_to(base_map)
    return coords
# https://python-visualization.github.io/folium/modules.html
base_map = folium.Map(location=[38.0, 105.0], tiles='OpenStreetMap', zoom_start=4)
nodes = plot_nodes(nodes, base_map, '#00ff00', False)
base_map.fit_bounds([
    (min([n[0] for n in nodes])-0.1, min([n[1] for n in nodes])-0.1),
    (max([n[0] for n in nodes])+0.1, max([n[1] for n in nodes])+0.1)
])
base_map
```

## References

![Effectively Using Matplotlib]({{ site.imgbase }}/matplotlib-pbpython-example.png)

- [Effectively Using Matplotlib - Practical Business Python](http://pbpython.com/effective-matplotlib.html)
- [A Dramatic Tour through Python’s Data Visualization Landscape](https://dsaber.com/2016/10/02/a-dramatic-tour-through-pythons-data-visualization-landscape-including-ggplot-and-altair)
