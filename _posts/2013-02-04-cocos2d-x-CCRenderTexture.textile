---
layout: post
title: Cocos2d-x之CCRenderTexture
description: Cocos2dx的画图功能
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、如果使用</h3>
    </div>
<pre class="prettyprint">
CCRenderTexture *pRender = CCRenderTexture::renderTextureWithWidthAndHeight(width, height);
pRender->begin();

// 这里可以调用，把相应的东西画在CCRendertexture上，可以画任何东西
CCNode::visit();

pRender->end(false);
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、使用混合模式</h3>
    </div>
    <p>主要是使用 @glBlendFunc()@ 函数，有两个参数，前者表示源因子，后者表示目标因子。</p>
<pre class="prettyprint">
GL_ZERO                    // 表示使用0.0作为因子，实际上相当于不使用这种颜色参与混合运算。
GL_ONE                     // 表示使用1.0作为因子，实际上相当于完全的使用了这种颜色参与混合运算。
GL_SRC_ALPHA               // 表示使用源颜色的alpha值来作为因子。
GL_DST_ALPHA               // 表示使用目标颜色的alpha值来作为因子。
GL_ONE_MINUS_SRC_ALPHA     // 表示用1.0减去源颜色的alpha值来作为因子。
GL_ONE_MINUS_DST_ALPHA     // 表示用1.0减去目标颜色的alpha值来作为因子。
</pre>
    <p>如果设置了 @glBlendFunc(GL_ONE, GL_ZERO);@，则表示完全使用源颜色，完全不使用目标颜色，因此画面效果和不使用混合的时候一致。</p>
    <p>如果设置了 @glBlendFunc(GL_ONE, GL_ONE);@，则表示完全使用源颜色和目标颜色，最终的颜色实际上就是两种颜色的简单相加。</p>

    <p>参考：http://blog.csdn.net/aurora_mylove/article/details/1700540</p>
</section>

