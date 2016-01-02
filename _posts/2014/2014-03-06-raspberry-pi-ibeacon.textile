---
layout: post
title: Raspberry Pi iBeacon
description: 树莓派搭建iBeacon基站
categories: [archive]
tags: [raspberrypi, iBeacon]
---

<section>
<h4>硬件</h4>
<ul>
    <li>树莓派一台</li>
    <li>奥睿科 BTA-406-RD USB蓝牙4.0适配器</li>
</ul>
<pre>
$ sudo apt-get install libusb-dev libdbus-1-dev libglib2.0-dev libudev-dev libical-dev libreadline-dev
$ mkdir bluez
$ cd bluez
$ wget https://www.kernel.org/pub/linux/bluetooth/bluez-5.15.tar.gz
$ tar xvf bluez-5.15.tar.gz
$ cd bluez-5.15
$ sudo ./configure --disable-systemd
$ sudo make
$ sudo make install
$ hciconfig
</pre>
<pre>
hci0:   Type: BR/EDR  Bus: USB
    BD Address: 00:1A:7D:DA:71:0B  ACL MTU: 310:10  SCO MTU: 64:8
    DOWN
    RX bytes:419 acl:0 sco:0 events:133 errors:0
    TX bytes:68 acl:0 sco:0 commands:16 errors:0
</pre>
<pre>
$ sudo hciconfig hci0 up
$ hciconfig
</pre>
<pre>
hci0:   Type: BR/EDR  Bus: USB
    BD Address: 00:1A:7D:DA:71:0B  ACL MTU: 310:10  SCO MTU: 64:8
    UP RUNNING
    RX bytes:1094 acl:0 sco:0 events:54 errors:0
    TX bytes:768 acl:0 sco:0 commands:54 errors:0
</pre>
<pre>
$ sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 E2 0A 39 F4 73 F5 4B C4 A1 2F 17 D1 AD 07 A9 62 00 00 00 00 C8 00
</pre>
<p>UDID: E20A39F4-73F5-4BC4-A12F-17D1AD07A962</p>
<p><img src="http://ww4.sinaimg.cn/large/6734058ftw1ee9tlca6drj20lc0zk41a.jpg"></p>
<p>参考: http://developer.radiusnetworks.com/2013/10/09/how-to-make-an-ibeacon-out-of-a-raspberry-pi.html</p>
<p>http://learn.adafruit.com/pibeacon-ibeacon-with-a-raspberry-pi?view=all</p>
</section>
