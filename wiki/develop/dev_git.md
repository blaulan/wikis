---
layout: default
parent: Apps
nav_order: 1
title: Git Snippets
author: Yue Wu <me@blaulan.com>
created:  2019-11-02 22:53:26
modified: 2021-04-29 11:36:40
tags: [dev, work]
---

- fetch file(s) from specific commit
```bash
git checkout [BRANCH/COMMIT] -- file(s)
```

- patch changes and unpatch
```bash
# https://stackoverflow.com/a/4126336
git diff HEAD > a.patch
patch -p1 < a.patch
```

- create bare repository
```bash
git init --bare
```

- search string in history
```bash
git log -S 'SEARCH_STRING' --source --all
```

- clone and copy hooks
```bash
# https://unix.stackexchange.com/a/231011
path=$(git clone "$@" --progress 2>&1 | \
  tee /dev/tty | head -n 1 | sed "s/^.*Cloning into '\(.*\)'...$/\1/")
cp ~/path/to/commit-msg ./$path/.git/hooks/
```

- fetch gerrit commit history [^1] [^2]
```bash
ssh [REMOTE] gerrit query --format=JSON --files --current-patch-set status:closed owner:self
```

## References

[^1]: [gerrit search parameters](https://gerrit-review.googlesource.com/Documentation/user-search.html)
[^2]: [gerrit query command](https://review.opendev.org/Documentation/cmd-query.html)
