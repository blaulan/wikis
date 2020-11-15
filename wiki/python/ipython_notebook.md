---
layout: default
parent: Python
nav_order: 2
title: IPYNB Initialization
author: Yue Wu <me@blaulan.com>
created:  2019-11-02 22:43:45
modified: 2020-08-27 20:25:05
tags: [python, work]
---

```python
import os
import sys
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# adjust display configs
%matplotlib inline
plt.style.use('ggplot')
plt.rcParams['figure.figsize'] = (16, 9)
pd.set_option('display.max_columns', None)
plt.rcParams['font.family'] = ['Noto Sans CJK SC']

# auto reload modules
%load_ext autoreload
%autoreload 1
sys.path.append('src')
%aimport geographic
%aimport utils

# enable nested async
import nest_asyncio
nest_asyncio.apply()
```
