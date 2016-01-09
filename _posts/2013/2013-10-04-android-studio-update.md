---
layout: post
title: Android Studio Update
description: 解决Android Studio Update更新的问题
categories: [archive]
tags: [android]
---

<section>
    <h4>Fuck GFW</h4>
<pre>
You know!!!!
</pre>

<pre>
$ vim /Applications/Android\ Studio.app/bin/idea.vmoptions
</pre>
<pre>
-Djava.net.preferIPv4Stack=true
-Didea.updates.url=http://dl.google.com/android/studio/patches/updates.xml
-Didea.patches.url=http://dl.google.com/android/studio/patches/
</pre>
</section>

<p>see: http://blog.csdn.net/liugangnhm/article/details/10011831</p>