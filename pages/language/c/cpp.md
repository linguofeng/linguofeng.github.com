---
layout: default
title: C++基础
description: 学习笔记
navigation: [1.HelloWorld, 2.数据类型、变量与常量, 3.输入输出, 4.控制结构与函数, 5.高级数据类型, 6.动态内存, 7.数据结构, 8.其它数据类型, 9.面向对象, 10.C++高级概念]
---

<section id="1">
    <div class="page-header">
        <h3>一、HelloWorld</h3>
    </div>
	<p>@$ subl HelloWorld.cpp@</p>
<pre class="prettyprint">
#include <iostream>
using namespace std;

int main() {
    cout << "!!!Hello World!!!" << endl;
    return 0;
}
</pre>
    <p>Build: @ctrl + b@</p>
    <p>Run: @shift + ctrl + b@</p>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、数据类型、变量与常量</h3>
    </div>
    <h4><small>2.1</small> 数据类型</h4>
table(table table-bordered).
|_.名称|_=.字节数|_.描述|_.范围|
|@char@|=.1|字符（character）或整数（integer），8位|*有符号（signed）*: -128 到 127
*无符号（unsigned）*: 0 到 255|
|@short@|=.2|短整数（short integer ），16位|*有符号（signed）*: -32768 到 32767
*无符号（unsigned）*: 0 到 65535|
|@long@|=.4|长整数（long integer ），32位|*有符号（signed）*: -2147483648 到 2147483647
*无符号（unsigned）*: 0 到 4294967295|
|@int@|=.4|整数（integer），8位|*有符号（signed）*: -2147483648 到 2147483647
*无符号（unsigned）*: 0 到 4294967295 |
|@float@|=.4|浮点数|3.4e ==+ / -== 38 （7 个数字（7digits））|
|@double@|=.8|双精度浮点数|1.7e ==+ / -== 308 (15 digits)|
|@long double@|=.8|长双精度浮点数|1.7e ==+ / -== 308 (15 digits)|
|@bool@|=.1|布尔Boolean值。|true 或 false|
|@wchar_t@|=.2|宽字符(Wide character) 。存储两字节(2 bytes) 。|一个宽字符（1 wide characters）|
|\4.*备注* ：有符号类型(signed)可以表示 %(label label-info)正数% 和 %(label label-info)负数% ，而无符号类型(unsigned)只能表示 %(label label-info)正数% 和 %(label label-info)0% ，默认为 %(label label-info)signed% 。
定义一个有符号int类型： @signed int x;@
定义一个无符号int类型： @unsigned int y;@|

    <h4><small>2.2</small> 变量</h4>
    <p>定义变量</p>
<pre class="prettyprint">
// 声明变量
int a, b, c;

// 给变量赋值
a = 1;
b = 2;
c = 3;
</pre>
    <p>变量初始化</p>
<pre class="prettyprint">
int x = 12;     // 方式一
int y(52);      // 方式二
</pre>
    <p>字符串</p>
<pre class="prettyprint">
#include <string>       // 需要引用string头文件

std::string str1 = "Hello World1!";
std::string str2("Hello World2!");
</pre>

    <h4><small>2.3</small> 常量</h4>
    <p>什么是常量？</p>
<pre class="prettyprint">
5           // 一个整数 int
-5          // 有符号整数 int
5u          // 无符号整数 unsigned
5l          // 长整数 long
5ul         // 无符号长整数 unsigned long
5.214       // 双精度浮点数 double
6.002f      // 浮点数 float
3.127L      // 长双精度浮点数 long double
75          // 10进制数
0113        // 8进制数
0x4b        // 16进制数
'a'         // 字符 char
"abc"       // 字符串 string
'\n'        // 转义符号
L"abcdef"   // 宽字符 wchar_t
true        // 布尔值 bool
false       // 布尔值 bool

等都是常量.
</pre>
    <p>常量的定义</p>
<pre class="prettyprint">
#define PI 3.14159
#define NEWLINE '\n' 
</pre>
    <p>常量的声明</p>
<pre class="prettyprint">
const int pathwidth = 100;
const char tabulator = '\t';
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、输入输出</h3>
    </div>
    <p>@std::cout <<@ ：输出</p>
<pre class="prettyprint">
cout << "Hello"; // cout为输出流 <<为插入运算符，把Hello插入到cout输出流中
</pre>
    <p>@std::cin >>@ ：输入</p>
<pre class="prettyprint">
int age;
cin >> age;      // cin为输入流，接受输入的数据并通过>>给age变量
</pre>
    <p>输入字符串</p>
<pre class="prettyprint">
#include <string>
...
string str;
getline(cin, str);
...
</pre>
    <p>字符串流（stringstream）</p>
<pre class="prettyprint">
#include <string>
#include <sstream>
...
string str("123");
int x;
stringstream(str) >> x;     // 这个过程实现了字符串转换成数字
...
</pre>
</section>

<section id="4">
    <div class="page-header">
        <h3>四、控制结构与函数</h3>
    </div>
    <p>控制结构</p>
<pre class="prettyprint">
if (true) {
    
} else {
    
}

