---
layout: "post"
title: "polipo convert socket to http proxy"
date: "2016-02-17 12:50"
---

```bash
$ brew install polipo
$ ln -sfv /usr/local/opt/polipo/*.plist ~/Library/LaunchAgents
$ vim /usr/local/opt/polipo/homebrew.mxcl.polipo.plist
```

```

...

<string>/usr/local/opt/polipo/bin/polipo</string>
<string>socksParentProxy=localhost:1080</string>

...

```

> 增加 `<string>socksParentProxy=localhost:1080</string>`

```bash
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.polipo.plist
```

Test

```bash
$ http_proxy=localhost:8123 https_proxy=localhost:8123 curl google.com
```
