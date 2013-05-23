---
layout: post
title: WR720N Install OpenWrt
description: WR720N无线路由安装OpenWrt
categories: [archive]
tags: [wr720n, openwrt]
---

<section>
    <p>今天无聊跟实在无法忍受天朝的网络，就搜索了一下wr720n openwrt，发现官方已经出了wr720n专用的固件了，之前是没有官方的，民间高手有出一些教程可以自己编译，我是懒得编译了。</p>
    <p>既然出了就当然是要刷一下了，目前还是测试版，刷机有风险。刷机过程如下：</p>
    <h4>第一步：下载专用固件</h4>
<pre>http://downloads.openwrt.org/snapshots/trunk/ar71xx/openwrt-ar71xx-generic-tl-wr720n-v3-squashfs-factory.bin</pre>
    <h4>第二步：开刷</h4>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4to8tcm5ij20eo07paaw.jpg" alt=""></p>
    <p>由于刷机前没有截图，网上找了一张WR703N的图片，操作是一样的。</p>
    <h4>第三步：配置无线</h4>
    <p>刷机过程大概一两分钟，路由重启后使用 @telnet@ 命令连接路由</p>
<pre>
telnet 192.168.1.1
</pre>
    <p>默认应该是不用帐号密码的，如果需要就是admin。接着就是开启无线，命令</p>
<pre>
# vi /etc/config/wireless
</pre>
    <p>删除 @option disabled 1@ 即可</p>
    <p>修改密码并开启ssh</p>
<pre>
# passwd
</pre>
    <p>输入两次密码即可，现在重启</p>
<pre>
# reboot
</pre>
    <p>就可以通过无线连接路由了，目前无线是没有密码的，如果需要设置密码参考官方说明</p>
    <pre>http://wiki.openwrt.org/doc/uci/wireless/encryption</pre>
    <h4>第四步：配置PPPOE拨号</h4>
<pre>
# vi /etc/config/network

config interface 'wan'
option ifname 'eth0'
option proto 'pppoe'
option username '上网帐号'
option password '上网密码'

# /etc/init.d/network start
</pre>
    <p>过一会就可以上网</p>

    <p>参考: http://www.geek-workshop.com/thread-2418-1-1.html</p>

    <h4>OpenWrt常用技巧</h4>
    <p>列表当前所有连接到路由的IP</p>
    <pre>arp</pre>
    <p>or</p>
    <pre>cat /tmp/dhcp.leases</pre>
    <h5>OpenWrt端口映射</h5>
    <p>由于我内网还有一个Raspberry Pi，进行端口映射实现从外网访问我内网中的Raspberry Pi树莓派</p>
    <p>首先要去申请一个动态dns，我选择了duckdns，非常合适OpenWrt</p>
    <p>使用Google帐号登录DuckDns，申请一个子域名，然后生成配置文件，可参考</p>
    <pre>https://www.duckdns.org/install.jsp#openwrt</pre>
    <p>修改OpenWrt防火墙设置</p>
    <pre># vim /etc/config/firewall</pre>
    <p>在最后添加</p>
<pre>
config redirect
    option src              wan
    option proto            all
    option dest_ip          raspberrypi ip
</pre>
    <p>这几行配置的作用是完全把raspberry pi作为一个服务器对外公开所有端口，当然这是不安全的</p>
    <p>对外公开的端口中肯定是包含了 @22@ 端口，此时通过duckdns提供的域名方向将直接进入raspberry pi，如果要进入openwrt可以通过raspberry pi对openwrt进行管理。</p>
</section>