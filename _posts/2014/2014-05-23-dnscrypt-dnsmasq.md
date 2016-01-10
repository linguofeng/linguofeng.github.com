---
layout: post
title: DNSCrypt And Dnsmasq
description: F* GFW
categories: [archive]
tags: [DNSCrypt, Dnsmasq]
---

### > 安装

```bash
$ brew update
$ brew install dnscrypt dnsmasq
```

### > 配置

```bash
$ cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
$ vim /usr/local/etc/dnsmasq.conf
```

```bash
server=192.168.1.1                  # 所有IP使用该DNS

server=/google.com/127.0.0.1#65053
server=/github.com/127.0.0.1#65053
server=/debug.opendns.com/127.0.0.1#65053
```

### > 启动

```bash
$ sudo dnscrypt-proxy --local-address=127.0.0.1:65053 -R OpenDNS
$ sudo dnsmasq --no-daemon --listen-address=127.0.0.1
```

### > 更改

```bash
$ sudo vim /etc/resolv.conf
```

```bash
nameserver 127.0.0.1
```
