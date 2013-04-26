---
layout: post
title: Arduino Basics
description: Arduino 基础知识
categories: [archive]
tags: [Arduino]
---

<section>
    <p>第一次玩Arduino，这里就记录Arduion的一些基础知识，这些都可以从官方中获取得到，只不过英文看着不太方便。</p>
    <h4><small>1.</small> Digital I/O 普通数字输入输出，共14个引脚。</h4>
    <p><img src="http://ww4.sinaimg.cn/large/a74ecc4cjw1e42ymluzo2j212w0qw4a2.jpg" width="700" alt=""></p>
    <p>相关的函数</p>
<pre>
pinMode(pin, INPUT);           // 设置为输入或输出
digitalWrite(pin, HIGH);       // 打开上拉电阻，即高电平
</pre>
    <h4><small>2.</small> Digital I/O PWM 支持模拟输出的引脚，可用于调节LED灯的亮度。</h4>
    <p><img src="http://ww1.sinaimg.cn/large/a74eed94jw1e42ymvh7r5j212w0qwqec.jpg" width="700" alt=""></p>
    <p>相关的函数</p>
<pre>
analogRead(pin)                // 读取输入，值的范围为0~1023
analogWrite(pin, value)        // 输出value的范围为0~255
</pre>
</section>