---
layout: default
title: Python
nav_order: 3
has_children: true
---

# Python

- pad zero in formating:
```python
# https://stackoverflow.com/a/339013
print('{0:03d}'.format(n))
```

- reload module:
```python
import sys
sys.path.append('./src')
import processor
importlib.reload(processor)
```

- create properties dynamically:
```python
# https://stackoverflow.com/a/10967617
class ExampleClass:
    def __init__(self):
        self.a = 0
temp = ExampleClass()
temp.__setattr__('b', 1)
```

- "If your code is CPU bound, you should use multiprocessing"[^1], example[^2]:
```python
from concurrent import futures
with futures.ThreadPoolExecutor(max_workers=4) as executor:
    wait_for = []
    for model in models:
        wait_for.append(executor.submit(model.run, params))
    results = []
    for f in futures.as_completed(wait_for):
        results.append(f.result())
```

- start detached progress in the background[^4]:
```python
import os
import sys
import subprocess
process = subprocess.Popen(
    [sys.executable, 'CmdLine.py', '1'],
    stdout=open('logfile.log', 'a'),
    stderr=open('error.log', 'a'),
    preexec_fn=os.setpgrp
)
print('background process stated, pid is {}'.format(process.pid))
```

- exception handling:
```python
import sys
from traceback import print_exc
try:
    balabala
except IndexError:
    print('ops, something went wrong')
except Exception as e:
    # exception information from sys
    # https://docs.python.org/3.7/library/sys.html#sys.exc_info
    print(sys.exc_info())
    # stack trace of the exception
    # https://docs.python.org/3/library/traceback.html
    print_exc()
    # name of the exception
    print(e.__class__.__name__)
    # arguments of the exception
    print(e.args)
```

- specify CORS options on a resource[^3]:
```python
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
@app.route("/api/v1/users")
def list_users():
    return "user example"
```

- rename file to its `md5`:
```python
import os
import shutil
import hashlib
def rename(filename):
    md5 = hashlib.md5()
    suffix = filename.split('.')[-1]
    if suffix in ['png', 'jpg', 'gif', 'jpeg']:
        with open(filename, 'rb') as content:
            md5.update(content.read())
        new_name = md5.hexdigest() + '.' + suffix
        new_path = os.path.join(os.path.dirname(filename), new_name)
        if not os.path.isfile(new_path):
            shutil.move(filename, new_path)
            print(new_name)
def rename_all(filelist):
    for i in filelist:
        if os.path.isfile(i):
            rename(i)
        elif os.path.isdir(i):
            rename_all([os.path.join(i, j) for j in os.listdir(i)])
        else:
            print(i)
```

- intersection of two list of ranges:
```python
# https://stackoverflow.com/a/40368603
def intersections(a,b):
    ranges = []
    i = j = 0
    while i < len(a) and j < len(b):
        a_left, a_right = a[i]
        b_left, b_right = b[j]
        if a_right < b_right:
            i += 1
        else:
            j += 1
        if a_right >= b_left and b_right >= a_left:
            end_pts = sorted([a_left, a_right, b_left, b_right])
            middle = [end_pts[1], end_pts[2]]
            ranges.append(middle)
    ri = 0
    while ri < len(ranges)-1:
        if ranges[ri][1] == ranges[ri+1][0]:
            ranges[ri:ri+2] = [[ranges[ri][0], ranges[ri+1][1]]]
        ri += 1
    return ranges
```

## References

[^1]: [Multiprocessing Vs. Threading In Python: What You Need To Know.](https://timber.io/blog/multiprocessing-vs-multithreading-in-python-what-you-need-to-know/)
[^2]: [concurrent.futures — Manage Pools of Concurrent Tasks](https://pymotw.com/3/concurrent.futures/)
[^3]: [Resource specific CORS - Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#resource-specific-cors)
[^4]: [Run a program from python, and have it continue to run after the script is killed](https://stackoverflow.com/a/16928558)
