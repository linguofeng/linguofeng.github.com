---
layout: post
title: C++的new与nothrow、new_handler关键字
description: C++的动态内存管理之new关键字
categories: [archive]
tags: [c++]
---

<section>
    <h4><small>1.1</small> new</h4>
<pre class="prettyprint">
#include <iostream>

int main()
{
    try
    {
        int *pInt = new int();
    }
    catch (std::bad_alloc e)
    {
        // new申请内存失败时会抛出bad_alloc异常，而malloc不会
    }
    return 0;
}
</pre>

    <h4><small>1.2</small> nothrow</h4>
<pre class="prettyprint">
#include <iostream>
#include <new>

int main()
{
    int *pInt = new (std::nothrow)int();
    if (pInt == NULL)
    {
        std::cout << "申请内存失败";
    }
    return 0;
}
</pre>

    <h4><small>1.3</small> new_handler</h4>
<pre class="prettyprint">
#include <iostream>
#include <cstdlib>
#include <new>

void __cdecl newhandler()
{
    std::cout << "申请内存失败";
    exit(0);
}

int main()
{
    std::set_new_handler(newhandler);
    int *pInt = new int();          // 如果申请内存失败则调用newhandler()函数。
    return 0;
}
</pre>
</section>
