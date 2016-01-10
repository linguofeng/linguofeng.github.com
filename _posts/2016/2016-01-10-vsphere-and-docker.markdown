---
layout: post
title: "vsphere and docker"
date: "2016-01-10 15:16"
---

很早之前买了台HP Gen8小型服务器，装了ESXi6.0，发现竟然没有Mac下管理前端，只有Windows的前端，甚是不便。

虽然有VMware VCSA (vCenter Server appliance) ，但服务器只有10G内存（2G+8G），内存耗不起。

启用ESXi的SSH管理，可以通过CMD来管理，只需要熟悉几个工具即可。

## Docker与ESXi
在ESXi中布署docker

通过docker-machine可以很方便地在ESXi中安装docker并在本地管理

```bash
# 安装docker与docker-machine
$ brew update
$ brew cask install docker-machine

# https://github.com/docker/machine/issues/2279
$ cd .docker/machine
$ wget https://github.com/boot2docker/boot2docker/releases/download/v1.9.1/boot2docker.iso

# vmwarevsphere驱动依赖govc
$ go get github.com/vmware/govmomi/govc
$ PATH=$PATH:$GOPATH/bin

$ docker-machine create \
    --driver vmwarevsphere \
    --vmwarevsphere-vcenter 192.168.10.209 \
    --vmwarevsphere-username root \
    --vmwarevsphere-password ****** \
    --vmwarevsphere-network 'VM Network' \
    --vmwarevsphere-datastore 'datastore1' \
    --vmwarevsphere-datacenter ha-datacenter \
    esxi-host
```

参考：[http://qiita.com/ysaotome/items/06f9bdc762a68731f21b](http://qiita.com/ysaotome/items/06f9bdc762a68731f21b)

## GOVC cli

```bash
$ export GOVC_URL="https://root:******@192.168.10.209/sdk"
$ govc about
```

[http://www.virtuallyghetto.com/2014/09/govmomi-vsphere-sdk-for-go-govc-cli-kubernetes-on-vsphere-part-1.html](http://www.virtuallyghetto.com/2014/09/govmomi-vsphere-sdk-for-go-govc-cli-kubernetes-on-vsphere-part-1.html)

## 创建Swarm

```bash
$ eval "$(docker-machine env exsi-host)"
$ docker run swarm create # 15c93e5e1662fdddfa8ab13bf1daf0a0
$ docker-machine create \
    --driver vmwarevsphere \
    --vmwarevsphere-vcenter 192.168.10.209 \
    --vmwarevsphere-username root \
    --vmwarevsphere-password **** \
    --vmwarevsphere-network 'VM Network' \
    --vmwarevsphere-datastore 'datastore1' \
    --vmwarevsphere-datacenter ha-datacenter \
    --swarm \
    --swarm-master \
    --swarm-discovery token://15c93e5e1662fdddfa8ab13bf1daf0a0 \
    swarm-master
$ docker-machine create \
    --driver vmwarevsphere \
    --vmwarevsphere-vcenter 192.168.10.209 \
    --vmwarevsphere-username root \
    --vmwarevsphere-password **** \
    --vmwarevsphere-network 'VM Network' \
    --vmwarevsphere-datastore 'datastore1' \
    --vmwarevsphere-datacenter ha-datacenter \
    --swarm \
    --swarm-discovery token://15c93e5e1662fdddfa8ab13bf1daf0a0 \
    swarm-agent-01
$ docker-machine create \
    --driver vmwarevsphere \
    --vmwarevsphere-vcenter 192.168.10.209 \
    --vmwarevsphere-username root \
    --vmwarevsphere-password **** \
    --vmwarevsphere-network 'VM Network' \
    --vmwarevsphere-datastore 'datastore1' \
    --vmwarevsphere-datacenter ha-datacenter \
    --swarm \
    --swarm-discovery token://15c93e5e1662fdddfa8ab13bf1daf0a0 \
    swarm-agent-02
$ eval "$(docker-machine env --swarm swarm-master)"
$ docker info
$ docker ps -a
```

[https://docs.docker.com/swarm/install-w-machine](https://docs.docker.com/swarm/install-w-machine)
