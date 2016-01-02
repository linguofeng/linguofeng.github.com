---
layout: post
title: C++的动态内存分配
description: new与malloc动态内存分配的使用方法
categories: [archive]
tags: [c++]
---

<section>
    <div class="page-header">
        <h3>一、malloc/free</h3>
    </div>
<pre class="prettyprint">
char * mName;
void setName(const char * name)
{
    free(mName);                            // free用于释放malloc申请的内存空间，同时记住释放后应该把指针置NULL防止出现“野指针”。
    mName = (char*) malloc(sizeof(name) + 1);
    if (NULL != mName)
    {
        strcpy(mName, name);
    }
}
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、new/delete</h3>
    </div>
<pre class="prettyprint">
#include <string.h>

char * mName;
void setName(const char * name)
{
    delete[] mName;                         // delete用于释放new申请的内存空间，同时记住释放后应该把指针置NULL防止出现“野指针”。
    mName = new char[strlen(name) + 1 + 8]; // abcdefg为8个字符长度
    if (NULL != mName)
    {
        strcpy(mName, name);
        strcat(mName, "abcdefg");           // 往后面添加
    }

    // 最后释放内存应该使用 delete[] mName;因为时候使用了 new type[size];
}
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、sizeof/strlen</h3>
    </div>
<pre class="prettyprint">
char strs[] = "abcdefg";

sizeof(strs);               // 输出8，sizeof能够计算出数组占用的内存容量，最后还有"\0"。
                            // 但有一点，数组作参数传递时会自动退化成指针，所以容量应该是sizeof(char) = 4。

strlen(strs);               // 输出7，strlen能够计算出字符，仅限于字符的长度，并不包括"\0"。
                            // 作strlen的参数时会自动退化为char*指针。
</pre>
</section>
