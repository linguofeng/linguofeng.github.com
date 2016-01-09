---
layout: post
title: 树莓派 Raspberry Pi
description: Raspberry Pi
categories: [archive]
tags: [raspberrypi]
---

<section>
    <p><img class="thumbnail" src="http://ww2.sinaimg.cn/large/a74eed94jw1e3dhmrf1fjj.jpg"></p>
    <p><img class="thumbnail" src="http://ww3.sinaimg.cn/large/a74e55b4jw1e3dhnb4zinj.jpg"></p>
    <p><img class="thumbnail" src="http://ww4.sinaimg.cn/large/bfadf3bejw1e3dhnilkmoj.jpg"></p>
    <p><img class="thumbnail" src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e3dhnqirmqj.jpg"></p>
    <p>    昨天买的Raspberry Pi到了，又有玩具玩了，打算是配置一个通用的环境。</p>
</section>

<section>
    <div class="page-header">
        <h3>一、系统安装与配置</h3>
    </div>
    <h4><small>1.1</small> OS X下通过下面的命令能够把镜像写入SD</h4>
<pre class="prettyprint">
$ unzip 2013-02-09-wheezy-raspbian.zip
$ df -h
$ sudo diskutil unmount /dev/rdisk1s1
$ sudo dd bs=1m if=2013-02-09-wheezy-raspbian.img of=/dev/rdisk1
$ sudo diskutil eject /dev/rdisk1
</pre>
    <p>更新系统，由于基于debian，可以通过下面的命令更新升级</p>
<pre>
$ sudo apt-get update
$ sudo apt-get upgrade
</pre>
    <p>升级内核</p>
<pre>
$ sudo apt-get install git-core
$ sudo wget http://goo.gl/1BOfJ -O /usr/bin/rpi-update && sudo chmod +x /usr/bin/rpi-update
$ sudo rpi-update
</pre>

    <h4><small>1.2</small> 无线网卡配置</h3>
    <p>一同购买的无线网卡是EDUP EP-N8508GS黄金版，这个网卡有个小问题，就是当pi启动着的时候插入会重启。</p>
<pre>
$ sudo vim /etc/network/interfaces
</pre>
    <p>删除原来wlan0的配置，当然上面会有lo有线的配置，不用管</p>
<pre>
allow-hotplug wlan0
auto wlan0
iface wlan0 inet dhcp
    wpa-ssid YOUR_SSID
    wpa-psk YOUR_PASSWORD
</pre>
    <p><img class="thumbnail" src="http://ww2.sinaimg.cn/large/a74eed94jw1e3dhrzgggxj.jpg"></p>
<pre>
$ sudo ifdown wlan0
$ sudo ifup wlan0
</pre>

    <h4><small></small> 配置ssh自动登录</h4>
<pre>
$ brew install ssh-copy-id
$ ssh-copy-id pi@192.168.1.103
</pre>
<pre>
pi@192.168.1.103's password:
Now try logging into the machine, with "ssh 'pi@192.168.1.103'", and check in:

  ~/.ssh/authorized_keys

to make sure we haven't added extra keys that you weren't expecting.
</pre>

    <h4><small>1.3</small> 配置vncserver</h4>
    <p>参考：http://elinux.org/RPi_VNC_Server</p>
    <p>刚好手上有一Nexus 7平板，可以通过Android连接vnc</p>
<pre>
$ sudo apt-get install tightvncserver
$ vncpasswd
$ vncserver :0 -geometry 1280x720 -depth 24
</pre>
    <p>然后android安装android-vnc-viewer，通过简单的配置就能够连接上了，不过屏幕实在是小了点，玩一下还行，真正使用我觉得SSH会更好一些。</p>
    <p>https://play.google.com/store/apps/details?id=android.androidVNC</p>

    <h4><small>1.4</small> 修改swap分区大小</h4>
<pre>
$ sudo vim /etc/dphys-swapfile
    CONF_SWAPSIZE=1024
$ sudo dphys-swapfile setup
$ sudo dphys-swapfile swapon
$ free -m
</pre>
    
    <h4><small>1.5</small> 安装golang</h4>
<pre>
$ export GOARM=5
$ mkdir repos && cd repos
$ hg clone -u release http://code.google.com/p/go
$ cd go/src
$ ./make.bash #只编译，不进行测试，如果测试会无法通过
$ vim ~/.zshrc
</pre>
<pre>
export GOARM=5
export GOROOT=/home/pi/repos/go
export GOPATH=/home/pi/go

export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
</pre>

    <h4><small>1.6</small> 安装zsh</h4>
<pre>
$ sudo apt-get install zsh
$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
$ chsh -s /bin/zsh
</pre>

    <h4><small>1.7</small> 安装nodejs</h4>
<pre class="prettyprint">
$ axel -n 10 http://nodejs.org/dist/v0.10.4/node-v0.10.4.tar.gz
$ tar -zxvf node-v0.10.4.tar.gz
$ cd node-v0.10.4
$ ./configure
$ make
$ sudo make install
$ node --version
$ npm version
</pre>

    <h4><small>1.8</small> 挂载树莓派的某个文件夹到本地</h4>
    <p>安装osxfuse和sshfs: "http://osxfuse.github.io/":http://osxfuse.github.io/</p>
<pre>
$ sshfs pi@192.168.1.103:/var/www www
</pre>

    <h4><small>1.9</small> 使用raspberrypi.local访问树莓派</h4>
<pre>
$ sudo apt-get install avahi-daemon
$ ssh pi@raspberrypi.local
</pre>
</section>

<p>很不错的手册：http://elinux.org/RPi_Tutorials</p>