---
layout: post
title: Arduino 第一个实验
description: LED灯闪实验
categories: [archive]
tags: [Arduino]
---

<section>
    <p>按照图片所示接线，四个电阻都是220Ω。</p>
    <p><img src="http://ww4.sinaimg.cn/large/a74eed94jw1e428cer35mj212w0ikafj.jpg" width="700" alt=""></p>
<pre class="prettyprint">

/**
 * 连接2、4、6、8四个针脚，这四个灯会间隔1秒依次亮起后又依次熄灭
 */

void setup()            // setup函数为初始化函数,第一次启动Arduino或重启执行,且只执行一次.
{
  pinMode(2, OUTPUT);   // pinMode函数是把一个引脚设置为INPUT(输出)或OUTPUT(输出).
  pinMode(4, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(8, OUTPUT);
}

void loop()               // loop函数是setup后执行,是一个死循环,类似while(true).
{
  digitalWrite(2, HIGH);  // digitalWrite函数是把一个引脚设置为HIGH(高电平)或LOW(低电平).
  delay(1000);            // delay函数是睡眠,此处睡眠1秒.
  digitalWrite(4, HIGH);
  delay(1000);
  digitalWrite(6, HIGH);
  delay(1000);
  digitalWrite(8, HIGH);
  delay(1000);
  digitalWrite(8, LOW);
  delay(1000);
  digitalWrite(6, LOW);
  delay(1000);
  digitalWrite(4, LOW);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}
</pre>
</section>