---
layout: post
title: Ubuntu编译Box2D物理引擎
description: Box2D物理引擎
categories: [archive]
tags: [ubuntu]
---

<section>
    <div class="page-header">
        <h3>一、下载Box2D物理引擎源码</h3>
    </div>
    <p>@https://code.google.com/p/box2d/@</p>
</section>

<section>
    <div class="page-header">
        <h3>二、编译环境</h3>
    </div>
<pre>
$ sudo apt-get install cmake libglu1-mesa-dev libxi-dev
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、编译，查看Building.txt帮助文件</h3>
    </div>
<pre>
$ cd $BOX2DPATH/Build
$ cmake -DBOX2D_INSTALL=ON -DBOX2D_BUILD_SHARED=ON ..
$ make
$ sudo make install // 安装到 /usr/local/include/Box2D
</pre>
</section>

<section>
    <div class="page-header">
        <h3>四、运行Testbed工程</h3>
    </div>
<pre>
$ ./$BOX2DPATH/Build/Testbed/Testbed
</pre>
</section>
