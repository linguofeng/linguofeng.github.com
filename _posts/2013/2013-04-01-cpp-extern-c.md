---
layout: post
title: C++的extern "C"
description: 笔记
categories: [archive]
tags: [c++]
---

<section>
    <div class="page-header">
        <h3>一、extern "C"的用法一</h3>
    </div>
    <p>使用原则: 当在C++中引用C的函数或变量，在包含C头文件的时候应该使用extern "C"。</p>
    <p>ps: C的函数或变量指的是通过gcc编译的c文件。</p>
<h4><small>1.1</small> utils.h</h4>
<pre class="prettyprint">
#ifndef __utils_h__
#define __utils_h__

void add(int, int);

#endif
</pre>
<h4><small>1.2</small> utils.c</h4>
<pre class="prettyprint">
#include "utils.h"

void add(int x, int y) {
    int c = x + y;
}
</pre>
<h4><small>1.3</small> main.cpp</h4>
<pre class="prettyprint">
#include <iostream>

#ifdef __cplusplus
extern "C" {
#endif

#include "utils.h"

#ifdef __cplusplus
}
#endif

int main(int argc, char* argv[]) {
    std::cout << "Hello World!!\n";

    int x = 20;
    int y = 40;

    std::cout << x << " + " << y << " = " << add(x, y) << "\n";
    return 0; 
}
</pre>
<pre class="prettyprint">
# 标准的编译方式
$ gcc -c -Iinclude src/utils.c          # 通过gcc编译c文件
$ g++ -Iinclude utils.o src/main.cpp    # 通过g++编译c++文件

# 非标准的编译方式
$ g++ -c -Iinclude src/utils.c          # 使用g++编译c文件，会对函数名进行编码
$ g++ -Iinclude utils.o src/main.cpp    # g++编译main.cpp时，由于包含extern "C"会编译
                                        # 不通过，如果想通过g++来编译c文件，extern "C"
                                        # 应该不添加
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、extern "C"的用法二</h3>
    </div>
    <p>由于.c文件不支持extern "C"，所以第二种用法就是使用.cpp编写c函数或变量</p>
<h4><small>2.1</small> utils1.h</h4>
<pre class="prettyprint">
#ifndef __utils1_h__
#define __utils1_h__

void add1(int, int);

#endif
</pre>
<h4><small>2.2</small> utils1.cpp</h4>
<pre class="prettyprint">
#ifdef __cplusplus
extern "C" {
#endif

#include "utils1.h"

#ifdef __cplusplus
}
#endif


void add1(int x, int y) {
    int c = x + y;
}
</pre>
<h4><small>2.3</small> main1.cpp</h4>
<pre class="prettyprint">
#include <iostream>

#ifdef __cplusplus
extern "C" {
#endif

#include "utils1.h"

#ifdef __cplusplus
}
#endif


int main(int argc, char* argv[]) {
    std::cout << "Hello World!!\n";

    int x = 20;
    int y = 40;

    std::cout << x << " + " << y << " = " << add1(x, y) << "\n";
    return 0; 
}
</pre>
<pre class="prettyprint">
$ g++ -Iinclude src/utils1.cpp src/main1.cpp # 在.cpp中编写c函数或变量时包含头文件时
                                             # 应该使用extern "C"，然后统一使用g++
                                             # 进行编译
</pre>
</section>

<blockquote><h4>源码</h4></blockquote>

<div class="github-widget" data-repo="linguofeng/labs"></div></br>