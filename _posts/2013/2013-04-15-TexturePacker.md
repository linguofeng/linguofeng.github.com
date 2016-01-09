---
layout: post
title: TexturePacker很好用的一个拼图合成工具
description: TexturePacker + Cocos2d-X
categories: [archive]
tags: [cocos2d-x, TexturePacker]
---

<section>
    <p>TexturePacker是一个非常好用的图片合成工具，在游戏开发中经常用到，因为游戏中使用的图片很多都是一张张很小的，如果这样一张一张地加载到内存，好像会浪费很多内存，如果拼成一张N的2次方大小的图片会很高效地复用图片，通过这个工具就很容易实现这个效果了。</p>
    <p><b>安装</b></p>
<pre>
http://www.codeandweb.com/texturepacker
</pre>
    <p><img src="http://ww4.sinaimg.cn/large/bfadf3bejw1e3qa4539jaj.jpg" alt=""></p>
    <p><img src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e3qabazmaxj.jpg" alt=""></p>
    <p>点击发布后就会生成.plist和.png文件了，这时在Cocos2d-X中使用</p>
<pre class="prettyprint">
CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("test.plist");

CCSprite *pNor = CCSprite::spriteWiteSpriteFrameName("bt_publicinfo_close_nor.png");
CCSprite *pPr = CCSprite::spriteWiteSpriteFrameName("bt_publicinfo_close_pr.png");
</pre>
    <p>4.16更新: 查看邮件，收到了该工具作者赠送的license了，非常感谢</p>
</section>