while (true) {
    
}

do {
    
} while (true);

for (int i = 0; i < 10; i++) {
    
}
</pre>
    <p>结构控制</p>
<pre class="prettyprint">
break           // 退出循环
continue        // 结束当前循环而继续进入下一个循环
goto            // 跳到

loop:           // 声明一个目标
cout << "abc"

goto loop;      // 跳到目标
</pre>
    <p>值传递与地址传递</p>
<pre class="prettyprint">
// 值传递
int add1(int x, int y) {
    return x + y;
}

// 地址传递
int add2(int x, int y, int& result) {   // &地址符表示把地址作为参数传递
    result = x + y;
}

int main() {
    int result = 0;
    cout << result;     // result = 0

    result = add1(12, 98);
    cout << result;     // result = 110

    add2(12, 98, result)
    cout << result;     // result = 110
}
</pre>
    <p>函数的参数默认值</p>
<pre class="prettyprint">
int add(int x, int y = 10) {
    return x + y;
}

cout << add(5);     // 输出15
cout << add(5, 20); // 输出25
</pre>
    <p>函数重载</p>
<pre class="prettyprint">
int add(int x, int y) {
    return x + y;
}
float add(float x, float y) {
    return x + y;
}

cout << add(1, 11)      // 调用第一个函数
cout << add(1f, 11f)    // 调用第二个函数
</pre>
    <p>Inline内联函数，使用时编译</p>
<pre class="prettyprint">
inline int add(int x, int y);

int main() {
    cout << add(12, 3);
}

int add(int x, int y) {
    return x + y;
}
</pre>
    <p>递归函数</p>
<pre class="prettyprint">
int add(int x, int y) {
    int result = x + y;
    if(result < 1000000) {
        result = add(result, x);
    }
    return result;
}
</pre>
    <p>函数的声明，即在main函数后写函数</p>
<pre class="prettyprint">
int add(int x, int y);  // 声明函数

int main() {
    cout << add(12, 33);
    return 0;
}

int add(int x, int y) {
    return x + y;
}
</pre>
</section>


<section id="5">
    <div class="page-header">
        <h3>五、高级数据类型</h3>
    </div>
    <p>数组</p>
<pre class="prettyprint">
int is[5] = {12, 21, 51, 32, 95};         // 定义一个长度为5的数组
int iss[2][10];                           // 定义一个多维数组
</pre>
    <p>字符序列</p>
<pre class="prettyprint">
char cs1[20];                             // 能保存20个字符的字符数组
char cs2[] = {'a', 'b', 'c', 'd', '\0'};  // 长度为5的字符数组
char cs3[] = "abcd";                      // 与cs2相同，自动添加\0

string str = cs3;                         // 成立
</pre>
    <p>指针</p>
<pre class="prettyprint">
& -- 取地址符
* -- 取地址指向的内容

int i = 4;
int x = 0;
int * p;    // 定义一个p指针变量，用于保存指针地址，p的类型是int *，而不是int
p = &i;     // 取i的地址赋予指针变量p
x = *p;     // 取指针地址指向的内容赋予x
x == i;     // 成立
</pre>
    <p>指针与数组</p>
<pre class="prettyprint">
int numbers[5];             // 初始化一个数组，同时数组名其实是一个指针常量，指向的是数组的第一个元素的地址
int * p;                    // 定义一个指针变量p
p = numbers;                // 成立，指针变量指向数组第一个元素的地址
*p = 10;                    // 使数组第一个元素等于10
p++;                        // 数组运算，移动指针到下一位，即数组的第二位的地址
*p = 20;                    // 使指针变量p指向的内容（数组第二个元素）等于20
p = &numbers[2];            // 使指针变量p等于数组第3个元素的地址
*p = 30;                    // 使指针变量p指向的内容（数组第三个元素）等于30
p = numbers + 3;            // 使指针变量p等于数组第一位+3即第4个元素的地址
*p = 40;                    // 使指针变量p指向的内容（数组第四个元素）等于40
p = numbers;                // 指针变量指向数组第一个元素的地址
*(p + 4) = 50;              // p+4移动指针到第五位，使其内容等于50
</pre>
    <p>指针的数学运算</p>
<pre class="prettyprint">
假如：
char * p1 = 1000;
short * p2 = 2000;
long * p3 = 3000;
cout << p1++;        // 1001，char的长度是1
cout << p2++;        // 2002，short的长度是2
cout << p3++;        // 3004，long的长度是4

*p1++ => *(p1++)，这里是取1001地址指向的值，++比*运算符级别要高。
</pre>
    <p>指针的指针</p>
<pre class="prettyprint">
char a;
char * b;
char ** c;

a = 'h';
b = &a;     // 把a的指针赋予指针变量b
c = &b;     // 把指针变量b的指针赋予c
</pre> 
    <p>void 指针</p>
