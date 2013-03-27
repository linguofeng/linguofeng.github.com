---
layout: page
title: Erlang
description: http://erlang.org/
navigation: [1.安装, 2.Hello World, 3.数据类型]
update: 2013-03-20
---

<section id="1">
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
    <h4><small>1.1</small> OSX</h4>
<pre class="prettyprint">
$ brew install erlang
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、Hello World</h3>
    </div>
    <p>@vim hello.erl@</p>
<pre class="prettyprint">
-module(hello).
-export([sayHello/0]).

sayHello() -> io:fwrite("hello, world\n").
</pre>

<pre class="prettyprint">
$ erl
1> c(hello).         // 加载hello.erl文件，以(.)结束
{ok,hello}
2> hello:sayHello(). // 调用sayHello方法
hello, world
ok
3> q().              // 退出，或者ctrl+g后输入q回车
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、基本数据类型</h3>
    </div>
    <h4><small>3.1</small> Integer 整形</h4>
<pre>
1> 990.
990
2> 98 - 12.
86
3> 2#10.        // 10的二进制
2
4> 16#10.       // 10的16进制
</pre>

    <h4><small>3.2</small> Float 浮点型</h4>
<pre>
1> -1.
-1
2> -2.
-2
3> 17.368.
17.368
4> 10/2.            // 整数/相除，结果永远是浮点型
5.0
5> 10 div 2.        // 整数div相除则返回的是整数
5
6> 10 rem 3.        // 取余
1
</pre>

    <h4><small>3.3</small> Atom 原子，表示不同的非数字常量值</h4>
<pre>
1> abc.
abc
2> 'abc_123_ABC'.
abc_123_ABC
3> 'space space'.
'space space'
4> '\n \n'.
'\n \n'
5> '1234+987'.
'1234+987'
</pre>

    <h4><small>3.4</small> Boolean 布尔型</h4>
<pre>
1> 1 == 2.
false
2> 2 == 2.
true
3> is_boolean(12).       // 判断值是否是布尔类型
false
4> is_boolean(a > b).
true
</pre>
table(table table-bordered).
|_.方法|_.描述|
|@and@|参数必须都等于true时返回true，否则false</br>
<blockquote>1> true and true.
true
2> false and true.
false</blockquote>|
|@andalso@|如果第一个参数为false，则返回false，否则返回第二个参数 true andalso 'return me.'</br>
<blockquote>1> false andalso 'abc'.
false
2> true andalso 'abc'.
abc
</blockquote>|
|@or@|参数中有一个或都为true时返回true，否则false</br>
<blockquote>1> false or false.
false
2> false or true.
true
</blockquote>|
|@orelse@|如果第一个参数为true，则返回true，否则返回第二个参数 false orelse 'return me.'</br>
<blockquote>1> true orelse 'abc'.
true
2> false orelse 'abc'.
abc
</blockquote>|
|@xor@|参数中一个true一个false时才返回true，否则返回false</br>
<blockquote>1> true xor true
false
2> false xor true
true
</blockquote>|
|@not@|取反，如果为true则返回false，否则返回true</br>
<blockquote>1> not(false)
true
2> not(true)
false
</blockquote>|

    <h4><small>3.4</small> Tuple 元组</h4>
<pre class="prettyprint">
1> {123, {'a', 'b'}, 987}.
{123, {'a', 'b'}, 987}
2> tuple_size({123, {'a', 'b'}, 987}).              // 获得大小
3
3> element(2, {123, {'a', 'b'}, 987}).              // 获取第2个节点
{a,b}
4> setelement(2, {123, {'a', 'b'}, 987}, 456).      // 修改第2个节点的内容
{123, 456, 987}
</pre>

    <h4><small>3.5</small> List 数组</h4>
<pre class="prettyprint">
1> [1, 2, 3, 4, 5, 6].
[1,2,3,4,5,6]
</pre>
    <p>Lists的函数，Lists很多函数都在Lists这个模块中</p>
table(table table-bordered).
|_.函数|_.示例|
|@lists:max@|求最大值</br>
<blockquote>1> lists:max([1,2,3]).
3
</blockquote>|
|@lists:reverse@|反转</br>
<blockquote>1> lists:reverse([1,2,3]).
[3,2,1]
</blockquote>|
|@lists:sort@|排序</br>
<blockquote>1> lists:sort([2,1,3]).
[1,2,3]
</blockquote>|
|@lists:split@|拆分</br>
<blockquote>1> lists:split(2,[3,4,10,7,9]).
{[3,4],[10,9,7]}
</blockquote>|
|@lists:sum@|求和</br>
<blockquote>1> lists:sum([3,4,10,7,9]).
33
</blockquote>|
|@lists:zip@|压缩</br>
<blockquote>1> lists:zip([1,2,3],[5,6,7]).
{[1,5],[2,6],[3,7]}
</blockquote>|
|@lists:delete@|删除</br>
<blockquote>1> lists:delete(2,[1,2,3,2,4,2]).
[1,3,2,4,2]
</blockquote>|
|@lists:last@|最后一个值</br>
<blockquote>1> lists:last([1,2,3]).
3
</blockquote>|
|@lists:member@|是否包含</br>
<blockquote>1> lists:member(5,[1,24]).
false
2>lists:member(24,[1,24]).
true</blockquote>|
|@lists:nth@|获取某个值，下标从1开始</br>
<blockquote>1> lists:nth(2,[3,4,10,7,9]).
4</blockquote>|
|@length@|计算数组的长度，不是在lists模块里的</br>
<blockquote>1> length([1,2,3]).
3
</blockquote>|

<p>Lists的函数，Lists很多函数都在Lists这个模块中</p>
table(table table-bordered).
|_.方法|_.示例|
|@++@|数组相加</br>
<blockquote>1> [1,2,3] ++ [9,8,7].
[1,2,3,9,8,7]
</blockquote>|
|@--@|相减</br>
<blockquote>1> [1,2,3,4,5] -- [2,5].
[1,3,4]
</blockquote>|
|subtract|链接</br>
<blockquote>1> "hello "
"world".
"hello world"
</blockquote>|

    <h4><small>3.6</small> Character and String 字符与字符串</h4>
<pre class="prettyprint">
1> $a.                                 // 字符返回的是ASCII对应的数值
97
2> [$a].                               // erlang中没有字符串类型，而是ASCII数组来表示
"a"
3> [$h,$e,$l,$l,$o,$ ,$w,$o,$r,$l,$d]. // "hello world" 的数组
"hello world"
</pre>
</section>