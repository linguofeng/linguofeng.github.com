---
layout: post
title: Android Multiple Screens
description: Android 屏幕适配的一些总结
categories: [archive]
tags: [android]
---

<section>
    <p>作为一名Android应用开发程序猿，最痛苦的事莫过于在屏幕适配了，这与历史原因有关，具体就不深究了。</p>
    <p>直到最近才搞明白dpi是怎么换算的，在开发的过程中，一个应用运行的屏幕标准应该是分辨率为320x480密度为160dpi的屏幕上，所以所有放在drawable、drawable-mdpi、values、layout、layout-normal的资源文件大小的单位就是px，1dp = 1px。比如有一张宽30px高45px的图片放置在drawable-mdpi目录下，那对应的dp单位就是30dp x 45dp。那么放在drawable-hdpi目录下的这张图片的宽应该是30*1.5px，高45*1.5px，240/160=1.5。放置在drawable-xhdpi的自然就是30*20px和45*2px，320/160=2。</p>
    <p>但是，很多公司开发应用不会只开发Android版本的，通常是和IOS一起开发，那美工所做的图片如果给Android做四套图（ldpi、mdpi、hdpi、xhdpi）的会很大工作量，通过的做法是把IOS中的640x960分辨率下的图片拿过用，这样实际只要一套图就能够适配标准的Android手机屏幕，所谓的标准就是密度为160dpi、分辨率为320x480，密度为240dpi、分辨率为480x800等的屏幕，当然不包括平板，这类平板通常是指国内的平板，那屏幕大啊，而分辨率却小，这类不包括在内。</p>
    <p>那么该如何得用IOS中的640x960的图片来适配呢，640x960分辨率的在Android系统中对应的应该是320dpi密度的，所以把这类图片放置在drawable-xhdpi目录下，然后在使用的时候，通常布局文件都放置在layout目录，该目录是160dpi使用的，所以我们需要把xhdpi中的图片作一个处理，就是宽高分别除以2，320/160=2。</p>
    <p>例如一张登录按钮图片，IOS中对应的是640x960分辨率的，大小为72x64，在Android中使用时把图片放到xhdpi目录，使用的时候这样定义宽高</p>

<pre class="prettyprint">
<ImageView
    android:layout_width="36dp"
    android:layout_height="32dp"
    android:src="@drawable/image"
    />
</pre>

    <p>这样做的目标是使图片在Android自动转换的时候不会出现失真的问题，把一张图片从大往小转是不会失真的，效果保持了。36dp是通过72/2得到的，为什么除以2，是转为图片是为320dpi的屏幕设计的，但是布局文件是在layout目录的，也就是说这个布局是为160dpi的屏幕而设计的，因此需要转换成160dpi标准的密度。</p>
    <p>当应用在240dpi密度的屏幕上运行的话，图片会被自动从160dpi转换成240dpi，也就是36*1.5dp、32*1.5dp。实际是72*0.75dp、64*0.75，图片只是作缩放，因为不存在失真的问题。</p>
    <p>这种做法能够使图片在120、160、240、320这四种标准密度上自适应，是一种按比例自动缩放的过程。同时图片不存在失真的问题。只是如果内容过于多的情况在120密度的屏幕上看非常难看的，道理就是把一张图片从72x64缩小到了27x24。</p>
</section>