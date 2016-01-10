---
layout: post
title: Dnsmasq for IOS
description: ios上使用dnsmasq
categories: [archive]
tags: [dnsmasq, ios]
---

安装 Dnsmasq

前提，已越狱

Cydia中搜索Dnsmasq安装，同时安装iFile用于编译配置文件

使用iFile打开/etc/dnsmasq.conf，在最后追加

```bash
server=114.114.114.114      # 所有域名通过114.114.114.114解析
server=/google.com/8.8.8.8  # google.com通过8.8.8.8解析
```

如果配合dnscrypt使用可防止dns污染，可看之前的文章

最后重启，修改当前网络的dns为127.0.0.1即可
