---
layout: post
title: Eclipse在Ubuntu 12.04下实现全局菜单
description: https://bugs.launchpad.net/eclipse/+bug/618587/comments/46
categories: [archive]
tags: [ubuntu, eclipse]
---

<section>
<pre>
step 1:
$ sudo vim /usr/lib/gtk-2.0/2.10.0/menuproxies/libappmenu.so

step 2: (search for "Eclipse")
/Eclipse<return>

step 3: (replace "E" with "X")
rX

step 4: (save)
ZZ

step 5: (maybe optional, not sure)
sudo ldconfig
</pre>
</section>
