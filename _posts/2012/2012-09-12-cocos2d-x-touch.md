---
layout: post
title: Cocos2d-x之Touch事件处理机制
description: 提供两种触摸事件处理机制：CCStandardTouchDelegate和CCTargetedTouchDelegate。
categories: [archive]
tags: [cocos2d-x]
---

<section id="1">
    <div class="page-header">
        <h3>一、两种机制的四种不同的事件</h3>
    </div>

table(table table-bordered).
|_\2.CCStandardTouchDelegate %(label label-info)默认事件%|
|@virtual void ccTouchesBegan(CCSet *pTouches, CCEvent *pEvent);@|处理按下事件|
|@virtual void ccTouchesMoved(CCSet *pTouches, CCEvent *pEvent);@|处理按下并移动事件|
|@virtual void ccTouchesEnded(CCSet *pTouches, CCEvent *pEvent);@|处理松开事件|
|@virtual void ccTouchesCancelled(CCSet *pTouches, CCEvent *pEvent);@|处理打断事件|

table(table table-bordered).
|_\2.CCTargetedTouchDelegate|
|@virtual bool ccTouchBegan(CCTouch *pTouch, CCEvent *pEvent);@|处理用户按下事件，true表示继续处理, 否则false.|
|@virtual void ccTouchMoved(CCTouch *pTouch, CCEvent *pEvent);@|处理按下并移动事件|
|@virtual void ccTouchEnded(CCTouch *pTouch, CCEvent *pEvent);@|处理松开事件|
|@virtual void ccTouchCancelled(CCTouch *pTouch, CCEvent *pEvent);@|处理打断事件|

    <p>两者的区别： @CCSet@ 与 @CCTouch@ ，一个事件集合一个单个事件。</p>
    <p>事件分发的顺序： @CCTargetedTouchDelegate@ -> @CCStandardTouchDelegate@ 。</p>
    <p>默认情况下所有 @CCLayer@ 都没有启用触摸事件，需要 @this->setIsTouchEnabled(true);@ 启用。</p>
    <p>如需更改事件： @void registerWithTouchDispatcher(void) {}@</p>
<pre class="prettyprint">
class MyLayer: public cocos2d:CCLayer {
public:
    virtual void registerWithTouchDispatcher(void);

    // addStandardDelegate()
    virtual void ccTouchesBegan(CCSet *pTouches, CCEvent *pEvent);
    virtual void ccTouchesMoved(CCSet *pTouches, CCEvent *pEvent);
    virtual void ccTouchesEnded(CCSet *pTouches, CCEvent *pEvent);
    virtual void ccTouchesCancelled(CCSet *pTouches, CCEvent *pEvent);

    // addTargetedDelegate()
    virtual bool ccTouchBegan(CCTouch *pTouch, CCEvent *pEvent);
    virtual void ccTouchMoved(CCTouch *pTouch, CCEvent *pEvent);
    virtual void ccTouchEnded(CCTouch *pTouch, CCEvent *pEvent);
    virtual void ccTouchCancelled(CCTouch *pTouch, CCEvent *pEvent);
}

void MyLayer::registerWithTouchDispatcher(void) {
    // 委托，优先级
    CCTouchDispatcher::sharedDispatcher()->addStandardDelegate(this, kCCMenuTouchPriority);
    // 委托，优先级，是否继续处理
    CCTouchDispatcher::sharedDispatcher()->addTargetedDelegate(this, kCCMenuTouchPriority, true);

    // 2.0版本以后
    CCDirector::sharedDirector()->getTouchDispatcher()->addStandardDelegate(this, kCCMenuHandlerPriority);
    CCDirector::sharedDirector()->getTouchDispatcher()->addTargetedDelegate(this, kCCMenuHandlerPriority, true);
}
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、 如果实现回调函数？</h3>
    </div>
    <p>利用 @ccTouchBegan@ 或 @ccTouchesBegan@ 加以实现点击的回调</p>
<pre class="prettyprint">
void MyLayer::ccTouchesBegan(CCSet *pTouches, CCEvent *pEvent) {
    // 单点
    CCTouch *pTouch = (CCTouch*)(pTouches->anyObject());

    // 所有点
    for(CCSetIterator iterTouch = pTouches->begin(); iterTouch != pTouches->end(); iterTouch++) {
        CCTouch *pCurTouch =  (CCTouch*)(*iterTouch);
    }

    // 获取点在视图中的坐标（左上角为原点）
    CCPoint touchLocation = pTouch->getLocationInView();
    // 把点的坐标转换成OpenGL坐标（左下角为原点）
    touchLocation = CCDirector::sharedDirector()->convertToGL(touchLocation);
    // 把OpenGL的坐标转换成CCLayer的坐标
    CCPoint local = convertToNodeSpace(touchLocation)
    // 大小为100x100，坐标为(0, 0)的矩形
    CCRect * rect = CCRectMake(0, 0, 100, 100);
    // 判断该坐标是否在rect矩形内
    bool flag = rect.containsPoint(local)
    if(flag) {
        // 回调
    } else {
        // 不执行
    }
}
</pre>
</section>
