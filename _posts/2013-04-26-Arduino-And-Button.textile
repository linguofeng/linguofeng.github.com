---
layout: post
title: Arduino Use Button Switch
description: Arduino使用按钮开关控制LED
categories: [archive]
tags: [Arduino]
---

<section>
    <p>通过按钮输入信息去控制LED灯</p>
    <p>线路图</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e43e5x304gj212w0iutdt.jpg" width="700" alt=""></p>
    <p>用到的材料</p>
    <ol>
        <li>10K欧电阻1个</li>
        <li>220欧电阻1个</li>
        <li>按钮开头1个</li>
        <li>杜邦线4根</li>
        <li>面包线3根</li>
        <li>LED灯1只</li>
    </ol>
    <p>代码</p>
<pre class="prettyprint">
void setup() {
  pinMode(4, INPUT);        // 4号针脚输入
  pinMode(13, OUTPUT);      // 13号针脚输出
}

void loop() {
  int i = digitalRead(4);   // 读取4号针脚的值
  if (i == HIGH) {          // 如果4号针脚的值为高电平，即按下按钮
    delay(1000);            // 延时1秒后
    digitalWrite(13, HIGH); // 点亮13号针脚的LED灯
    delay(5000);            // 延时5秒后
    digitalWrite(13, LOW);  // 熄灭
  }
}
</pre>
    <p>4号针脚与按钮开关，10K欧电阻和电线是一个整体，与LED灯并没有相关联的连线，10K欧的电阻的作用是作下拉电阻，使4号针脚的值为低电平，当按钮按下时5V电源与4号针脚形成一个通路，从而4号针脚的值为高电平，点亮LED。</p>
</section>