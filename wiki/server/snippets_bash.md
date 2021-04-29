---
layout: default
parent: Server
nav_order: 2
title: Bash Snippets
author: Yue Wu <me@blaulan.com>
created:  2019-08-23 00:00:00
modified: 2021-04-29 11:55:23
tags: [server]
---

## GRAPHIC OPERATIONS

- `imagemagick` resize all photos:
```bash
convert *.jpg -resize 50%
```

- `ffmpeg` cut video clip:
```bash
ffmpeg -i "path/to/video.mp4" -ss 00:24:00 -t 00:01:00 -c:v libx265 -crf 28 cut.mp4
```

## FILE OPERATIONS

- tree with non-ascii char
```bash
tree -N [DIRECTORY]
```

- execute command on each file
```bash
find *.csv -print | xargs -n1 /path/to/command
```

- copy specific files to a folder
```bash
fd "*.csv" | xargs -I @ cp @ ~/Downloads/
```

- export file name with content
```bash
fd ".*\.java" . | xargs -I{} gsed '1s$^$\n{}\n-----\n\n$' "{}" >~/Downloads/output.txt
```

- add a line at the beginning of files
```bash
# https://superuser.com/a/246841
fd '.+\.cc' | xargs -I{} gsed -i '1s/^/CONTENT\n/' "{}"
```

- sync files less than 3 days old
```bash
rsync -azvhP $source_server:$source_path . \
    --files-from=<(ssh $source_server "cd $source_path && find . -mtime -3 -type f")\
```

## EXECUTE PROCESS

- exec task in the background w/o output
```bash
COMMAND &>/dev/null & echo $! >pid & top -p $(<pid)
```

- task info for pid
```bash
ps -o %cpu,%mem,cmd -p $pid
```

- fetch command from pid
```bash
cat /proc/[PID]/cmdline
ps -p [PID] -o args
```

- network inspection
```bash
lsof -i :9876
cat /etc/services | grep "9876"
```

- echo current datetime
```bash
echo "started at $(date '+%Y-%m-%d %H:%M:%S')"
```

## MISCELLANEOUS

- reset python env links
```bash
set env_path ~/.virtualenvs/bean
find $env_path -type l -delete
virtualenv $env_path
```

- history of top most used commands:
```bash
history | awk '{CMD[$1]++;count++;}END { for (a in CMD)\
    print CMD[a] " " CMD[a]/count*100 "% " a;}' | grep -v "./" \
    | column -c3 -s " " -t | sort -nr | nl | head -n10'
```

- `qpdf` split pdf file using:
```bash
qpdf --empty --pages [SOURCE FILE] [STARTING PAGE]-[ENDING PAGE] -- [OUTPUT FILE]
```

- `pandoc` convert `.tex` file to `.dox`:
```bash
pandoc -s -S [SOURCE FILE] -o [OUTPUT FILE]
```

- `vim` save file with sudo: 
```bash
:w !sudo tee %
```

- [Restore](http://blog.mx17.net/2014/02/14/restore-etc-configuration-file-original-maintainer-version-debian/) a missing configure file: 
```bash
apt-get install --reinstall -o Dpkg::Options::="--force-confmiss" <package name>
```

- disable `ssh` from sending `LC_*` environment variables:
```bash
# https://askubuntu.com/a/874765
alias ssh="ssh -F ~/.ssh/config"
```
