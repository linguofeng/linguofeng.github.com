---
layout: post
title: Cocos2d-x之CCSpriteFrameCache
description: 通过帧的方式加载一张大图
categories: [archive]
tags: [cocos2d-x]
---

<section>
<p>配合plist文件加载一张大图片中的某个区域</p>
<p>@.plist@ 格式</p>
<pre class="prettyprint">
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>texture</key>
    <dict>
        <key>width</key>
        <integer>图片的宽度</integer>
        <key>height</key>
        <integer>图片的高度</integer>
    </dict>
    <key>frames</key>
    <dict>
        <key>每帧的键值，使用spriteFrameByName获取</key>
        <dict>
            <key>x</key>
            <integer>X坐标</integer>
            <key>y</key>
            <integer>Y坐标</integer>
            <key>width</key>
            <integer>宽</integer>
            <key>height</key>
            <integer>高</integer>
            <key>offsetX</key>
            <real>X坐标偏移</real>
            <key>offsetY</key>
            <real>Y坐标偏移</real>
            <key>originalWidth</key>
            <integer>原宽</integer>
            <key>originalHeight</key>
            <integer>原高</integer>
        </dict>
    </dict>
</dict>
</plist>
</pre>
<p>使用CCSpriteFrameCache载入plist与图片</p>
<pre class="prettyprint">
CCSpriteFrameCache * cache = CCSpriteFrameCache::sharedSpriteFrameCache();

cache->addSpriteFramesWithFile("plist文件", "图片");

CCSprite::spriteWithSpriteFrame(cache->spriteFrameByName("plist中定义的key的键值"));

CCSprite::spriteWithSpriteFrameName("plist中定义的key的键值"); // 直接也可以

// 使用完以后记得清空释放内存
CCSpriteFrameCache::sharedSpriteFrameCache()->removeUnusedSpriteFrames();

// 根据plist清空对应的图片
CCSpriteFrameCache::sharedSpriteFrameCache()->removeSpriteFramesFromFile("plist文件");
</pre>
</section>
