---
layout: post
title: C++的值、引用和指针的传递
description: C++中值传递、引用传递、指针传递的区别
categories: [archive]
tags: [c++]
---

<section>
<pre class="prettyprint">
#include <iostream>

void passValue(int x)            // 值传递
{
    x++;
    std::cout << "passValue() -- x = " << x << std::endl;
}

void passReference(int &x)      // 引用传递，只是在定义函数的时候，参数需要加&说明是接收参数的引用，而调用的时候和值传递一样，只填参数
{
    x++;
    std::cout << "passReference() -- x = " << x << std::endl;
}

void passPointer(int *x)        // 指针传递，定义函数的时候，需要说明接收的是参数的指针，调用的时候使用取地址符&
{
    (*x)++;  // 先取得地址对应的值再执行++操作
    std::cout << "passPointer() -- x = " << *x << std::endl;
}


int main()
{
    int x(10);
    std::cout << "x = " << x << std::endl;
    passValue(x);
    std::cout << "x = " << x << std::endl;
    passReference(x);
    std::cout << "x = " << x << std::endl;
    passPointer(&x);
    std::cout << "x = " << x << std::endl;
    return 0;
}
</pre>

<p>结果：</p>
<pre class="prettyprint">
x = 10                        // 初始值为10
passValue() -- x = 11         // 在passValue()函数中++后输出11
x = 10                        // 经过值传递后原值没有发生改变，说明值传递不会改变参数本身的属性
passReference() -- x = 11     // 在passReference()函数中++后输出11
x = 11                        // 经过引用传递后原值发生了变化，说明引用传递会改变参数本身的属性
passPointer() -- x = 12       // 在passPointer()函数中++后输出12
x = 12                        // 经过指针传递后原值也发生了变化，说明指针传递也会改变参数本身的属性，与引用传递不同的是调用函数需要使用&取地址符，并按指针的操作方式对参数进行操作。
</pre>
</section>
