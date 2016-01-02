---
layout: post
title: OSX下安装VirtualBox与Ubuntu Server
description: osx virtualbox ubuntu
categories: [archive]
tags: [osx, virtualbox, ubuntu]
---

<section>
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
<pre class="prettyprint">
此处省略N个字...
</pre>
</section>

<section class="page-header">
    <h3>二、安装后的配置</h3>
    <h4><small>2.1</small> 安装VBoxLinuxAdditions</h4>
    <h4><small>2.1</small> 把网络连接方式设置为桥接网卡</h4>
    <p><img src="http://ww3.sinaimg.cn/large/bfadf3bejw1e36k18ssw8j.jpg" alt=""></p>
    <h4><small>2.2</small> 修改/etc/default/locale为英文，由于默认安装的是中文，发现不好用</h4>
<pre>
LANG="en_US.UTF-8"
</pre>
    <h4><small>2.2</small> 修改/etc/apt/sources.list</h4>
<pre>
###### http://repogen.simplylinux.ch/index.php
###### Ubuntu Main Repos
deb http://cn.archive.ubuntu.com/ubuntu/ quantal main
deb-src http://cn.archive.ubuntu.com/ubuntu/ quantal main

###### Ubuntu Update Repos
deb http://cn.archive.ubuntu.com/ubuntu/ quantal-security main
deb http://cn.archive.ubuntu.com/ubuntu/ quantal-updates main
deb http://cn.archive.ubuntu.com/ubuntu/ quantal-proposed main
deb http://cn.archive.ubuntu.com/ubuntu/ quantal-backports main
deb-src http://cn.archive.ubuntu.com/ubuntu/ quantal-security main
deb-src http://cn.archive.ubuntu.com/ubuntu/ quantal-updates main
deb-src http://cn.archive.ubuntu.com/ubuntu/ quantal-proposed main
deb-src http://cn.archive.ubuntu.com/ubuntu/ quantal-backports main
</pre>
</section>