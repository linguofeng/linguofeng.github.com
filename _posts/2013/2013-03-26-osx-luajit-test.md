---
layout: post
title: OSX下的LuaJIT测试
description: LuaJIT
categories: [archive]
tags: [osx, luajit]
---

<section>
    <div class="page-header">
        <h3>一、安装LuaJIT</h3>
    </div>
<pre class="prettyprint">
$ brew install luajit --enable-debug # 开启deubg支持
</pre>

<section>
  <div class="page-header">
    <h3>二、Hello World</h3>
  </div>
  <h4><small>2.1</small> main.c</h4>
<pre class="prettyprint">
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"

int main(void) {
    
    lua_State* L = luaL_newstate();   
    luaL_openlibs(L);
    luaL_dostring(L, "return 'Hello from Lua!'");  // 执行Lua语句
    const char * str = lua_tostring(L, -1);        // 获取Lua语句的返回值
    printf(str);
    lua_close(L);

    return 0;
}
</pre>
    <h4><small>2.2</small> 编译</h4>
<pre class="prettyprint">
$ gcc-4.7 \
    -lluajit-5.1 \                      # 加入luajit-5.1的库
    -I/usr/local/include/luajit-2.0 \   # 加入头文件搜索路径，因为系统已经装有lua会有冲突
    -pagezero_size 10000 \              # 64位的OSX的一个bug
    -image_base 100000000 \             # 详细说明在 http://luajit.org/install.html
    main.c
</pre>
    <h4><small>2.3</small> 执行</h4>
<pre class="prettyprint">
$ ./a.out # Hello from Lua!
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、FFI (foreign function interface)</h3>
    </div>
    <p>通过 @table.foreach(ffi, print)@ 获取的元素表</p>
table(table table-bordered).
|_.元素|_.类型|_.说明|
|new|function|创建C数据类型 @cpoint = ffi.new('Point', {23, 89})@|
|cast|function|转换成C数据类型 @cint = ffi.cast('int', 123)@|
|typeof|function|创建给定的C数据类型 @cdouble = ffi.typeof('double')@|
|sizeof|function||
|alignof|function||
|istype|function||
|fill|function||
|cdef|function|绑定C函数 @ffi.cdef[[ int printf(const char*, ...); ]]@|
|abi|function||
|metatype|function||
|copy|function||
|errno|function||
|load|function||
|arch|x64|当前CPU架构|
|string|function||
|gc|function||
|os|OSX|当前系统||
|C|userdata||
|offsetof|function||

see more: "http://luajit.org/ext_ffi_api.html":http://luajit.org/ext_ffi_api.html

    <h4><small>3.1</small> 基本应用</h4>
<pre class="prettyprint">
local ffi = require 'ffi'
local x = ffi.new('int')          -- 创建一个int
local c = ffi.new('char*')        -- 创建一个char*

ffi.cdef[[
    int printf(const char*, ...); -- 绑定c的printf函数
]]

local C = ffi.C
C.printf('Hello %s!/n', 'World')  -- 调用绑定好的printf函数
</pre>
    <h4><small>3.2</small> 绑定C自定义函数</h4>
<pre class="prettyprint">
// main.c
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"

int add(int, int);

int main(void) {
    
    lua_State* L = luaL_newstate();   
    luaL_openlibs(L);
    luaL_dofile(L, "main.lua");
    lua_close(L);

    return 0;
}

int add(int x, int y) {
    return x + y;
}
</pre>
<pre class="prettyprint">
// main.lua
local ffi = require 'ffi'
ffi.cdef[[
    int add(int, int);
]]

print('12 + 59 = ' .. ffi.C.add(12, 59))

</pre>
    <h4><small>3.3</small> 绑定C数据结构</h4>
<pre class="prettyprint">
// main.c
typedef struct {
    char *name;
    int age;
} Student;

void call(Student*); // 打印这个对象

...
</pre>
<pre class="prettyprint">
// main.lua

...

ffi.cdef[[
    typedef struct {
        char *name;
        int age;
    } Student;

    void call(Student*);
]]

C.call(ffi.new('Student', {ffi.cast('char*', 'tom'), 23)}) -- 注意char*需要使用cast转换
</pre>
    <h4><small>3.4</small> 技巧，生成ffi专用的类似tolua++的pkg文件</h4>
<pre class="prettyprint">
// stub.c
#include "header.h"     // 创建stub.c，只包含要绑定的头文件
</pre>
<pre class="prettyprint">
$ gcc-4.7 -E stud.c | grep -v '^#' > ffi_header.h
</pre>
<pre class="prettyprint">
// main.lua

...
ffi.cdef(io.open('ffi_header.h', 'r'):read('*a'))
...
</pre>
    <h4><small>3.5</small> 绑定C++数据结构（对象）</h4>
<p>@Student.h@</p>
<pre class="prettyprint">
#ifndef __STUDENT_H__
#define __STUDENT_H__

class Student {
    public:
        Student();
        ~Student();
        void toString(void);
        void setName(const char* name);
        void setAge(int age);
    private:
        char* name;
        int age;
};

#endif
</pre>
<p>@Student.cpp@</p>
<pre class="prettyprint">
#include "Student.h"

Student::Student() {
    
}

Student::~Student() {
    
}

void Student::toString() {
    std::cout << "name: " << name << " age: " << age << std::endl;
}

void Student::setName(const char* name) {
    delete this->name;
    this->name = new char[strlen(name) + 1];
    strcpy(this->name, name);
}

void Student::setAge(int age) {
    this->age = age;
}
</pre>
<p>@bindings.h@</p>
<pre class="prettyprint">
#ifndef __BINDINGS_H__
#define __BINDINGS_H__

