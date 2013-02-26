---
layout: post
title: Cocos2d-x之CCTextureCache 
description: Cocos2dx的图片预加载进度条
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、CCTextureCache</h1>
    </div>
<pre class="prettyprint">
int picnums = 30;   // 总张数
int picnum = 0;     // 已经加载张数

CCTextureCache::sharedTextureCache()->addImageAsync("图片地址", this, callfuncO_selector(Test::loadingCallBack));

void Test::loadingCallBack(CCObject * obj)
{
    picnum++;  // 加载完一张图片+1

    int s = (((float)picnum / picnums) * 100.0f); // 计算进度条百分比

    if (picnums == picnum)
    {
        // 加载完了以后显示主界面
    }
}
</pre>
</section>
