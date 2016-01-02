---
layout: post
title: Raspberry Pi Install BitTorrent Sync
description: 树莓派安装BitTorrent Sync同步神器
categories: [archive]
tags: [BitTorrent Sync, Raspberry Pi]
---

<section>
    <p>BitTorrent Sync是一个非常强的同步软件，不需要远程服务器的支持，完全是机器与机器之间的通讯。</p>
    
    <h3>一、安装BitTorrent Sync</h3>
    <h4><small>1.1</small> 在Raspberry Pi树莓派里安装</h4>
<pre>
$ wget http://btsync.s3-website-us-east-1.amazonaws.com/btsync_arm.tar.gz
$ tar zxvf btsync_arm.tar.gz
$ ./btsync
</pre>
    <p>解压出来就是一个可执行文件，执行它之后会在当前用户目录下产生.sync目录</p>
    <p>此时打开 "http://raspberrypi-ip:8888/gui":http://raspberrypi-ip:8888/gui 即可打开web管理界面，界面非常简洁。</p>
    <p><img src="http://ww2.sinaimg.cn/large/a74ecc4cjw1e40nr3z8ekj21gi0woq7u.jpg" alt=""></p>
    <p><img src="http://ww4.sinaimg.cn/large/a74eed94jw1e40nrbfrp9j21gi0wogq9.jpg" alt=""></p>

    <h4><small>1.2</small> 在OS X下安装，这个做得非常不错，为retina屏而生的</h4>
    <p>下载http://btsync.s3-website-us-east-1.amazonaws.com/BTSync.dmg，直接安装到应用目录下即可。</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74e55b4jw1e40nvbysovj20wa0l6gnq.jpg" width="581" alt=""></p>
    <p>已经添加了Raspberry Pi的目录了，这个时候同步太方便了，同步速度完全是局域网的速度。</p>
</section>