---
layout: default
parent: Apps
nav_order: 2
title: Mac Configurations
author: Yue Wu <me@blaulan.com>
created:  2018-12-01 00:00:00
modified: 2020-08-27 20:25:05
tags: [app]
---

- [enable](https://apple.stackexchange.com/a/50863) screenshot border
```bash
defaults write com.apple.screencapture disable-shadow -bool FALSE
defaults read com.apple.screencapture
killall SystemUIServer
```

- [disable](https://blog.ideasynthesis.com/2018/09/24/Disable-Google-Chrome-Sign-In-and-Sync) Google Chrome sign in and sync
```bash
defaults write com.google.Chrome SyncDisabled -bool true
defaults write com.google.Chrome RestrictSigninToPattern -string ".*@example.com"
```

- [remove](https://apple.stackexchange.com/a/181851) app icon form Launcher
```bash
sqlite3 $(sudo find /private/var/folders -name com.apple.dock.launchpad)/db/db "DELETE FROM apps WHERE title='Meld';" && killall Dock
```

- find app bundle id
```bash
lsappinfo info -only bundleid
osascript -e 'id of app "Microsoft Excel"'
```

- [restart](https://jiezhi.github.io/2019/03/07/macos-systemuiserver-not-responding) frozen system menu
```bash
sudo kill -9 $(pgrep airportd)
```

- [brew](https://zoltanaltfatter.com/2017/09/07/Install-a-specific-version-of-formula-with-homebrew) install a specific version
```bash
# find the change history
cd "$(brew --repo homebrew/core)"
git log Formula/$1.rb
# install the specific version
git checkout -b $1 c48e1cf03592fd450f2f0a6db883e8c12f450c13
brew unlink $1
HOMEBREW_NO_AUTO_UPDATE=1 brew install $1
git checkout master
git branch -d $1
# switch to the version
brew list $1 --versions
brew switch $1 VERSION
```
