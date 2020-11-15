---
layout: default
parent: Apps
nav_order: 2
title: Mac Serach Photos
author: Yue Wu <me@blaulan.com>
created:  2018-10-19 00:00:00
modified: 2020-08-27 20:25:05
tags: [python, app]
---

Search photos with the same month and day of creation on Mac:

```python
import os
import sys
import shutil
import subprocess
from datetime import date

if len(sys.argv)>1:
    month, day = int(sys.argv[1][:2]), int(sys.argv[1][2:])
    today = date(date.today().year, month, day)
else:
    today = date.today()

dat = 'InRange(kMDItemContentCreationDate,"$time.iso({})","$time.iso({})")'
inrange = []
for year in range(today.year-9,today.year+1):
    s = '{}-{}T00:00:00Z'.format(year, today.isoformat()[5:])
    e = '{}-{}T23:59:59Z'.format(year, today.isoformat()[5:])
    inrange.append(dat.format(s, e))
condition = '\'({}) && (_kMDItemGroupId = 13)\''.format(' || '.join(inrange))
cmd = ['mdfind', '-onlyin', 'YOUR PHOTO FOLDER PATH', condition]

output = subprocess.check_output(' '.join(cmd), shell=True)
paths = output.split("\n")[:-1]

dst = "/tmp/{}/".format(today.isoformat())
if os.path.isdir(dst):
    shutil.rmtree(dst)
os.mkdir(dst)
for img in paths:
    # shutil.copy(img, dst)
    os.link(img, dst+os.path.basename(img))

subprocess.call("open {}".format(dst), shell=True)
```
