---
layout: default
parent: Server
nav_order: 4
title: Server Basic Conf
author: Yue Wu <me@blaulan.com>
created:  2020-08-26 12:39:22
modified: 2021-03-09 17:39:51
tags: [server]
---

## Starter Kit

```bash
# disable ssh password login
# https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server
sudo nano /etc/ssh/sshd_config

# disable sudo password authentication
# https://askubuntu.com/a/147265
sudo visudo

# install supporting tools
sudo apt-get -y update
sudo apt-get -y install fish tmux mosh htop tree autojump unzip
sudo apt-get -y install ruby ruby-dev

# install python packages
sudo apt-get -y install python3 python3-dev python3-pip
sudo pip3 install virtualenv virtualfish

# initialize virtualenv
vf new -p python3.8 py38
pip3 install numpy pandas matplotlib seaborn ipython jupyter jupyterlab
pip3 install jupyter_contrib_nbextensions jupyter_nbextensions_configurator
jupyter contrib nbextension install --user

# mount remote storage
# https://help.ubuntu.com/community/SettingUpNFSHowTo
sudo nano /etc/fstab
```

## Package Configs

### tmux

```conf
set -g default-shell /usr/bin/fish
set -g default-command /usr/bin/fish
set -g default-terminal "xterm-256color"
set -g mouse on
set -g history-limit 30000
set -g base-index 1
setw -g pane-base-index 1
set -g renumber-windows on

# split command
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# reload config file
unbind r
bind r source-file ~/.tmux.conf
```
