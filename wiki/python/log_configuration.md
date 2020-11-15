---
layout: default
parent: Python
nav_order: 2
title: Log Configuration
author: Yue Wu <me@blaulan.com>
created:  2020-06-04 16:39:07
modified: 2020-08-27 20:25:05
tags: [python, work]
---

```python
import logging
import logging.config
logging.config.dictConfig(self._config['logging'])
logger = logging.getLogger()
```

```json
{
    "version": 1,
    "disable_existing_loggers": false,
    "formatters": {
        "single-line": {
            "class": "logging.Formatter",
            "style": "{",
            "datefmt": "%Y-%m-%d %I:%M:%S",
            "format": "{asctime:s} {levelname:5s} [{name:<10s}] {lineno:4d} {message:s}"
        }
    },
    "handlers": {
        "console":{
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "single-line",
            "stream" : "ext://sys.stdout"
        },
        "file_handler": {
            "level": "DEBUG",
            "class": "logging.handlers.WatchedFileHandler",
            "formatter": "single-line",
            "filename": "./default.log",
            "mode": "a",
            "encoding": "utf-8"
        }
    },
    "loggers": { },
    "root": {
        "handlers": ["console", "file_handler"],
        "level": "DEBUG"
    }
}
```