<pre class="prettyprint">
void increase(void * data, int psize) {      // void *表明data可以接收任意类型的指针
    if (psize == sizeof(char)) {             // 如果data是char *类型指针
        char * pchar;                        // 定义一个char *类型的指针变量
        pchar = (char *) data;               // 把void *类型指针转换成char *类型的指针并赋予pchar指针变量
        ++(*pchar);
    } else if (psize == sizeof(int)) {       // 如果data是int *类型指针
        int * pint;                          // 定义一个int *类型的指针变量
        pint = (int *) data;                 // 把void *类型指针转换成int *类型的指针并赋予pint指针变量
        ++(*pint);
    }
}

int main() {
    char a = 'x';
    int b = 12;
    increase(&a, sizeof(a));        // 结果是++(a)
    increase(&b, sizeof(b));        // 结果是++(b)
}
</pre>
    <p>空指针</p>
<pre class="prettyprint">
int * p;
p = 0;
</pre>
    <p>函数指针</p>
<pre class="prettyprint">
int add(int x, int y) {
    return x + y;
}

int (* addp)(int, int) = add;
cout << (* addp)(12, 24);
</pre>
</section>

<section id="6">
    <div class="page-header">
        <h3>六、动态内存</h3>
    </div>
    <p>@new@ / @new[]@</p>
<pre class="prettyprint">
int * p1 = new(nothrow) int;     // 给单个元素分配内存，nothrow关键字可以捕获异常
int * p2 = new int[5];           // 给数组分配内存

if(p1 == 0 || p2 == 0) {
    // 空指针
}
</pre>
    <p>@delete@ / @delete[]@</p>
<pre class="prettyprint">
delete p1;      // 删除单个元素分配的内存
delete[] p2;    // 删除数组分配的内存
</pre>
</section>

<section id="7">
    <div class="page-header">
        <h3>七、数据结构</h3>
    </div>
    <p>@struct@ ：结构体</p>
<pre class="prettyprint">
struct movies_t {
    string title;
    int year;
} mine, yours;

int main() {
    mine.title = "xxxxxx";
    mine.year = 1989;

    yours.title = "yyyyyy";
    yours.year = 2012;
}
</pre>
    <p>结构指针</p>
<pre class="prettyprint">
movies_t * p;           // 定义一个movies_t结构类型的指针变量
p = &mine;              // 把movies_t结构类型的mine的地址赋予指针变量p
p -> title = "abcdef";  // 通过结构指针访问结构体内变量，等同于下面的方式
(*p).title = "xxx";
</pre>
    <p>结构嵌套</p>
<pre class="prettyprint">
struct movies_t {
    string title;
    int year;
}
struct movies {
    string title;
    movies_t m;
} m1;

movies * p = &m1;

p -> title      => m1.title;
p -> m.title    => m1.m.title;
p -> m.year     => m1.m.year;
</pre>
</section>

<section id="8">
    <div class="page-header">
        <h3>八、其它数据类型</h3>
    </div>
    <p>@typedef@ ：自定义数据类型</p>
<pre class="prettyprint">
typedef char C;             // 自定义一个char类型
typedef char * pChar;       // 自定义一个char *指针类型

C c = 'a';
pChar p = &c;
*p = 'b';
cout << c;  // 输出b
</pre>
    <p>@union@ ：联合，长度是元素中最长的元素的长度，作用是通过不同的元素类型访问 %(label label-info)同一块内存空间% 中不同的内容</p>
<pre class="prettyprint">
union u_u {
    long l;
    char c[4];
    struct {
        short a;
        short b;
    } s;
} u;

u.l     => 访问4个字节的内容
u.s.a   => 访问4个字节中的前两个字节的内容
u.s.b   => 访问4个字节中的后两个字节的内容
u.c[0]  => 访问4个字节中的第一个字节的内容
</pre>
    <p>Anonymous @union@ ：匿名联合，直接通过结构体访问联合中的元素，但联合中的元素不能存储不同的值，因为使用的是同一块内存空间。</p>
<pre class="prettyprint">
struct book_t {
    char title[50];
    char author[50];
    union {
        float dollars;
        int yen;
    };
} book;

book.title = "c++";
book.author = "abcdef";
book.dllars = 23.5;
book.yen = 10;
</pre>
    <p>@enum@ ：枚举，生成任意类型的数据。</p>
<pre class="prettyprint">
enum colors_t {black, blue, green, cyan, red, purple, yellow, white} color;
color.black == 0;   // 枚举在编译被编译成整数，并从0开始，如果没有指定的话，所以black实际是等于0，blue就等于1

enum months_t { january=1, february, march, april,
                may, june, july, august,
                september, october, november, december} y2k;
                // 这里y2k的值是从1到12,因为已经指定了january=1
</pre>
</section>

<section id="9">
    <div class="page-header">
        <h3>九、面向对象</h3>
    </div>
    <h4><small>9.1</small> 类(Class)</h4>
    <p>@class@ ： %(label label-info)类% ，与C的struct类似，不同的是类可以包含结构体，而struct只包含数据元素。</p>
<pre class="prettyprint">
class Class_name {  // Class_name是自定义类型名称
    int x, y;
    public:         // 范围，有3种：private（私有，默认），protected（受保护），public（公共）
        void set_values (int,int);  // 函数原型，编译器把它作为inline函数考虑
        int area (void) {   // 普通函数成员
            return x * y;
        }
} clazz;            // clazz是对象名称

