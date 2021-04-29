---
layout: default
parent: Python
nav_order: 2
title: Geographical Snippets
author: Yue Wu <me@blaulan.com>
created:  2020-08-14 16:24:00
modified: 2021-04-29 11:46:13
tags: [python, work]
---

- 根据经纬度计算球面距离
```python
def crow_fly(coord1, coord2, radius=6371009):
    """calculate crownfly distance between two coords"""
    if coord1[0]==coord2[0] and coord1[1]==coord2[1]:
        return 0

    lon1 = math.radians(coord1[0])
    lat1 = math.radians(coord1[1])
    lon2 = math.radians(coord2[0])
    lat2 = math.radians(coord2[1])

    return math.acos(
        math.sin(lat1)*math.sin(lat2)+
        math.cos(lat1)*math.cos(lat2)*math.cos(lon2-lon1)
    ) * radius
```

- 判断一个点是否在区域内
```python
# 通过高德 API 获取区域边界数据
# https://lbs.amap.com/api/javascript-api/example/district-search/draw-district-boundaries
class ZoneModel:
    """ identify zone based on shapefile """

    def __init__(self, shapefile):
        # read polygon data from file
        with open(shapefile, 'r', encoding='utf-8') as zone_file:
            zone_data = json.loads(zone_file.read())['zones']
            self.zones = {z: mplPath.Path(c + c[:1]) for z, c in zone_data.items()}

    def get(self, x, y):
        for z, p in self.zones.items():
            if p.contains_point((x, y)):
                return z
        return 'NaZ'
```

- 调用高德 API 获取数据
```python
import requests
params = {
    'GAODE_APPKEY': 'API_KEY',
    'API_URL': 'https://restapi.amap.com/v3/geocode/geo',
    'POI_URL': 'https://restapi.amap.com/v3/place/text',
    'ROUTING': 'https://restapi.amap.com/v3/direction/driving'
}
# location api
requests.get(params['API_URL'], params={
    'key': params['GAODE_APPKEY'],
    'address': '人民大道120号',
    'city': '上海市'
})
# location poi
requests.get(params['POI_URL'], params={
    'key': params['GAODE_APPKEY'],
    'keywords': '人民大道120号',
    'city': '上海市'
})
# routing info
requests.get(params['ROUTING'], params={
    'key': params['GAODE_APPKEY'],
    'origin': '121.464295,31.219651',
    'destination': '121.460398,31.218235',
    'strategy': 1
})
```

- retrieve data from Google Maps API:
```python
import googlemaps
client = googlemaps.Client('API_KEY')
result0 = client.geocode('ZIPCODE/CITY/ADDRESS/DICT')
result1 = client.distance_matrix([ORIGIN LIST], [DESTINATION LIST])
```

- 百度座标转换为高德座标
```python
def bd2gd(lon, lat):
    """
    Convert BD-09 to GCJ-02
    https://www.jianshu.com/p/c39a2c72dc65
    https://blog.csdn.net/a13570320979/article/details/51366355
    """
    PI = 3.14159265358979324 * 3000.0 / 180.0
    x = lon - 0.0065
    y = lat - 0.006
    z = math.sqrt(x**2+y**2)-0.00002*math.sin(y*PI)
    theta = math.atan2(y,x)-0.000003*math.cos(x*PI)
    lon = z*math.cos(theta)
    lat = z*math.sin(theta)
    return round(lon, 6), round(lat, 6)
```
