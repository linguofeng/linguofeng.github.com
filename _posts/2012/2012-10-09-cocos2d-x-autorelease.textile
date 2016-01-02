---
layout: post
title: Cocos2d-x之CCObject::autorelease
description: Cocos2d-x对象自动释放的一些问题
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、在传递对象指针的过程中有可能被自动释放的可能</h3>
    </div>
<pre class="prettyprint">
class A: public cocos2d::CCObject
{
public:
    int getValue(void)
    {
        return 25;
    }
};

class B
{
public:
    A * a;

    B(void)
    :a(NULL)                        // 一定要初始化为空，否则CC_SAFE_RELEASE(this->a)可能被出错
    {
    }

    ~B(void)
    {
        CC_SAFE_RELEASE(a);         // 这一步是把参数的引用-1，让其被自动释放
    }

    void setA(A * a)
    {
        CC_SAFE_RETAIN(a);          // 这一步是把参数的引用+1，阻止被自动释放
        CC_SAFE_RELEASE(this->a);   // 这一步是防止原来a已经有引用了
        this->a = a;
    }

    int getValue(void)
    {
        return this->a->getValue();
    }
};

int main(void)
{
    A * a = new A();
    a->autorelease();

    A * a2 = new A();
    a2->autorelease();

    B * b = new B();
    b->setA(a);
    b->getValue();

    b->setA(a2);                    // 这一步就能够让CC_SAFE_RELEASE(this->a)有效，释放之前引用的对象，然后引用新的对象
    b->getValue();
    delete b;
    return 0;
}
</pre>
</section>
