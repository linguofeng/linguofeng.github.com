---
layout: post
title: 树莓派与Docker
date: 2016-01-09 11:44
---

手上的 Raspberry Pi Mobdel B+ 吃灰一年了，最近也在玩 Docker，也看到这 hypriot 这个项目，感觉太棒了，平时也只玩单机的 Docker ，现在可以组一个 Swarm 玩玩。

<img src="http://ww2.sinaimg.cn/mw690/6734058fgw1ezt3s2su51j21kw1kw1kx.jpg" width="300">&nbsp;&nbsp;<img src="http://ww1.sinaimg.cn/mw690/6734058fgw1ezt3rjnm07j21kw1kw7wh.jpg" width="300">

---

### 安装 hypriot OS

```
$ brew cask install docker
$ brew install pv axel
$ wget https://raw.githubusercontent.com/hypriot/flash/master/`uname -s`/flash
$ chmod +x flash
$ axel -n 10 http://downloads.hypriot.com/hypriot-rpi-20151115-132854.img.zip
$ ./flash --hostname pi hypriot-rpi-20151115-132854.img.zip
```

### 使用 docker-machine 管理

```
$ curl -o docker-machine http://downloads.hypriot.com/docker-machine_0.4.1-dev_darwin-amd64
$ chmod +x ./docker-machine
$ ./docker-machine create --driver hypriot --hypriot-ip-address=<raspberry-pi-ip> pi
$ eval "$(./docker-machine env pi)"
$ docker info
```

[http://blog.hypriot.com/post/let-docker-swarm-all-over-your-raspberry-pi-cluster/](http://blog.hypriot.com/post/let-docker-swarm-all-over-your-raspberry-pi-cluster/)

### 使用 docker volume

```bash
$ docker volume create --name web
# 查看web卷真实路径
$ docker volume inspect --format '{{ .Mountpoint }}' web
# 同步本地文件至web卷
$ docker-machine scp -r files/ pi:`docker volume inspect --format '{{ .Mountpoint }}' web`/
# 使用卷
$ docker run --rm -v web:/web ubuntu ls /web
```

> 需要注册，如果使用`--rm`的方式运行引用该卷，退出后会删除该卷!!
