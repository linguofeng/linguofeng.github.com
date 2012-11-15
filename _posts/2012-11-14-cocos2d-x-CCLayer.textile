---
layout: post
title: Cocos2d-x之CCLayer
description: Cocos2dx的层
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、CCLayer</h1>
    </div>
<pre class="prettyprint">
class HelloLayer: CCLayer
{
    public:
        HelloLayer()
        {
            setIsKeypadEnabled(true);
        }

        virtual ~HelloLayer();

        virtual void keyBackClicked();  // 重写手机返回键点击
        virtual void keyMenuClicked();  // 手机菜单键点击
}
</pre>
</section>

<section>
    <div class="page-header">
        <h1>一、CCLayerColor <small>颜色层</small></h1>
    </div>
<pre class="prettyprint">
CCLayerColor * layer = CCLayerColor::layerWithColorWidthHeight(ccc4f(红, 绿, 蓝, 透明度), 宽, 高);
layer->setPosition(ccp(0, 0));
layer->setContentSize(CCSizeMake(100, 100));
...
ccBlendFunc bf = {CC_BLEND_SRC, CC_BLEND_DST};
layer->setBlendFunc(bf);    // 与底下图层进行混合，颜色会产生变化。
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、CCLayerGradient <small>渐变层</small></h1>
    </div>
<pre class="prettyprint">
CCLayerGradient * layer = CCLayerGradient::layerWithColor(ccc4f(), ccc4f(), ccp(0, 0));
layer->setIsCompressedInterpolation(true/false);    // 是否压缩插值
</pre>
</section>
