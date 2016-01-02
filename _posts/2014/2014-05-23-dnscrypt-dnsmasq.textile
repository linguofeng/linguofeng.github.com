---
layout: post
title: DNSCrypt And Dnsmasq
description: F* GFW
categories: [archive]
tags: [DNSCrypt, Dnsmasq]
---

<section>
	<p>安装</p>
<pre>
$ brew update
$ brew install dnscrypt dnsmasq
</pre>

	<p>配置</p>
<pre>
$ cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
$ vim /usr/local/etc/dnsmasq.conf
</pre>

<pre>
server=192.168.1.1                  # 所有IP使用该DNS

server=/google.com/127.0.0.1#65053
server=/github.com/127.0.0.1#65053
server=/debug.opendns.com/127.0.0.1#65053
</pre>

    <p>启动</p>
<pre>
$ sudo dnscrypt-proxy --local-address=127.0.0.1:65053 -R OpenDNS
$ sudo dnsmasq --no-daemon --listen-address=127.0.0.1
</pre>

    <p>更改</p>
<pre>
$ sudo vim /etc/resolv.conf
</pre>

<pre>
nameserver 127.0.0.1
</pre>
</section>