void Class_name::set_values(int _x, int _y) {    // 函数实现，"::"叫做范围操作符，用于定义class的成员。
    x = _x;
    y = _y;
}

clazz.set_values(3, 4); // 可以访问public范围的函数
</pre>
    <p>%(label label-info)构造函数% ：无返回值。</p>
<pre class="prettyprint">
class CRectangle {
    int width, height;
    public:
        CRectangle (int,int);   // 构造函数
        int area () {return (width*height);}
};

CRectangle::CRectangle (int a, int b) {
    width = a;
    height = b;
}

CRectangle rect (3,4);
CRectangle rectb (5,6);
</pre>
    <p>%(label label-info)析构函数% ：必须与class同名，加"~"前缀，必须无返回值。</p>
<pre class="prettyprint">
class CRectangle {
    int *width, *height;
    public:
        CRectangle (int,int);   // 构造函数，初始化时调用
        ~CRectangle ();         // 析构函数，被销毁时自动调用
        int area () {return (*width * *height);}
};

CRectangle::CRectangle (int a, int b) {
    width = new int;    // 动态分配内存空间
    height = new int;   // 动态分配内存空间
    *width = a;
    *height = b;
}

CRectangle::~CRectangle () {    // 对象被销毁时自动调用，用于释放动态申请的内存空间。
    delete width;
    delete height;
}
</pre>
    <p>%(label label-info)构造函数重载% 与 %(label label-info)默认构造函数% ：如果没有定义构造函数，默认构造函数存在。</p>
<pre class="prettyprint">
class CRectangle {
    int width, height;
    public:
        CRectangle ();          // 空构造函数，也是默认构造函数，当没有定义带参数构造函数时。
        CRectangle (int,int);   // 重载构造函数，如果定义了带参数的重载构造函数，默认构造函数不存在，必须重新定义才行。
        int area (void) {return (width*height);}
};

CRectangle::CRectangle () {
  width = 5;
  height = 5;
}

CRectangle::CRectangle (int a, int b) {
  width = a;
  height = b;
}

CRectangle rect (3,4);
CRectangle rectb;   // CRectangle rectb()这样是不对的。
</pre>
    <p>%(label label-info)类的指针%</p>
<pre class="prettyprint">
class CRectangle {
    int width, height;
    public:
        void set_values (int, int);
        int area () {return (width*height);}
};

void CRectangle::set_values (int a, int b) {
    width = a;
    height = b;
}

CRectangle a;         // class对象
CRectangle * b;       // class指针类型
CRectangle * c;       // class指针类型
CRectangle * d = new CRectangle[2]; // d指向两个对象的地址，也可以理解为对象数组，d指向数组第一个元素地址。

b = &a;               // 类指针类型b指向类a的地址
a.set_values(3, 4);
cout << b->area();    // 输出12
b->set_values(5, 6);
cout << a.area();     // 输出30

c = new CRectangle;   // 指向一个对象的地址
c->set_values(4, 7);
cout << c->area();    // 输出28

d->set_values(1, 9);
cout << d->area();    // 输出9
d[1].set_values(2, 9);// 可以理解为 d++;d->set_values(2, 9);指针的运算。
cout << d[1].area();  // 输出18

delete d[2];    // 释放内存
delete c;       // 释放内存
</pre>
    <p>使用 @struct@ 与 @union@ 来定义 %(label label-info)类% ，在C++中。</p>
<pre class="prettyprint">
struct/union定义的结构体/联合也可以当作class来用，在C++中。有点不同的是union在同一时间只能存储一个数据成员，因为是共享同一块内存空间的。

struct/union s_t {
    int result;
    public:
        void add(int, int);
};

void s_t::add(int x, int y) {
    result = x + y;
}

s_t s;              // 使用的是默认构造函数
s.add(12, 24);
cout << s.result;   // 输出36，由于struct定义的class默认范围是public，这点与class不同。
</pre>
    <p>%(label label-info)操作符重载% ，使用 @operator@ 来重载下面可被重载的操作符，以实现对象与对象的操作。</p>
<pre class="prettyprint">
+    -    *    /    =    <    >    +=   -=   *=   /=   <<   >>
<<=  >>=  ==   !=   <=   >=   ++   --   %    &    ^    !    |
~    &=   ^=   |=   &&   ||   %=   []   ()   ,    ->*  ->
new    delete    new[]     delete[]
</pre>
<pre class="prettyprint">
class CVector {
    public:
        int x,y;
        CVector () {
            x = 0;
            y = 0;
        }
        CVector (int,int);
        CVector operator +(CVector);   // 重载"+"操作符，扩展对象相加
};

CVector::CVector (int a, int b) {
    x = a;
    y = b;
}

CVector CVector::operator +(CVector param) {
    CVector temp;
    temp.x = x + param.x;
    temp.y = y + param.y;
    return (temp);
}

