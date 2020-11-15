---
layout: default
parent: Python
nav_order: 2
title: Pandas Shortcuts
author: Yue Wu <me@blaulan.com>
created:  2019-11-02 22:49:42
modified: 2020-10-22 17:35:08
tags: [python, work]
---

- [Useful Pandas Snippets](http://www.swegler.com/becky/blog/2014/08/06/useful-pandas-snippets/):
```python
#Convert Series datatype to numeric, getting rid of any non-numeric values
df['col'] = df['col'].astype(str).convert_objects(convert_numeric=True)
```

- convert time delta to millisecond
```python
# https://docs.scipy.org/doc/numpy-1.13.0/reference/arrays.datetime.html
(df['end']-df['start'])/np.timedelta64(1, 'ms')
(df['end']-df['start']).dt.total_seconds()*1000
```

- group and summarize:
```python
df.groupby(['x', 'y']).agg({'z': 'sum'})
```

- tell if `value` is null:
```python
pd.isnull(value)
```

- make `np.int64` serializable[^1]:
```python
import json
import numpy as np
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)
json.dumps(data, cls=NpEncoder)
```

- calculate business days between two dates including holidays:
```python
from pandas.tseries.offsets import CustomBusinessDay
from pandas.tseries.holiday import USFederalHolidayCalendar
bday_us = CustomBusinessDay(calendar=USFederalHolidayCalendar())
bussinesdays = pd.date_range('STARTING DATE','ENDING DATE',freq=bday_us)
```

## References

[^1]: [TypeError: Object of type 'int64' is not JSON serializable](https://stackoverflow.com/a/57915246)
