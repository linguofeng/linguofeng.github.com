---
layout: post
title: Arduino HC-SR04
description: Arduino 超声波测距模块
categories: [archive]
tags: [arduino]
---

<section>
    <p>HC-SR04是一个超声波测距模块</p>

    <h4>接线</h4>
table(table table-bordered).
|_.HC-SR04|_.Arduino|
|VCC|5v|
|GND|GND|
|Trig|PIN8|
|Echo|PIN9|

    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4sixvqwq1j21290nrwic.jpg" width="700" alt=""></p>

    <h4>程序</h4>
<pre class="prettyprint">
const int TP = 8;
const int EP = 9;

void setup()
{
    pinMode(TP, OUTPUT);
    pinMode(EP, INPUT);

    Serial.begin(9600);
}

void loop()
{
    digitalWrite(TP, LOW);
    delayMicroseconds(2);

    digitalWrite(TP, HIGH);
    delayMicroseconds(10);

    digitalWrite(TP, LOW);

    long microseconds =  pulseIn(EP, HIGH);
    Serial.print("ret=");
    Serial.println(microseconds);

    long distacne = microseconds / 2 / 29.1;  // 计算距离公式
    Serial.print("distacne=");
    Serial.print(distacne);
    Serial.println("cm");
    delay(1000);
}
</pre>

    <p>参考: http://www.elecfreaks.com/244.html</p>
    <p>素材: https://github.com/rngadam/ART/tree/master/ele/fritzing/HC-SR04</p>
</section>