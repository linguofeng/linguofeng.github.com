---
layout: post
title: Raspberry Pi GPIO Blink
description: 树莓派GPIO之Blink
categories: [archive]
tags: [raspberrypi, GPIO]
---

<section>
<p>Blink is the “Hello World” of the GPIO interfacing world. It’s the simplest program and circuit that lets you see something happening.</p>
<pre>
$ git clone git://git.drogon.net/wiringPi
$ cd wiringPi
$ ./build
</pre>
<pre>
$ vim blink.c
</pre>
<pre>
#include <wiringPi.h>
int main (void)
{
  wiringPiSetup () ;
  pinMode (0, OUTPUT) ;
  for (;;)
  {
    digitalWrite (0, HIGH) ; delay (500) ;
    digitalWrite (0,  LOW) ; delay (500) ;
  }
  return 0 ;
}
</pre>
<pre>
$ gcc -Wall -o blink blink.c -lwiringPi
$ sudo ./blink
</pre>
<p>接线方式，这里我使用了GPIO转接板</p>
<p><img src="http://ww1.sinaimg.cn/large/6734058ftw1ee9wk6nukej20hs0npgrb.jpg"></p>
<p>@pinMode (0, OUTPUT)@ 表示P0这个接口，正极接P0，负极接一个330欧姆的电阻。</p>
<p>参考：http://wiringpi.com/examples/blink/</p>
<p>https://projects.drogon.net/raspberry-pi/wiringpi/pins/</p>
<p>http://hugozhu.myalert.info/2013/03/22/19-raspberry-pi-gpio-port-naming.html</p>
</section>
