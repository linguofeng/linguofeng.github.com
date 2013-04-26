---
layout: post
title: RaspberryPi And Arduino
description: 树莓派与Arduino
categories: [archive]
tags: [Arduino, Raspberry Pi, pySerial]
---

<section>
    <p>由于Arduino的无线模块真的是比Arduino板子还贵的原因，又刚好手上有一块Raspberry Pi的板子，通过无线控制派再通过USB与Arduino进行通信，这样也是个不错搭配。</p>
    <p>安装Raspberry Pi与Arduino串口通信的pySerial:</p>
<pre>
$ sudo pip install pyserial
</pre>
    <h3>Hello World</h3>
    <p>client.py</p>
<pre class="prettyprint">
import serial

ardunio = serial.Serial('/dev/tty.usbmodem1411', 9600)

print(ardunio.readline())
</pre>
    <p>server.ino</p>
<pre class="prettyprint">
void setup() {
    Serial.begin(9600);
    Serial.println("Hello World!!!!");
}

void loop() {

}
</pre>
    <p>下载程序到Arduino中，然后执行 @python client.py@ 就能够打印出Hello World!!</p>
    <p>注意 @/dev/tty.usbmodem1411@ 在不同的电脑和系统中会不同。</p>
</section>