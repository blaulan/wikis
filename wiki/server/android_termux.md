---
layout: default
parent: Server
nav_order: 3
title: Termux on Android
author: Yue Wu <me@blaulan.com>
created:  2020-08-15 13:00:46
modified: 2021-04-29 11:50:45
tags: [server]
---

First, install [Termux](https://termux.com) on your phone and start the app. Acquire wake lock either by clicking on the Termux notification or entering the `termux-wake-lock` command in the Termux terminal interface. This will prevent the device from going into deep sleep, which disconnect itself from WiFi.

Execute `pkg install openssh && sshd` command in the terminal to enable ssh access from network. Follow [this](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) instruction from github to generate ssh key pairs for authentication purpose. Check out [this](https://wiki.termux.com/wiki/SSH) article from termux wiki on how SSH works in termux.

Connect to termux from your computer via ssh and execute the following script:

```bash
pkg upgrade
pkg install fish tmux tree htop mosh curl

# setup development environment
pkg install clang openssl git
pkg install python python-dev

# install home assistant packages
pip install virtualenv virtualfish
vf new -p python3.8 dev

# initialize tasker integration
mkdir .termux/tasker
```

### backup user directory

```bash
cd /mnt/sdcard/
tar czf backup.tar.gz Backup/ Books/ DCIM/ Download/ Movies/ Pictures/ Tasker/
# on the desktop side, run the following command:
# scp termux:/mnt/sdcard/backup.tar.gz .
rm backup.tar.gz
```

### listener and poster

*listener* on the desktop side:

```python
import re
import hashlib
import webbrowser
import subprocess
from flask import Flask, request
app = Flask(__name__)


auth = 'confess-tinker-fragrant-jelly-evergreen-dosage-undecided'
cmd_decrypt = """
echo '{}' | base64 --decode | openssl smime -decrypt \
    -binary -inform DER -inkey ~/.ssh/termux-private.pem
""".strip()
cmd_notify = """
osascript -e 'display notification "{}" with title "{}"'
""".strip()
cmd_scp = 'scp -i ~/.ssh/termux -P 8022 {}:{} ~/Downloads/'


@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method=='GET':
        return 'success'
    data = request.get_json()
    if 'Authorization' not in request.headers or \
        'salt' not in data or request.headers['Authorization']!= \
            hashlib.sha512((auth+data['salt']).encode()).hexdigest():
        return 'auth failed'
    parse_request(data, request.remote_addr)
    return 'success'

def parse_request(request, source_ip):
    msg = decrypt_message(request['msg'])
    if re.match('^https?://.+', msg):
        webbrowser.open(msg)
        send_notification(msg, 'Link from Pixel')
    elif re.match('^/storage/emulated/0', msg):
        subprocess.call(cmd_scp.format(source_ip, msg), shell=True)
        send_notification(msg, 'File from Pixel')
    else:
        write_to_clipboard(msg)
        send_notification(msg, 'Message from Pixel')

def decrypt_message(message):
    """ https://stackoverflow.com/a/12233688 """
    return subprocess.run(
        cmd_decrypt.format(message), shell=True, capture_output=True
    ).stdout.decode('utf-8').strip()

def write_to_clipboard(message):
    """ https://stackoverflow.com/a/25802742 """
    subprocess.Popen(
        'pbcopy', env={'LANG': 'en_US.UTF-8'}, stdin=subprocess.PIPE
    ).communicate(message.encode('utf-8'))

def send_notification(message, title):
    """ https://stackoverflow.com/a/41318195 """
    subprocess.call(cmd_notify.format(message, title), shell=True)


if __name__ == "__main__":
    app.run('0.0.0.0', 5000, debug=False)
```

*poster* on the android side:

```python
import os
import sys
import json
import base64
import string
import random
import hashlib
import requests
import subprocess


target_ip_mapping = {
    'NETWORK_NAME': 'NETWORK_IP'
}


def get_target_ip():
    """ determine target ip address """
    result = subprocess.run(
        'termux-wifi-connectioninfo', capture_output=True)
    if result.returncode!=0:
        return None
    ssid = json.loads(result.stdout)['ssid']
    if ssid in target_ip_mapping:
        target_ip = target_ip_mapping[ssid]
        try:
            requests.get('http://{}:5000'.format(target_ip))
        except requests.exceptions.ConnectionError:
            return None
        return target_ip
    else:
        return None

def post_request(content, target_ip):
    ''' post content to target '''
    auth = 'confess-tinker-fragrant-jelly-evergreen-dosage-undecided'
    salt = ''.join(random.choice(
        string.ascii_lowercase + string.ascii_uppercase + string.digits
    ) for _ in range(16))
    headers = {
        'Authorization': hashlib.sha512((auth+salt).encode()).hexdigest(),
        'Content-Type': 'application/json'
    }
    requests.post(
        'http://{}:5000'.format(target_ip), headers=headers,
        json={'msg': content, 'salt': salt}
    )


if __name__ == "__main__":
    from os.path import dirname, realpath
    cwd = dirname(realpath(__file__))
    os.chdir(cwd)

    # read content from temp file
    target_ip = get_target_ip()
    if not target_ip:
        sys.exit()
    subprocess.call(
        'openssl smime -encrypt -binary -aes-256-cbc -in '+
        '~/storage/backup/tasker/temp.txt -out output.bin '+
        '-outform DER ~/.ssh/termux-public.pem', cwd=cwd, shell=True
    )
    with open('output.bin', 'rb') as content_file:
        content = content_file.read()
    post_request(base64.b64encode(content).decode(), target_ip)
``` 
