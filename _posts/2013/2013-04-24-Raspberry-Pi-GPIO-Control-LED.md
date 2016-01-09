---
layout: post
title: Raspberry Pi GPIO LED
description: 树莓派通过GPIO控件LED的小实验
categories: [archive]
tags: [Raspberry Pi, GPIO]
---

<section>
    <p>手上的Raspberry Pi是ModeB的第二版，GPIO接口方面有有所变动，具体看http://www.elinux.org/Rpi_Low-level_peripherals的说明。</p>
    <p>前天买的实验小物品今天收到了，明天Arduino也会到，今天就先用Raspberry Pi来玩一下GPIO先，第一次玩这种电路的东西，总是小心翼翼的，怕不小心把板子给毁了，新手一枚...</p>
    <p>接线前找了很多例子，网上很多例子没有使用220欧的电阻，而我手上只有200欧的电阻，担心不行，后来找到了http://www.bianbian.me/2012/07/raspberry-pi-led-test.html这个例子，看板子是第一版的，主要看音频接口的颜色，黑色就是国产的第一版，蓝色就是英国产的第二版。</p>
    <p>根据它的接线方式是一个GND即地线接口，看刚刚那个网址就能看到板子上有5个地线接口，电压是0v的，第二个是GPIO17，即音频口向上下排左边第6个接口，</p>
    <p><img src="http://ww3.sinaimg.cn/large/a74ecc4cjw1e411btt069j21cr12rdr8.jpg" alt=""></p>
    <p>由于Fritzing中没有Raspberry Pi Rev2版的图片，暂时使用Rev1版的图，刚好使用到的两个接口是一样的</p>
    <p>这个实验用到的元件有</p>
    <ol>
        <li>Raspberry Pi Rev2板子一块</li>
        <li>220欧电阻一只</li>
        <li>Led灯一枚</li>
        <li>杜邦线两根</li>
        <li>面包板一块</li>
    </ol>
    <p><img src="http://ww3.sinaimg.cn/large/a74e55b4jw1e411iy1lblj20sg0lcgr6.jpg" alt=""></p>
    <p><img src="http://ww1.sinaimg.cn/large/bfadf3bejw1e411k90dmej20sg0lcafo.jpg" alt=""></p>
    <p>代码，目前新版本中的系统已经默认装好GPIO的库了</p>
<pre class="prettyprint">
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

while True:
    GPIO.output(11, GPIO.LOW)
    time.sleep(1)
    GPIO.output(11, GPIO.HIGH)
    time.sleep(1)
</pre>
<pre>
$ vim testled.py
$ sudo python testled.py
</pre>
    <p>执行代码就可以看到Led灯一闪一闪的，第一个小实验，还是挺有意思的。</p>
</section>