---
layout: "post"
title: "Docker And Haproxy"
date: "2016-01-30 17:31"
---

最近一直想把我的计划完成，在Raspberry Pi上搭一个简单Docker集群。

今天先把Haproxy先搞起来，主要是提供外部访问Docker容器的作用，因为Raspberry Pi集群是在一个内网里的，我的网络中有一个二级路由，要想让一级路由中的其它电脑访问容器提供的服务，就需要在二级路由中做一个端口转发，这样容器多了管理起来很麻烦。

只需要在Haproxy中做代理即可很方便地进行转发，未来还可以做“服务发现”来自动更新配置。

先下载Raspberry Pi专用的容器

```bash
$ docker pull hypriot/rpi-haproxy
```

---

#### 创建haproxy的配置

```bash
$ vim haproxy.cfg
```

```
...

frontend http-in
    bind *:80
    use_backend nginx

backend nginx
    server s1 192.168.10.137:8080

...
```

创建专用数据卷并上传配置到数据卷中

```
$ docker volume create --name haproxy-data
$ docker-machine scp haproxy.cfg pi:`docker volume inspect --format '{ { .Mountpoint }}' haproxy-data`/
```

---

#### 创建docker-compose.yml文件

```bash
$ vim docker-compose.yml
```

```yaml
haproxy:
    image: hypriot/rpi-haproxy
    ports:
        - "80:80"
        - "443:443"
    volumes:
        - "haproxy-data:/haproxy-override"
```

---

#### 运行

```bash
$ docker-compose up
```

---

下一步是在一级路由网络中使用bind9创建虚拟域名服务来访问haproxy，再由haproxy根据域名进行转发到指定容器。

参考：

[https://github.com/hypriot/rpi-haproxy](https://github.com/hypriot/rpi-haproxy)
