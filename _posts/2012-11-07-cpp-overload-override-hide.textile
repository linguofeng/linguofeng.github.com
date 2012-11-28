---
layout: post
title: C++的重载、覆盖、隐藏
description: 笔记
categories: [archive]
tags: [c++]
---

<section>
    <div class="page-header">
        <h3>一、重载</h3>
    </div>
    <ol>
        <li>同一个类中的函数</li>
        <li>函数名相同</li>
        <li>参数不同</li>
        <li>virtual关键字可有可无</li>
    </ol>
<pre class="prettyprint">
class Test
{
public:
    void post(const char* addr);
    void post(const char* addr, int port);  // 重载
};
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、覆盖（继承）</h3>
    </div>
    <ol>
        <li>不同的类中</li>
        <li>函数名相同</li>
        <li>参数相同</li>
        <li>必须有virtual关键字</li>
    </ol>
<pre class="prettyprint">
class Base
{
public:
    void post(const char* addr);
};

class Test: public Base
{
public:
    virtual void post(const char* addr);    // 覆盖
};
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、隐藏</h3>
    </div>
    <ol>
        <li>基于重载（不同的两个类）与覆盖之间（没有virtual关键字）</li>
        <li>函数名相同，参数不同，virtual可有可无，不在同一个类中</li>
        <li>函数名相同，参数相同，不在同一个类中，没有virtual关键字。</li>
        <li>不同点：不在同一个类中与没有virtual关键字。</li>
    </ol>
<pre class="prettyprint">
class Base
{
public:
    void post(const char* addr);
    void get(const char* addr);
};

class Test: public Base
{
    void post(const char* addr);                // 没有virtual关键字
    void get(const char* addr, int port);       // 参数不同，不在同一类中
};
</pre>
</section>
