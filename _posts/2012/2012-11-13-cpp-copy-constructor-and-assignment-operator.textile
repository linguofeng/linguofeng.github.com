---
layout: post
title: C++的拷贝构造函数和赋值运算符
description: 笔记
categories: [archive]
tags: [c++]
---

<section>
    <div class="page-header">
        <h3>一、拷贝构造函数</h3>
    </div>
    <p>使用原则：当对象中含有类型为指针的成员变量时，重载拷贝构造函数能够防止两对象共享同一成员指针的问题。</p>
<pre class="prettyprint">
class Test
{
public:
    Test(void);             // 默认构造函数
    Test(const Test& t);    // 拷贝构造函数
    ~Test(void);            // 析构函数

private:
    char * name;            // 指针成员变量
};

Test::Test(void)
{
    name = NULL;
}

Test::~Test(void)
{
    delete[] name;
    name = NULL;
}

Test::Test(const Test& t)
    // :Parent(t)   // 如果是调用父类的拷贝构造函数则这样调
{
    delete[] name;
    name = new char[strlen(t.name) + 1];
    strcpy(name, t.name);
}

int main()
{
    Test * t1 = new Test(); // 调用默认构造函数
    Test t2 = *t1;          // 调用拷贝构造函数

    delete t1;              // 析构t1
    // delete *t2;          // 析构t2，此处不需要显式析构
    return 0;
}
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、赋值运算符</h3>
    </div>
<pre class="prettyprint">
class Test
{
public:
    Test(void);
    ~Test(void);
    Test& operator=(const Test& t);
private:
    char * name;
};

Test::Test(void)
{
    name = NULL;
}

Test::~Test(void)
{
    delete[] name;
    name = NULL;
}

Test& Test::operator=(const Test& t)
{
    // Parent::operator=(t);    // 如果是继承关系中调用父类的赋值运算符

    if (this != &t)             // 如果右边的对象与左边的对象不是同一对象时才赋值
    {
        delete[] name;
        name = new char[strlen(t.name) + 1];
        strcpy(name, t.name);
    }
    return *this;               // 返回的是该对象的引用
}

int main()
{
    Test* t1 = new Test();      // 调用默认构造函数
    Test t2;                    // 同上
    t2 = *t1;                   // 调用赋值运算符把t1的值赋给t2

    delete t1;                  // 析构t1
    // delete &t2;              // 析构t2，此处不需要显式析构t2
    return 0;
}
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、总结</h3>
    </div>
    <p>拷贝构造函数与赋值运算符的重载都是根据是否有指针类型的成员变量，如果有就需要重载来防止成员指针指向的地址是相同的。</p>
</section>
