---
layout: post
title: Cocos2d-x之CCSprite
description: Cocos2dx的精灵
categories: [archive]
tags: [cocos2d-x]
---

<p>注：本api基于Cocos2d-x 0.13版本</p>

<section>
    <div class="page-header">
        <h1>一、CCSprite <small>精灵</small></h1>
    </div>
<pre class="prettyprint">
CCSprite * sprite = CCSprite::spriteWithFile("file");
                           // spriteWithFile("file", CCRectMake(x, y, width, height));
                           // spriteWithTexture(texture, CCRectMake(x, y, width, height));
                           // spriteWithSpriteFrame(frame, CCRectMake(x, y, width, height));
                           // spriteWithSpriteFrameName("file.png");
sprite->setPosition(ccp(x, y));         // 精灵的位置
sprite->setScaleX(1.0f);                // 精灵的缩放
sprite->setColor(ccc3(r, g, b));        // 精灵的颜色
sprite->setAnchorPoint(CCPointZero);    // 设置精灵的原点为左下角，默认为中心
sprite->setFlipX(true);                 // x轴反转
sprite->setFlipY(true);                 // y轴反转
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、CCSpriteBatchNode <small>精灵批量节点，由多个精灵组成一张2的平方大小的图片</small></h1>
    </div>
<pre class="prettyprint">
CCSpriteBatchNode * batch = CCSpriteBatchNode::batchNodeWithFile("file");
                                            // batchNodeWithFile("file", capacity);

// CCRectMake(x, y, width, height) 表示从节点中获取某个节点
CCSprite * sprite = CCSprite::spriteWithTexture(batch->getTexture(), CCRectMake(x, y, width, height));
batch->addChild(sprite, 0);
batch->reorderChild(sprite, 3); // 重新排序
</pre>
</section>

<section>
    <div class="page-header">
        <h1>三、CCSpriteFrameCache <small>精灵帧缓存</small></h1>
    </div>
<pre class="prettyprint">
CCSpriteFrameCache * cache = CCSpriteFrameCache::sharedSpriteFrameCache();
cache->addSpriteFramesWithFile("file.plist");
cache->addSpriteFramesWithFile("file.plist", "file.png");

CCSprite * sprite = CCSprite::spriteWithSpriteFrameName("plist中定义的名称");

cache->removeSpriteFramesFromFile("file.plist");
cache->removeUnusedSpriteFrames();  // 删除没被使用的资料
</pre>
</section>

<section>
    <div class="page-header">
        <h1>四、CCSpriteFrame <small>精灵帧</small></h1>
    </div>
<pre class="prettyprint">
CCTexture2D * texture = CCTextureCache::sharedTextureCache()->addImage("file.png");
CCSpriteFrame * frame = CCSpriteFrame::frameWithTexture(texture, CCRectMake(x, y, width, height));
CCSprite * sprite = sprite::spriteWithSpriteFrame(frame);
</pre>
</section>