int main () {
    CVector a (3,1);
    CVector b (1,2);
    CVector c;
    c = a + b;  // 等价于：c = a.operator +(b);
    cout << c.x << "," << c.y;
    return 0;
}
</pre>
table(table table-bordered).
|_.表达式|_=.操作符(@)|_.函数成员|_.全局函数|
|@a|@+@ @-@ @*@ @&@ @!@ @~@ @++@ @--@|A::operator @( )|operator @(A)|
|a@|@++@ @--@|A::operator @(int)|operator @(A,int)|
|a@b|@+@ @-@ @*@ @/@ @%@ @^@ @&@ %(label label-info)&#124;% @<@ @>@ @==@ @!=@ @<=@ @>=@ @<<@ @>>@ @&&@ %(label label-info)&#124;&#124;% @,@|A::operator @(B)|operator @(A,B)|
|a@b|@=@ @+=@ @-=@ @*=@ @/=@ @%=@ @^=@ @&=@ %(label label-info)&#124;=% @<<=@ @>>=@ @[]@|A::operator @(B)|-|
|a(b, c...)|@()@|A::operator ()(B, C...)|-|
|a->x|@->@|A::operator->()|-|

    <p>@this@ ：是一个指针，指向自身的内存地址。</p>
<pre class="prettyprint">
class CDummy {
    public:
        int isitme (CDummy& param);
};

int CDummy::isitme (CDummy& param) {
    if (&param == this) {
        return true;
    } else {
        return false;
    }
}
</pre>
    <p>@static@ ：静态成员，也叫 %(label label-info)类变量% ，对于同一个class类的所有object对象来说，值都是相同的。</p>
<pre class="prettyprint">
class CDummy {
    public:
        static int n;           // 静态成员变量n
        CDummy () { n++; };
        ~CDummy () { n--; };
};

int CDummy::n = 0;

int main() {
    CDummy a;                   // n = 1
    CDummy b[5];                // n = 1 + 5
    CDummy * c = new CDummy;    // n = 1 + 5 + 1
    cout << a.n << endl;        // n = 7
    delete c;                   // n = 7 - 1，被销毁时执行~CDummy析构函数
    cout << CDummy::n << endl;  // n = 6
    return 0;
}
</pre>
    <h4><small>9.2</small> 友元与继承关系(Friendship and inheritance)</h4>
    <p>@friend@ ：友元函数，提供访问 @private@ 和 @protected@ 成员</p>
<pre class="prettyprint">
class CRectangle {
    int width, height;
    public:
        void set_values(int, int);
        int area() {return (width * height);}
        friend CRectangle duplicate(CRectangle);   // 友元函数
};

void CRectangle::set_values (int a, int b) {
    width = a;
    height = b;
}

CRectangle duplicate(CRectangle rectparam) {    // 注意，这个函数的写法，与class的成员函数不同，没有"::"操作符。
    CRectangle rectres;
    rectres.width = rectparam.width * 2;        // 因为duplicateb函数通过friend定义，
    rectres.height = rectparam.height * 2;      // 所以能够访问rectparam对象的private和protected成员
    return (rectres);
}

int main() {
    CRectangle rect, rectb;
    rect.set_values(2, 3);
    rectb = duplicate(rect);
    cout << rectb.area();       // 输出24
    return 0;
}
</pre>
    <p>@friend class@ ：友元类，提供访问 @private@ 和 @protected@ 成员</p>
<pre class="prettyprint">
class CSquare;

class CRectangle {
    int width, height;
    public:
        int area() {return (width * height);}
        void convert (CSquare a);
};

class CSquare {
    private:        // 强调side为private
        int side;
    public:
        void set_side(int a) {side=a;}
        friend class CRectangle;    // 友元类，说明CRectangle能够访问CSquare的private和protected成员
};

void CRectangle::convert (CSquare a) {  // CRectangle是CSquare的友元类，所以能够CSquare的private和protected成员
    width = a.side;
    height = a.side;
}

int main () {
    CSquare sqr;
    CRectangle rect;
    sqr.set_side(4);        // 设定side = 4
    rect.convert(sqr);      // 读取友元类中的私有成员变量
    cout << rect.area();    // 输出16
    return 0;
}
</pre>
    <p>@: public/protected/private@ ：类之间的继承关系。 @public@ 表示从父类中继承的成员获得最低程序的保护； @protected@ 表示从父类中继承的所有public成员会成为被protected修饰的成员；同理 @private@ 将继承的所有成员被private来修饰。</p>
<pre class="prettyprint">
class CPolygon {                        // 父类
    protected:
        int width, height;              // 受保护的成员变量，表示除了自身能访问外还有子类能访问。
    public:
        void set_values(int a, int b) {
            width = a;
            height = b;
        }
};

class CRectangle: public CPolygon {     // 子类1
    public:
        int area() {
            return (width * height);
        }
};

class CTriangle: public CPolygon {      // 子类2
    public:
        int area() {
            return (width * height / 2); 
        }
};

