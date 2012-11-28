---
layout: post
title: Cocos2d-x之区域裁剪
description: 主要使用OpenGL提供的glScissor函数。
categories: [archive]
tags: [cocos2d-x]
---

<section id="1">
    <div class="page-header">
        <h3>一、在Cocos2d-x中就这样来实现区域的显示</h3>
    </div>
<pre class="prettyprint">
class HelloLayer: cocos2d::CCLayer
{
    public:
        virtual void visit(void);
};

// visit()函数在每帧时调用
void HelloLayer::visit()
{
    glEnable(GL_SCISSOR_TEST);              // 开启显示指定区域
    float x = this->getPositionX();
    float y = this->getPositionY();
    float n_width = this->getContentSize().width;
    float n_height = this->getContentSize().height;
    glScissor(x, y, n_width, n_height);     // 只显示当前窗口的区域
    CCLayer::visit();                       // 调用下面的方法
    glDisable(GL_SCISSOR_TEST);             // 禁用
}
</pre>
</section>
