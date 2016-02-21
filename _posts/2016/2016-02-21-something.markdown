---
layout: "post"
title: "something"
date: "2016-02-21 14:45"
---

规划一下怎么把家里的服务器利用起来。

现在是有3台树莓派和一台HP Gen8服务器，首先要远程管理Gen8，最好的办法是先装一个Ubuntu系统，这样也方便家里的Chromebook连接管理。最后就通过该Ubuntu来管理家里所有的服务器了。

Gen8安装的是ESXi。

端口规划：

把80, 443, 2222端口转发至Ubuntu，22端口留作Git服务使用。

Ubuntu中安装Docker，创建HAProxy服务代理80与443端口的请求还有服务发现。

Ubuntu中安装Docker Machine管理ESXi上的boot2docker与raspberry pi。

最后的结构是

    路由 -> 端口转发 -> Ubuntu -> HAProxy -> docker service