---
layout: post
title: C++的const与pointer
description: 笔记
categories: [archive]
tags: [c++]
---

<section>
    <div class="page-header">
        <h3>一、重载</h3>
    </div>
<pre class="prettyprint">
const char* str;            // 常量指针，指向常量的指针，地址可变，值不可变。
// char const *str;         // 同上。

char* const str;            // 指针常量，地址不可变，值可变。

const char* const str;      // 两者，地址值均不可变。
</pre>
    <p>@const@ 星前，常量指针，地址可变，值不可变。</p>
    <p>@const@ 星后，指针常量，地址不可变，值可变。</p>
</section>
