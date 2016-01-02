---
layout: post
title: Arduino Quadcopter
description: Arduino 四轴飞行器
categories: [archive]
tags: [Arduino]
---

<section>
    <p>四轴，就是四轴飞行器，通过使用4个高速电机进行空中飞行。</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e46uhs9kfkj20iw0953zw.jpg" width="700" alt=""></p>
    <p>这两天才发现原来有这么酷的东西，刚好手上有Arduino的板子，就想做一个，手痒痒地就在某宝上买材料了，首先我是想做一个迷你的，通过蓝牙来操控，毕竟是新手，再说专业的飞行遥控还挺贵的，就买了一块4合1的传感器集成板，有三轴陀螺仪、三轴加速度、三轴磁场、气压，板子的型号是GY-86，我打算是使用MWC这套开源的四轴程序，对GY-86是兼容的，价钱也不算贵，还买了一块HC-06从机蓝牙模块，24L01+无线模块，一块Arduino nano板，虽然已经有了一块UNO，不过即然是做迷你飞行器还是买块小点的，再说手上的这块UNO是原装的，舍不得。</p>
    <ol>
      <li>GY-86 10DOF MS5611 HMC5883L MPU6050</li>
      <li>Arduino nano V3.0 ATMEGA328P</li>
      <li>HC-06蓝牙模块</li>
    </ol>

    <h4>做四轴的准备工作</h4>
    <p>今天在网上查了一天的资料了，发现用Arduino板子做四轴的很少，多数都是直接使用328P单片机集成的，目前四轴的机架还没有买，想等GY-86传感器调试好了再买，如果是做迷你四轴的话，那应该是直接使用有刷空心杯电机，而不是使用无刷电机+电调，用空心杯电机比无刷的便宜很多，也算是适合拿来学习了，但是如果这样就有问题了，要怎么通过Arduino直接驱动空心杯电机，由于对电路不懂，就只能是Google了，后来在一些论坛上发现可以使用一种叫做场效应管的元件，具体参考：http://www.geek-workshop.com/thread-196-1-1.html。</p>
    <p>经过参考：http://www.cooking-hacks.com/index.php/blog/diy-arduino-pro-mini-quadcopter与http://www.amobbs.com/thread-5490259-1-1.html得到使用SI2302场效应管来驱动空心杯有刷电机</p>
</section>