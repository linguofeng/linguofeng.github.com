---
layout: post
title: Cocos2d-x之tests工程在Ubuntu上运行
description: Cocos2d-x对象自动释放的一些问题
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、安装依赖库</h3>
    </div>
    <p>@$ sudo apt-get install libglfw2 libglfw-dev libzip2 libzip-dev@</p>
</section>

<section>
    <div class="page-header">
        <h3>二、编译Box2D库</h3>
    </div>
<pre>
$ cd $COCOS2DX_ROOT/Box2D/proj.linux                    // 进入对应的linux工程
$ make                                                  // 这一步是编译libbox2d.a静态库
$ mkdir -p $COCOS2DX_ROOT/lib/linux/{Debug,Release}     // 创建linux工程存在库文件目录
$ cp libbox2d.a $COCOS2DX_ROOT/lib/linux/Debug          // 复制库文件到Debug目录
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、编译chipmunk库</h3>
    </div>
<pre>
$ cd $COCOS2DX_ROOT/chipmunk/proj.linux                 // 进入对应的linux工程
$ make                                                  // 这一步是编译libchipmunk.a静态库
$ cp libchipmunk.a $COCOS2DX_ROOT/lib/linux/Debug       // 复制库文件到Debug目录
</pre>
</section>

<section>
    <div class="page-header">
        <h3>四、编译CocosDenshion库</h3>
    </div>
<pre>
$ cd $COCOS2DX_ROOT/CocosDenshion/proj.linux                    // 进入对应的linux工程
$ make                                                          // 这一步是编译libcocosdenshion.so动态库
$ cp libcocosdenshion.so $COCOS2DX_ROOT/lib/linux/Debug         // 复制库文件到Debug目录
$ cp ../third_party/linux/fmod/api/lib/libfmodex.so $COCOS2DX_ROOT/lib/linux/Debug      // 同时复制libfmodex.so
</pre>
</section>

<section>
    <div class="page-header">
        <h3>五、编译cocos2d库</h3>
    </div>
<pre>
$ cd $COCOS2DX_ROOT/cocos2dx/proj.linux                 // 进入对应的linux工程
$ make                                                  // 这一步是编译libcocos2d.so动态库
$ cp libcocos2d.so $COCOS2DX_ROOT/lib/linux/Debug       // 复制库文件到Debug目录
</pre>
</section>

<section>
    <div class="page-header">
        <h3>六、编译tests工程</h3>
    </div>
<pre>
$ cd $COCOS2DX_ROOT/tests/test.linux                    // 进入对应的linux工程
$ make                                                  // 这一步是编译libcocos2d.so动态库
$ ./cocos2dx-test                                       // 运行测试工程
</pre>
</section>
