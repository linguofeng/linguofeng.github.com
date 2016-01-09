---
layout: page
title: "LuaJIT"
description: "一个速度更快的Lua版本"
update: 2013-06-17
---

<section>
    <p>LuaJIT是一个利用JIT编译技术把Lua脚本直接编译成机器码由CPU运行，所以速度比Lua要快。</p>

    <p>安装LuaJIT</p>
    <p>官方提示了很多平台的安装方法，在OS X上最简单的方法就是通过brew来安装了。</p>
    <pre>
    $ brew install luajit
    </pre>

    <p>LuaJIT还有一个很不错的功能，就是FFI，有了它绑定C/C++就简单多了。</p>

<pre class="prettyprint">
local ffi = require("ffi")
ffi.cdef[[int printf(const char *fmt, ...);]]
ffi.C.printf("Hello %s!\n", "wiki")
</pre>
</section>