// Student对象提供给Lua的接口
Student* Student_new(void);
void Student_toString(Student*);
void Student_setName(Student*, const char*);
void Student_setAge(Student*, int);
void Student__gc(Student*);

#endif
</pre>
<p>@bindings.cpp@</p>
<pre class="prettyprint">
#include "Student.h"

extern "C" {
#include "bindings.h"
}

extern "C" {

    Student* Student_new(void) {
        return new Student();        
    }

    void Student_toString(Student* stu) {
        stu->toString();
    }
    
    void Student_setName(Student* stu, const char* name) {
        stu->setName(name);
    }

    void Student_setAge(Student* stu, int age) {
        stu->setAge(age);
    }
    
    void Student__gc(Student* stu) {
        delete stu;
    }

}
</pre>
<p>@main.lua@</p>
<pre class="prettyprint">
local ffi = require 'ffi'
local C = ffi.C

ffi.cdef[[
    typedef struct Student Student;
]]

-- 通过gcc -E生成bindings.ffi
ffi.cdef(io.open('bindings.ffi', 'r'):read('*a'))

local Mt_Student = {} -- metatype
Mt_Student.__index = Mt_Student
Mt_Student.setName = C.Student_setName
Mt_Student.setAge = C.Student_setAge
Mt_Student.toString = C.Student_toString

ffi.metatype('Student', Mt_Student)

local stu = ffi.gc(C.Student_new(), C.Student__gc)
stu:setName("tom")
stu:setAge(23)
stu:toString()
</pre>
<p>@generate_ffi.lua@ 生成 @bindings.ffi@</p>
<pre class="prettyprint">
-- 执行
-- $ luajit generate_ffi.lua

local stub = io.open("stub.c", "w")
stub:write([[#include "bindings.h"]])
stub:close()

os.execute([[gcc -I . -E -P stub.c > bindings.ffi]])
os.execute([[rm stub.c]])
print 'done'
</pre>
<p>build</p>
<pre class="prettyprint">
$ g++ \
    -lluajit-5.1 \
    -I/usr/local/include/luajit-2.0 \
    -pagezero_size 10000 \
    -image_base 100000000 \
    -o maincpp \
    main.cpp Student.cpp bindings.cpp
$ ./maincpp
</pre>
<p>@student.dylib@ 加载动态库并绑定</p>
<pre class="prettyprint">
$ g++ -c Student.cpp bindings.cpp                           # 生成Student.o bindings.o
$ g++ -dynamiclib Student.o bindings.o -o libstudent.dylib  # 生成动态库
$ g++ \
    -lluajit-5.1 \
    -I/usr/local/include/luajit-2.0 \
    -pagezero_size 10000 \
    -image_base 100000000 \
    -o maincpp \
    main.cpp
</pre>
<p>@$ vim main.lua@</p>
<pre class="prettyprint">
- --local C = ffi.C
+ local C = ffi.load('student')
</pre>
<p>@$ ./maincpp@</p>
<p>@testcallback.c@ 首先要明白函数指针</p>
<pre class="prettyprint">

#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"

typedef void (*Callback)(void);         // 定义一个无参无返回值的函数指针类型
typedef int (*Callback2)(int,int);      // 定义一个接收两个参数int返回值的函数指针类型


void callLuaFunc(Callback);
void callLuaFunc2(Callback2);

Callback callbackFunc = NULL;
Callback2 callbackFunc2 = NULL;

// 函数指针变量例子
void MyFunc(int);      // 普通函数
void (*MyFuncP)(int);  // 函数指针变量MyFuncP，注意有typedef与没有的区别

void MyFunc(int x) {
    printf("x = %d\n", x);
}

int main(void) {
   
    MyFuncP = &MyFunc;  // 把普通函数的地址赋给MyFuncP函数指针变量
    MyFuncP(12);        // 通过函数指针调用普通函数

    lua_State* L = luaL_newstate();   
    luaL_openlibs(L);
    luaL_dofile(L, "luascripts/testcallback.lua");
    lua_close(L);
    
    return 0;
}

void callLuaFunc(Callback cb) {
    callbackFunc = cb;
    callbackFunc();
}

void callLuaFunc2(Callback2 cb2) {
    callbackFunc2 = cb2;
    int count = callbackFunc2(12, 46);

    printf("count: %d\n", count);
}
</pre>
<p>@testcallback.lua@ ffi的回调机制</p>
<pre class="prettyprint">
local log = function(...)
    print('[LuaJIT] -- ' .. string.format(...))
end

local ffi = require 'ffi'

ffi.cdef[[
    typedef void (*Callback)(void);
    typedef int (*Callback2)(int,int);

    void callLuaFunc(Callback);
    void callLuaFunc2(Callback2);
]]

local function lfunc()
    log('lfunc')
end

local function lfunc2()
    log('lfunc2')
end

local cb = ffi.cast('Callback', lfunc); -- 把lua函数转换成c函数指针
ffi.C.callLuaFunc(cb)                   -- 把转换后的c函数指针传递给c函数

cb:set(lfunc2);         -- 修改回调函数
ffi.C.callLuaFunc(cb)

cb:free()

local cb2 = ffi.cast('Callback2', function(x, y)
    log(x .. ' + ' .. y .. ' = ' .. x + y)
    return x + y
end)

ffi.C.callLuaFunc2(cb2)
cb2:free()
</pre>
</section>

<blockquote><h4>源码</h4></blockquote>

<div class="github-widget" data-repo="linguofeng/labs"></div></br>