int main () {
    CRectangle rect;
    CTriangle trgl;
    rect.set_values (4,5);  // 子类1继承了父类的set_values函数，同时能够能够访问父类的protected成员。
    trgl.set_values (4,5);  // 子类2继承了父类的set_values函数，同时能够能够访问父类的protected成员。
    cout << rect.area() << endl;
    cout << trgl.area() << endl;
    return 0;
}
</pre>
table(table table-bordered).
|_.访问|_.public|_.protected|_.private|
|自身成员|%(label label-success)yes%|%(label label-success)yes%|%(label label-success)yes%|
|子类成员|%(label label-success)yes%|%(label label-success)yes%|%(label label-error)no%|
|非成员|%(label label-success)yes%|%(label label-error)no%|%(label label-error)no%|

    <p>如果没有明确写出访问限制，所有由关键字 @class@ 生成的类被默认为 @private@ ，而所有由关键字 @struct@ 生成的类被默认为 @public@ 。</p>
    <p>从基类继承：首先 %(label label-info)构造函数% %(label label-info)析构函数% %(label label-info)operator=()成员% %(label label-info)friends友元函数% 不能被继承外其它成员均被继承。但要注意，当子类被创建或销毁时，基类的默认构造函数与析构函数会自动被调用。</p>
<pre class="prettyprint">
class mother {      // 基类
    public:
        mother() { cout << "mother: no parameters\n"; }
        mother(int a) { cout << "mother: int parameter\n"; }
};

class daughter: public mother {    // 子类1
    public:
        daughter(int a) {          // 基类的默认构造函数被调用，此时输出"mother: no parameters"
            cout << "daughter: int parameter\n\n";
        }
};

class son: public mother {        // 子类2
    public:
        son(int a) : mother(a) {    // 调用基类的构造函数，此时输出"mother: int parameter"
            cout << "son: int parameter\n\n";
        }
};

int main() {
    daughter cynthia (1);
    son daniel(1);
    return 0;
}
</pre>
    <p>%(label label-info)多重继承% : @class xxx: public class1, public class2 {}@</p>
<pre class="prettyprint">
#include <iostream>

using namespace std;

class CPolygon {    // 父类1
    protected:
        int width, height;
    public:
        void set_values(int a, int b) { width=a; height=b;}
};

class COutput { // 父类2
    public:
        void output(int i);
};

void COutput::output(int i) {
    cout << i << endl;
}

class CRectangle: public CPolygon, public COutput { // 同时继承父类1和父类2
    public:
        int area() { return (width * height); }
};

class CTriangle: public CPolygon, public COutput {  // 同时继承父类1和父类2
    public:
        int area() { return (width * height / 2); }
};
  
int main () {
    CRectangle rect;
    CTriangle trgl;
    rect.set_values(4,5);       // 调用父类1的函数（通过继承）
    trgl.set_values(4,5);       // 调用父类1的函数（通过继承）
    rect.output(rect.area());   // 调用父类2的函数（通过继承）
    trgl.output(trgl.area());   // 调用父类2的函数（通过继承）
    return 0;
}
</pre>
    <h4><small>9.3</small> 多态性（Polymorphism）</h4>
    <p>基类的指针</p>
<pre class="prettyprint">
class CPolygon {
    protected:
        int width, height;
    public:
        void set_values(int a, int b) { width=a; height=b; }
};

class CRectangle: public CPolygon {
    public:
        int area() { return (width * height); }
};

class CTriangle: public CPolygon {
    public:
        int area() { return (width * height / 2); }
};

int main () {
    CRectangle rect;                // 子类1
    CTriangle trgl;                 // 子类2
    CPolygon * ppoly1 = &rect;      // 基类指针ppoly1指向子类1的地址
    CPolygon * ppoly2 = &trgl;      // 基类指针ppoly2指向子类2的地址
    ppoly1->set_values(4, 5);       // 调用基类中的set_values函数，实际是调用rect.set_values(4, 5)
    ppoly2->set_values(4, 5);       // 因为此时ppoly2指针是CPolygon类型，因为不能调用子类中的area函数。
    cout << rect.area() << endl;    // 输出20
    cout << trgl.area() << endl;    // 输出10
    return 0;
}
</pre>
    <p>虚拟成员： @virtual@ 关键字的作用就是在当使用基类的指针的时候，使子类中与基类同名的成员在适当的时候被调用</p>
<pre class="prettyprint">
class CPolygon {
    protected:
        int width, height;
    public:
        void set_values(int a, int b) { width=a; height=b; }
        virtual int area() { return (0); }      // 虚拟成员
};

class CRectangle: public CPolygon {
    public:
        int area() { return (width * height); }     // 细化了area()函数，有点类似java中的重写方法，
};

class CTriangle: public CPolygon {
    public:
        int area()  return (width * height / 2);    // 注，如果基类没有使用virtual修饰，那么通过基类指针访问的还是基类的area函数，而不是子类的area函数，输出的是0。
};

