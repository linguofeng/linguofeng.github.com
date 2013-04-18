---
layout: post
title: 使用ndk-gdb调试hello-jni
description: Android + ndk-gdb
categories: [archive]
tags: [android, ndk, gdb]
---

<section>
<pre>
$ cd $NDK_ROOT/sample/hello-jni
$ ndk-build NDK_DEBUG=1
$ android update project -p . -t android-17
$ ant debug install
$ ndk-gdb --start
</pre>
<p><img class="thumbnail" src="http://ww4.sinaimg.cn/large/a74eed94jw1e3sl6ahh92j20wq0e4wis.jpg" width="589" alt=""></p>
<p>这时会启动应用，接着就可以使用gdb的命令了</p>
<pre>
(gdb) list
(gdb) break 30
(gdb) info breakpoints
(gdb) continue
Continuing.     // 然后手动重启应用就会停在30行断点处了
</pre>
</section>