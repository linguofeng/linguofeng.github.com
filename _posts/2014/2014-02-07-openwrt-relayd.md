---
layout: post
title: OpenWrt relayd
description: OpenWrt中继设置
categories: [archive]
tags: [openwrt]
---

<section>
	<p>开始前，电脑使用网线连接MR10U的LAN/WAN网线接口，tenlet 192.168.1.1进入设置</p>
    <h4>开启WIFI功能，MR10U刷OpenWrt默认没启用WIFI</h4>
<pre>
uci set wireless.@wifi-device[0].disabled=0
uci commit wireless
wifi
</pre>

	<h4>创建wwan接口</h4>
<pre>
uci set network.wwan=interface
uci set network.wwan.proto=dhcp
uci commit network
</pre>

	<h4>连接上级路由，我的上级路由是WR720N，OpenWrt系统</h4>
<pre>
uci set wireless.radio0.channel=11	#与上级路由使用同样的通道
uci set wireless.@wifi-iface[0].network=wwan
uci set wireless.@wifi-iface[0].mode=sta
uci set wireless.@wifi-iface[0].ssid=OpenWrt 	# 上级路由SSID
uci set wireless.@wifi-iface[0].encryption=psk2	# 上级路由加密方式
uci set wireless.@wifi-iface[0].key=12345678	# 上级路由密码
uci commit wireless
wifi down
wifi
</pre>
	<p>ifconfig查看wlan0是否连接成功，成功后还不能上网需要设置一下网关与DNS</p>
<pre>
uci set network.lan.ipaddr=192.168.2.1 		# 修改本路由的IP，避免与上级路由冲突
uci set network.lan.gateway=192.168.1.1 	# 上级路由网关
uci set network.lan.dns=8.8.8.8 			# 不要使用上级路由IP
uci commit network
wifi down
wifi
</pre>
	<p>修改路由IP后需要使用新IP进行连接 telnet 192.168.2.1</p>

	<h4>安装relayd，能上网以后</h4>
<pre>
opkg update
opkg install relayd
/etc/init.d/relayd enable
</pre>

	<h4>创建stabridge接口</h4>
<pre>
uci set network.stabridge=interface
uci set network.stabridge.proto=relay
uci set network.stabridge.network="lan wwan"
uci commit network
</pre>

	<h4>禁用本地DHCP服务器</h4>
<pre>
uci set dhcp.lan.ignore=1
uci commit dhcp
</pre>

	<h4>调整防火墙</h4>
<pre>
uci set firewall.@zone[0].forward=ACCEPT
uci set firewall.@zone[0].network="lan wwan"
uci commit firewall
</pre>

	<h4>创建无线中继，通过无线接入MR10U上网</h4>
<pre>
uci set wireless.@wifi-iface[1].device=radio0
uci set wireless.@wifi-iface[1].network=lan
uci set wireless.@wifi-iface[1].mode=ap
uci set wireless.@wifi-iface[1].ssid=MR10U
uci set wireless.@wifi-iface[1].encryption=psk2
uci set wireless.@wifi-iface[1].key=12345678
uci commit wireless
</pre>

<pre>
/etc/init.d/dnsmasq restart
/etc/init.d/firewall restart
wifi down
wifi
</pre>

	<h4>完成!</h4>

</section>