int main () {
    CRectangle rect;                // 子类1
    CTriangle trgl;                 // 子类2
    CPolygon poly;                  // 基类
    CPolygon * ppoly1 = &rect;      // 基类指针ppoly1指向子类1的地址
    CPolygon * ppoly2 = &trgl;      // 基类指针ppoly2指向子类2的地址
    CPolygon * ppoly3 = &poly;      // 基类指针ppoly3指向基类的地址
    ppoly1->set_values(4, 5);       // 等价于rect.set_values(4, 5)
    ppoly2->set_values(4, 5);       // 等价于trgl.set_values(4, 5)
    ppoly3->set_values(4, 5);       // 等价于poly.set_values(4, 5)
    cout << ppoly1->area() << endl; // 输出20，ppoly1指向的是子类1的地址，调用的是子类1的area函数
    cout << ppoly2->area() << endl; // 输出10，ppoly2指向的是子类2的地址，调用的是子类2的area函数
    cout << ppoly3->area() << endl; // 输出0，因为基类中的虚拟成员函数返回就是0
    return 0;
}
</pre>
    <p>抽象基类，可以使用java的抽象类来理解。</p>
<pre class="prettyprint">
class CPolygon {
    protected:
        int width, height;
    public:
        void set_values(int a, int b) { width=a; height=b; }
        virtual int area(void) = 0;     // 抽象函数
};

class CRectangle: public CPolygon {
    public:
        int area(void) { return (width * height); }
};

class CTriangle: public CPolygon {
    public:
        int area(void) { return (width * height / 2); }
};

int main() {
    CPolygon poly;                  // 错误，因为抽象基类不能有实例，这点跟java一样。
    CRectangle rect;                // 子类1
    CTriangle trgl;                 // 子类2
    CPolygon * ppoly1 = &rect;      // 基类指针ppoly1指向子类1的地址，抽象基类可以定义指针。
    CPolygon * ppoly2 = &trgl;      // 基类指针ppoly2指向子类2的地址
    ppoly1->set_values(4, 5);
    ppoly2->set_values(4, 5);
    cout << ppoly1->area() << endl;
    cout << ppoly2->area() << endl;

    // 下面是动态申请内存并生成对象和释放分配的内存空间
    CPolygon * ppoly1 = new CRectangle;
    CPolygon * ppoly2 = new CTriangle;
    delete ppoly1;
    delete ppoly2
    return 0;
}
</pre>
</section>

<section id="10">
    <div class="page-header">
        <h3>十、C++高级概念</h3>
    </div>
    <h4><small>10.1</small> 模板(Templates) <small>使得我们可以生成通用的函数</small></h4>
    <p>@template <class T> T/class ...@ ： 与java的泛型好像有那么一点相似。</p>
<pre class="prettyprint">
// 函数模板
template <class T>  // 设定T的类型，如果有多点时使用","隔开。
T GetMax (T a, T b) {
    T result;
    result = (a > b) ? a : b;
    return (result);
}

// 类模板
template <class T>
class mypair {
    T a, b;
    public:
        mypair(T first, T second) {
            a = first;
            b = second;
        }
        T getmax ();
};

template <class T>
T mypair<T>::getmax() {     // mypair对象的函数实现，由于使用了模板，所以该函数是一个函数模板。
  T retval;
  retval = (a > b) ? a : b;
  return retval;
}

int main() {
    int i = 5, j = 6, k;
    long l = 10, m = 5, n;
    k = GetMax<int>(i, j);     // int，设定T的类型为int，同时接收参数类型也是int
    n = GetMax<long>(l, m);    // long，设定T的类型为long，同时接收参数类型也是long
    cout << k << endl;         // 输出 6
    cout << n << endl;         // 输出 10

    mypair <int> myobject (100, 75);
    cout << myobject.getmax(); // 输出 100
    return 0;
}
</pre>
    <p>@template <> class ClassName <char/int/...>@ 模板特殊化，当T为某类型时使用指定类来完成功能。</p>
<pre class="prettyprint">
// 类模板:
template <class T>
class mycontainer {
    T element;
    public:
        mycontainer(T arg) {
            element = arg;
        }

        T increase() {
            return ++element;
        }
};

// 类模板特殊化:
template <>
class mycontainer <char> {      // 当T为char类型时使用该类
    char element;
    public:
        mycontainer(char arg) {
            element=arg;
        }
        char uppercase() {
            if ((element >= 'a') && (element <= 'z')) {
                element += 'A' - 'a';
            }
            return element;
        }
};

int main() {
    mycontainer<int> myint (7);         // 使用普通的类模板
    mycontainer<char> mychar ('j');     // 使用T为char的类模板
    cout << myint.increase() << endl;   // 输出 8
    cout << mychar.uppercase() << endl; // 输出 J
    return 0;
}
</pre>
    <p>@template <class T, int N> ...@ 模板的参数值，接收一个基本数据类型参数</p>
<pre class="prettyprint">
template <class T, int N>
class mysequence {
    T memblock [N];
    public:
        void setmember(int x, T value);
        T getmember(int x);
};

template <class T, int N>
void mysequence<T, N>::setmember(int x, T value) {
    memblock[x]=value;
}

template <class T, int N>
T mysequence<T, N>::getmember(int x) {
    return memblock[x];
}

