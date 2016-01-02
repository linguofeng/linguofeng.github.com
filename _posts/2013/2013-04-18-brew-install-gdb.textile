---
layout: post
title: brew安装gdb后的代码签名
description: brew install gdb
categories: [archive]
tags: [brew, gdb]
---

<section>
    <p>OS X自带的gdb版本有点低了，就使用brew安装了一个最新版本，可是遇到了</p>
<pre>
please check gdb is codesigned - see taskgated(8)
</pre>
    <p>首先创建一个证书，用于给gdb签名用的，没图片的选项保持默认即可</p>
    <p><img src="http://ww4.sinaimg.cn/large/bfadf3bejw1e3ts8nbo7qj20ru0fstcw.jpg" alt=""></p>
    <p><img src="http://ww4.sinaimg.cn/large/a74ecc4cjw1e3ts8vvivvj20y80o8q5k.jpg" alt=""></p>
    <p><img src="http://ww1.sinaimg.cn/large/a74eed94jw1e3ts92t4hzj20y80o8myz.jpg" alt=""></p>
    <p><img src="http://ww1.sinaimg.cn/large/a74e55b4jw1e3ts9klhscj20si0o0jul.jpg" alt=""></p>
    <p>用刚刚创建的证书给gdb签名</p>
<pre>
$ codesign -s gdb-cert /usr/local/bin/gdb
</pre>
    <p>输入密码即可</p>
    <p>参考: http://sourceware.org/gdb/wiki/BuildingOnDarwin</p>
</section>