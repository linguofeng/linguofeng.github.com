---
layout: post
title: Arduino Car
description: Android手机蓝牙无线控制Arduino小车项目笔记
categories: [archive]
tags: [arduino]
---

<section>
    <blockquote><h4>2013-05-13</h4></blockquote>
    <p>原本打算是做一个四轴的，可是琢磨了好些天，感觉还是先来个小车项目吧，四轴的话最大的问题是遥控器要买，而且好一点的又贵，所以目前暂时先做个小车项目了。</p>
    <p>其实做个小车成本也是挺贵的（╯－＿－）╯╧╧ </p>

table(table table-bordered).
|_.名称|_.数量|_.价钱|
|小车车体|1||
|HC-06蓝牙模块|1||
|L298N电机驱动模块|2||
|SR04超声波模块|1||

    <blockquote><h4>2013-05-15</h4></blockquote>
    <p>今天小车车体到了，晚上回来就开始组装了，原本我以为这个小车车体应该不会很大，事实是有点大啊。</p>
    <p><img src="http://ww4.sinaimg.cn/large/6734058fjw1e4pdp04lw3j212w0t6wo0.jpg" width="700" alt=""></p>
    <p>把电机都装上了</p>
    <p><img src="http://ww1.sinaimg.cn/large/6734058fjw1e4pdpm39vzj212w0t612n.jpg" width="700" alt=""></p>
    <p>有把小电钻自己焊了张电路板配合arduino nano使用</p>
    <p><img src="http://ww3.sinaimg.cn/large/6734058fjw1e4pdq95g9ij212w0t6qd3.jpg" width="700" alt=""></p>
    <p>装上去之后的效果还不错</p>
    <p><img src="http://ww4.sinaimg.cn/large/6734058fjw1e4pdrko6h1j212w0t6tiu.jpg" width="700" alt=""></p>
    <p>给电机连上线，电机驱动板还没到，暂时把线接上，明天电机驱动板一到就可以跑了</p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4pds6gz35j212w0t6qc9.jpg" width="700" alt=""></p>
    <p>这个车体100多块也还算可以，质量不错。</p>

    <blockquote><h4>2013-05-16</h4></blockquote>
    <p>电机驱动板收到了</p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4qjzbg313j212w0t648t.jpg" width="700" alt=""></p>
    <p>由于电池盒太大了，加上一个舵机的话放不下，就搭了这样一个双层板子。</p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4qk00bin0j212w0t6gv4.jpg" width="700" alt=""></p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4qk21k1sqj212w0t6tig.jpg" width="700" alt=""></p>
    <p>在进行电机测试，没用过电机驱动板，在调试，初步知道前进后退怎么操作，还有通过pwm进行调速。</p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4qk2iad4cj212w0t6n7c.jpg" width="700" alt=""></p>
    <p>最后是把蓝牙装上去，明天写个android程序来进行小车的控制。</p>
    <p><img src="http://ww1.sinaimg.cn/large/6734058fjw1e4qk3vs1tqj212w0t6wny.jpg" width="700" alt=""></p>
    <p>电机与电机驱动板的接线效果</p>
    <p><img src="http://ww4.sinaimg.cn/large/6734058fjw1e4qk4sx2vnj212w0t6n5f.jpg" width="700" alt=""></p>

    <blockquote><h4>2013-05-16</h4></blockquote>
    <p>开始在Arduino Nano中调试电机了</p>
    <p><img src="http://ww2.sinaimg.cn/large/6734058fjw1e4rquswwdaj212w0t6woj.jpg" width="700" alt=""></p>
    <p>完成了，由于地线不足，暂时用了块面包板</p>
    <p><img src="http://ww3.sinaimg.cn/large/6734058fjw1e4rr0m6evkj212w0t6130.jpg" width="700" alt=""></p>
    <p>试了一下车，速度与冲击力还不错，用电池需要从电机驱动板中取电，否则无法驱动。</p>
    <p>提供Android程序与Arduino程序</p>
</section>

<div class="github-widget" data-repo="linguofeng/arduino-car"></div></br>