int main () {
    mysequence<int, 5> myints;
    mysequence<double, 5> myfloats;
    myints.setmember(0, 100);
    myfloats.setmember(3, 3.1416);
    cout << myints.getmember(0) << '\n';        // 输出 100
    cout << myfloats.getmember(3) << '\n';      // 输出 3.1416
    return 0;
}
</pre>
    <p>默认值： @template <class T=char, int N=10> class mysequence {..};@</p>
    <p>@mysequence<> myseq;@ 实际是等价于 @mysequence<char,10> myseq;@</p>
    <h4><small>10.2</small> 命名空间(Namespaces) <small>将一组全局范围有效的类、对象或函数组织到一个名字下面。</small></h4>
    <p>命名空间的使用： @using namespace xxx@</p>
<pre class="prettyprint">
namespace first {
    int var = 5;
}

namespace second {
    double var = 3.1416;
}

int main () {
    using namespace second;
    cout << first::var << endl; // 输出 5
    cout << var << endl;        // 输出 3.1416
    return 0;
}
</pre>
    <p>别名定义： @namespace new_name = current_name;@</p>
    <p>标准名空间： @using namespace std;@</p>
    <h4><small>10.3</small> 异常(Exceptions)</h4>
    <p>使用： @try {} catch(xxx) {}@</p>
<pre class="prettyprint">
int main () {
    char myarray[10];
    try {
        for (int n = 0; n <= 10; n++) {
            if (n > 9) throw "Out of range";  // 如果n大于9抛出异常
            myarray[n] = 'z';
        }
    } catch(char * str) {  // 捕获字符串类型的异常消息
        cout << "Exception: " << str << endl;
    }
    return 0;
}
</pre>
    <p>基本异常库： @#include <exception>@</p>
<pre class="prettyprint">
try {
    int* myarray= new int[1000];
} catch (exception& e) {
    cout << "Standard exception: " << e.what() << endl;
}
</pre>

table(table table-bordered).
|_.exception|_=.description|
|bad_alloc|thrown by new on allocation failure|
|bad_cast|thrown by dynamic_cast when fails with a referenced type|
|bad_exception|thrown when an exception type doesn't match any catch|
|bad_typeid|thrown by typeid|
|ios_base::failure|thrown by functions in the iostream library|

    <h4><small>10.4</small> 类型转换(Type Casting)</h4>
    <p>隐式转换(Implicit conversion)</p>
    <p>显式转换(Explicit conversion)</p>
    <p>动态转换(dynamic_cast)</p>
    <p>静态转换(static_cast)</p>

    <h4><small>10.5</small> 预处理指令(Preprocessor Directives)</h4>
    <p>@#define@ ：定义一个宏定义变量/函数</p>
<pre class="prettyprint">
#define name value
</pre>
    <p>@#undef@ ：取消一个宏定义变量/函数</p>
<pre class="prettyprint">
#undef name
</pre>
    <p>@#ifdef@ @ifndef@ @#if@ @#endif@ @#else@ @#elif@ ：常量表达式</p>
<pre class="prettyprint">
#ifdef name             // 如果常量已经定义，则会执行
// code here
#endif

#ifndef MAX_WIDTH       // 如果常量未定义，则会执行
#define MAX_WIDTH 100
#endif

#if MAX_WIDTH > 200     // if用在常量表达式上，
#undef MAX_WIDTH        // 取消定义
#define MAX_WIDTH 200   // 重新定义

#elsif MAX_WIDTH < 50   // else if
#undef MAX_WIDTH        // 取消定义
#define MAX_WIDTH 50    // 重新定义

#else                   // else
#undef MAX_WIDTH        
#define MAX_WIDTH 100
#endif                  // 结束if
</pre>
    <p>@#line@ ：</p>
<pre class="prettyprint">
#line 1 "assigning variable"
</pre>
    <p>@#error@ ：</p>
<pre class="prettyprint">
#ifndef __cplusplus
#error A C++ compiler is required   // 如果__cplusplus没定义则会中断编译
#endif
</pre>
    <p>@#include@ ：声明包含一个文件</p>
<pre class="prettyprint">
#include "file"     // 先在当前路径下找，找不到再到默认标准头路径下找。
#include <file>     // 直接在默认标准头路径下找。
</pre>
    <p>@#pragma@ ：对编译器进行配置的，如果编译器不支持某个#pragma的特定参数，这个参数会被忽略，不会产生出错。</p>
    <p>预定义的宏名称：在任何时候都是定义好的</p>
table(table table-bordered).
|_.macro|_.value|
|@__LINE__@|整数值，表示当前正在编译的行在源文件中的行数。|
|@__FILE__@|字符串，表示被编译的源文件的文件名。|
|@__DATE__@|一个格式为 "Mmm dd yyyy" 的字符串，存储编译开始的日期。|
|@__TIME__@|一个格式为 "hh:mm:ss" 的字符串，存储编译开始的时间。|
|@__cplusplus@|整数值，所有C++编译器都定义了这个常量为某个值。如果这个编译器是完全遵守C++标准的，它的值应该等于或大于199711L，具体值取决于它遵守的是哪个版本的标准。|
</section>
