---
layout: page
title: "Lua"
description: "简洁、轻量、可扩展的脚本语言"
navigation: [1.安装, 2.HelloWorld, 3.数据类型, 4.函数, 5.数据结构]
update: 2013-01-17
---

<section id="1">
    <div class="page-header">
        <h3>一、Lua安装及常用库的安装</h3>
    </div>
    <h4><small>1.1</small> Ubuntu</h4>
<pre class="prettyprint">
$ sudo apt-get install lua5.2
</pre>
    <h4><small>1.2</small> OS X</h4>
<pre class="prettyprint">
$ brew install lua luarocks                 # luarocks是lua的模块管理工具
$ sudo ln -s /usr/bin/make /usr/bin/gmake   # 解决 sh: gmake: command not found
</pre>

    <h4><small>1.3</small> luasocket库的安装</h4>
<pre class="prettyprint">
$ luarocks install luasocket
$ lua
> socket = require("socket")
> print(socket._VERSION)
LuaSocket 2.0.2
</pre>

    <h4><small>1.4</small> lua-cjson库的安装</h4>
<pre class="prettyprint">
$ luarocks install lua-cjson
$ lua
> cjson = require("cjson")
> print(cjson.encode({ name = "linguofeng" }))
{"name":"linguofeng"}
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、HelloWorld</h3>
    </div>
<pre class="prettyprint">
$ lua
> print("Hello World!!")
</pre>
<pre>
Hello World!!
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、数据类型 <small>有8种基本数据类型</small></h3>
    </div>

table(table table-bordered).
|_.类型|_.说明|
|nil|全局变量默认值，如果要删除一个全局变量可以赋值为nil|
|boolean|布尔值|
|number|数字型|
|string|字符串型|
|userdata|用户自定义类型，一般是C/C++中的类型|
|function|函数|
|thread|线程|
|table|表|

<pre class="prettyprint">
print(type(nil))                    -- 输出 nil
print(type(99.7+12*9))              -- 输出 number
print(type(true))                   -- 输出 boolean
print(type("Hello Wikipedia"))      -- 输出 string
print(type(print))                  -- 输出 function
print(type{1, 2, test = "test"})    -- 输出 table
</pre>
</section>

<section id="4">
    <div class="page-header">
        <h3>四、函数 <small>第一类值</small></h3>
    </div>
    <p><b>第一类值指</b>：在Lua中函数和其他值（数值、字符串）一样，函数可以被存放在变量中，也可以存放在表中，可以作为函数的参数，还可以作为函数的返回值。</p>
<pre class="prettyprint">
function add(x, y)             -- 定义一个函数add，并接收两个参数
    local a = x + y            -- 定义一个局部变量a，接收x+y的和，局部变量仅在函数add中有效
    return a                   -- 返回
end                            -- 结束add函数

print("15 + 64 = " .. add(15, 64));    -- 打印add(15, 64)的结果

local x = 1                    -- local 关键字表示该变量为局部变量，作用域为当前上下文
                               -- 无该关键字修饰时为全局变量，作用于整个Lua状态机

local add = function(x, y)     -- 局部函数，作用于当前脚本（chumk）
Lib = {}
Lib.add = function(x, y)       -- 表函数，作用于Lib表
</pre>

    <h4>函数闭包</h4>
    <p>闭包是一个内部函数以及它的upvalues，内部函数使用了外部（父函数）局部变量。</p>
<pre class="prettyprint">
function newCounter()
    local i = 0           -- i为匿名函数的外部局部变量（upvalue）
    return function()     -- 匿名内部函数
        i = i + 1         -- 使用了i，所以该匿名函数是一个闭包
        return i
    end
end

c1 = newCounter()         -- 得到一个匿名函数的变量（闭包）
print(c1())               -- 调用匿名函数，打印出1
print(c1())               -- 调用匿名函数，打印出2

c2 = newCounter()
print(c2())  --> 1
print(c1())  --> 3
print(c2())  --> 2
</pre>
</section>

<section id="5">
    <div class="page-header">
        <h3>五、控制语句</h3>
    </div>
<pre class="prettyprint">
for int i = 0, 10, 2 do     -- for循环，2表示步长，省略时为1
    print("i = " .. i)      -- .. 表示字符串连接符
end                         -- 结束for

if a > b then               -- if条件判断语句
    print("a > b")
else
    print("b > a")
end

while a > b do              -- while循环
    print("")
end

repeat                      -- repeat-until循环
    print("")
until a > b
</pre>
</section>

<section id="6">
    <div class="page-header">
        <h3>六、逻辑运算符 <small>and、or、not</small></h3>
    </div>
    <p>逻辑运算符认为false和nil是假（false），其他为真，0也是true.</p>
<pre class="prettyprint">
a and b       -- 如果a为false，则返回a，否则返回b
a or  b       -- 如果a为true，则返回a，否则返回b

x = x or v    -- 如果x为false或者nil时则给x赋初始值v
-- 等价于
if not x then
    x = v
end

-- 三元运算符
a ? b : c   =>   a and b or c   -- and 的优先级别比 or 高

not                 -- not 的结果只返回false或true，作用类似于"非" "!"取反的意思
print(not nil)      -- true
print(not false)    -- true
print(not 0)        -- false
</pre>
</section>

<section id="7">
    <div class="page-header">
        <h3>七、协同程序 <small>coroutine</small></h3>
    </div>
    <h4><small>7.1</small> 创建协同</h4>
<pre class="prettyprint">
co = coroutine.create(function ()   -- 创建一个协同函数，接收一个匿名函数，返回thread类型
    print("hi")
end)

print(co)                           -- thread: 0x7fe1834127d0
</pre>

    <h4><small>7.2</small> 协同的三个状态:挂起态（suspended）、运行态（running）、停止态（dead）。</h4>
<pre class="prettyprint">
print(coroutine.status(co))         -- 查看协同的状态，默认状态是挂起态 suspended

coroutine.resume(co)                -- 改变协同的状态为运行太 hi

print(coroutine.status(co))         -- 协同运行完以后将变量停止态 dead
</pre>

    <h4><small>7.3</small> 如此挂起正在运行的协同</h4>
<pre class="prettyprint">
co = coroutine.create(function ()
    print("hi")
    coroutine.yield()               -- 协同运行到此状态将变成挂起
    print("你好")
end)

coroutine.resume(co)                -- hi
coroutine.resume(co)                -- 你好
coroutine.resume(co)                -- false，协同结束后将不能再使用
</pre>

    <h4><small>7.4</small> 协同数据交换</h4>
<pre class="prettyprint">
co = coroutine.create(function (x, y)   -- 接收两个参数
    print("hi", coroutine.yield(x + y)) -- 返回一个值，同时参数也传递给了coroutine.yield
    return 100                          -- 第三种返回值的方式
end)

print(coroutine.resume(co, 12, 87))     -- 传递两个参数并接收返回值(true, 99)

-- 执行coroutine.yield(x + y)之前协同被挂起，但值被返回，因此print函数未被执行，下面执行

print(coroutine.resume(co, 12, 87))     -- 传递两个参数并接收返回值(true, 100)
</pre>
</section>

<section id="8">
    <div class="page-header">
        <h3>八、数据结构 <small>table</small></h3>
    </div>
    <h4><small>8.1</small> 表的创建</h4>
<pre class="prettyprint">
arrays = {}                         -- 创建一个空表
arrays[1] = "abc"                   -- 第一个索引值为1
arrays[2] = 123

arrays["key"] = "value"             -- map

for key, value in pairs(arrays) do  -- 迭代table
    print(key .. " = " .. value)
end
</pre>
    <h4><small>8.2</small> 表的增删改查</h4>
<pre class="prettyprint">
list = {123}            -- 初始化表
list[2] = "abc"         -- 增
list.x = 123
list.y = 987
list[1] = nil           -- 删
list.y = nil
list[2] = 456           -- 改
list.x = 987
print(list[2])          -- 查
print(list.x)
print(list['x'])
</pre>
    <h4><small>8.3</small> 数组</h4>
<pre class="prettyprint">
list = {}               -- 初始空化数组，数组的下标是整数，遵循Lua的标准，下标从1开始
list[1] = "abc"
list[2] = "edg"
list[3] = "hij"
</pre>
    <h4><small>8.4</small> 矩阵（二维数组）</h4>
<pre class="prettyprint">
mt = {}                 -- 创建矩阵matrix
for i = 1, N do         -- 创建N行
    mt[i] = {}          -- 每行都是一个数组（table元素）
    for j = 1, M do     -- 创建M列
        mt[i][j] = "a"  -- 第N行第M行的值
    end
end
</pre>
    <h4><small>8.5</small> 链表</h4>
    <p><img class="thumbnail"  alt="Singly-linked-list.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/816px-Singly-linked-list.svg.png" width="408" height="41" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/612px-Singly-linked-list.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/816px-Singly-linked-list.svg.png 2x"></p>
<pre class="prettyprint">
list = nil
list = {next = list, value = "hello3"}
list = {next = list, value = "hello2"}
list = {next = list, value = "hello1"}

-- 遍历
local l = list
while l do
    print(l.value)
    l = l.next
end
</pre>
</section>

<section id="9">
    <div class="page-header">
        <h3>九、metatable 元表</h3>
    </div>
    <h4><small>9.1</small> 元表与元方法</h4>
    <p>元表也是普通表</p>
<pre class="prettyprint">
t = {}
print(getmetatable(t))      -- 获取表的metatable nil，默认不带

mt = {}
setmetatable(t, mt)         -- 设置一个元素

-- metamethod 元表的方法（元方法）
mt.__add                    -- 加 +
mt.__sub                    -- 减 -
mt.__mul                    -- 乘 *
mt.__div                    -- 除 /
mt.__unm                    -- 负 -
mt.__pow                    -- 幂 ^
mt.__concat                 -- 连接

mt.__eq                     -- 等于 =
mt.__lt                     -- 小于 <
mt.__le                     -- 大于 >

mt.__tostring               -- print调用
mt.__metatable              -- 设置该元表不被修改与访问

mt.__index                  -- 当访问不存在的元素时会去查询，相当于子类继承父类一样
mt.__newindex               -- 更新表，如果增加一个不存在的元素，会去查询，有直接用，否则增加
</pre>

    <h4><small>9.2</small> 表的代理</h4>
    <p>记录下表的增查记录</p>
<pre class="prettyprint">
local index = {}                  -- 私有的key，用来记录原始表在代理表中的下标
local mt = {                      -- 创建元表
    __index = function(t, k)
        print("访问了" .. tostring(k) .. "元素")
        return t[index][k]        -- 从代理表中获取原始表中k下标的数据
    end,

    __newindex = function(t, k, v)
        print("更新了 " .. tostring(k) .. " 元素的值为 " .. tostring(v))
        t[index][k] = v           -- 更新代理表中下标为index的原始表中的元素
    end
}

function setProxy(t)
    local proxy = {}              -- 创建代理表
    proxy[index] = t              -- 把原始表加到代理表的index下标中
    setmetatable(proxy, mt)       -- 设置代理表的元表
    return proxy                  -- 返回代理表，即所有操作都是直接操作代理表
end

p = setProxy({})

p[2] = 'abcdefg'            -- 更新了 2 元素的值为 abcdefg
print(p[2])                 -- 访问了2元素
</pre>
</section>

<section id="10">
    <div class="page-header">
        <h3>十、环境</h3>
    </div>
    <h4><small>10.1</small> 全局变量 _G</h4>
<pre class="prettyprint">
> _G["ewgegw"] = "ddddddgege"
> table.foreach(_G, print)
string  table: 0x7ffce3407a60
xpcall  function: 0x7ffce3404780
package table: 0x7ffce3405780
tostring    function: 0x7ffce3405020
print   function: 0x7ffce3405160
os  table: 0x7ffce34073e0
unpack  function: 0x7ffce34050d0
ewgegw  ddddddgege                          -- 上面添加的全局变量
require function: 0x7ffce3405e70
getfenv function: 0x7ffce3404db0
setmetatable    function: 0x7ffce3404f60
next    function: 0x7ffce3404d20
assert  function: 0x7ffce3404a80
tonumber    function: 0x7ffce3404fc0
io  table: 0x7ffce3406bd0
rawequal    function: 0x7ffce34051b0
collectgarbage  function: 0x7ffce3404ad0
getmetatable    function: 0x7ffce3404e00
module  function: 0x7ffce3405e20
rawset  function: 0x7ffce3405260
math    table: 0x7ffce3408290
debug   table: 0x7ffce3408c50
pcall   function: 0x7ffce3404d70
table   table: 0x7ffce3405f10
newproxy    function: 0x7ffce34052e0
type    function: 0x7ffce3405080
coroutine   table: 0x7ffce3405380            -- 对应的是协同的表
_G  table: 0x7ffce3404110
select  function: 0x7ffce3404ec0
gcinfo  function: 0x7ffce3404150
pairs   function: 0x7ffce34048c0
rawget  function: 0x7ffce3405210
loadstring  function: 0x7ffce3404cc0
ipairs  function: 0x7ffce3404830
_VERSION    Lua 5.1
dofile  function: 0x7ffce3404bd0
setfenv function: 0x7ffce3404f10
load    function: 0x7ffce3404c70
error   function: 0x7ffce3404c20
loadfile    function: 0x7ffce3404e60

> table.foreach(_G.os, print)
</pre>
    <h4><small>10.2</small> 非全局变量 setfenv</h4>
<pre class="prettyprint">
--pack.lua---------------------------------------------------------------------
local P = {}

-- 改变P表的__index,这里的_G代表全局环境
setmetatable(P, {__index = _G})

-- 改变当前的环境为P,setfenv前的所有定义都是在全局环境中进行的，后面的则都是在新环境中进行的，互不影响
setfenv(1, P)

-- 声明的add函数在环境P中，如果要在外部访问必须P.add
function add(x, y)
    print(x .. ' + ' .. y .. ' = ' .. (x + y))
    -- 由于当前新的环境中没有print函数，但是__index指向的是全局环境，所以print是全局的函数
end

return P

--pack1.lua--------------------------------------------------------------------
local P = {}

-- 如果需要改变环境后使用全局环境的方法需要记住，这种方法比上面的要快
local print = print

-- 改变当前的环境为P
setfenv(1, P)

-- 声明的add函数在环境P中，如果要在外部访问必须P.add
function add(x, y)
    print(x .. ' + ' .. y .. ' = ' .. (x + y))
end

-- 私有方法
local function div(x, y)
end

return P

--main.lua---------------------------------------------------------------------
local p = require 'pack'

p.add(12, 34)

local p1 = require 'pack1'

p1.add(43, 19)
</pre>
</section>

<section id="11">
    <div class="page-header">
        <h3>十一、包 package</h3>
    </div>
    <h5><small>11.1</small> 包的定义</h5>
<pre class="prettyprint">
-- student.lua
student = {}

function student.sayHi()
    print('Hello')
end

return student

-- 使用
student = require("student")
student.sayHi()                 -- Hello
</pre>
    <h5><small>11.2</small> 私有函数</h5>
<pre class="prettyprint">
local function _add(x, y)       -- 私有局部函数
    return x + y
end

utils = {                       -- utils包
    add = _add                  -- 对外公开的函数
}

return utils
</pre>
</section>

<section id="12">
    <div class="page-header">
        <h3>十二、面向对象</h3>
    </div>
    <h4><small>12.1</small> 类与继承</h4>
<pre class="prettyprint">
--Person.lua
local Person = {name = ''}

function Person:getName()
    return self.name
end

function Person:setName(name)
    self.name = name
end

function Person:new(object)
    object = object or {}
    setmetatable(object, {__index = self}) -- 元表 类似继承的意思
    return object
end

return Person

--main.lua
-- 类
local Person = require 'Person'

-- 对象
local student = Person:new({age = 23})
student:setName('Tom')

print('name: ' .. student:getName() .. ' age: ' .. student.age)
</pre>
    <h4><small>12.2</small> 多重继承</h4>
    <p>实际就是记住所有父类，然后访问不存在的元素的时候去查询哪个父类中有，有就执行</p>
<pre class="prettyprint">
local function search (k, plist)
    for i=1, table.getn(plist) do
       local v = plist[i][k]    -- 去所有父类中获取
       if v then return v end
    end
end

function Person:new(...)
    local o = {}

    setmetatable(o, {__index = function (t, k)
        local v = search(k, arg)
        t[k] = v      -- save for next access
        return v
    end})

    return o
end
</pre>
    <h4><small>12.3</small> 私有性</h4>
<pre class="prettyprint">
local function createAccount(_name) -- 工厂方法
    local self = {name = _name}

    local function _setName(name)
        self.name = name
    end

    local function _getName()
        return self.name
    end

    -- 公有方法表
    local public = {
        setName = _setName,
        getName = _getName,
        --name = self.name -- 不公开私有成员变量
    }

    return public
end

local account = createAccount('Tom')
print(account.name) -- 无法访问，因为没有公开
</pre>
</section>

<section id="13">
    <div class="page-header">
        <h3>十三、weak table</h3>
    </div>
<pre class="prettyprint">
t = {name = 'table'}              -- 创建一个普通表
setmatetable(t, {__made = 'k'})   -- k表示t表中的keys是weak的，v表示t表中的values是weak的

k = {}              -- 创建一个空表，此时{}被k引用，引用值为1
t[k] = 1            -- 把空表作为key，由于t表的key是weak的，所以k值的引用如果为0则会被gc回收，如
k = {}              -- 把k指向另一个新的{}，则旧的{}引用值减1变成0了，目前t[k] = 1还有效
t[k] = 2            -- 把新的{}作为key，值是2

collectgarbage()    -- 调用gc，清除引用为0的内存空间，此时，第一个{}的引用是0，会被gc掉，所以第一个t[k]以及值会被删除

for k, v in pairs(a) do print(v) end
    -- 此时应该只剩下2了，因为第2个k = {}时改变了k指向新的{}，而旧的{}引用会变成0，被gc掉

-------------------------------------------------------------------------

a = {};
setmetatable(a, {__mode = 'v'}); -- values为weak，当值的引用为0时，删除
v1 = {name = 'v1'}
v2 = {name = 'v2'}

a[1] = v1
a[2] = v2

v1 = v2

collectgarbage();   -- 调用GC，清掉weak表中没有引用的内存

for k, v in pairs(a) do print(v.name) end
    -- 输出v2，因为v1重新指向{name = 'v2'}，则{name = 'v1'}引用减1为0

-------------------------------------------------------------------------

a = {};
setmetatable(a, {__mode = 'kv'}); -- 同时检查kv，是上面两种情况的组合
v1 = {name = 'v1'}
v2 = {name = 'v2'}

v = {}
k = {}

a[1] = v
v = {}              -- value重新引用新值，旧值被gc，如果旧值在table则对应的记录被清空
a[2] = v

a[k] = 1
k = {}              -- key重新引用新值，旧值被gc，如果旧值在table则对应的记录被清空
a[k] = 2


collectgarbage();   -- 调用GC，清掉weak表中没有引用的内存

for k, v in pairs(a) do
    print(v)
end

</pre>
</section>

<section id="14">
    <div class="page-header">
        <h3>十四、标准库</h3>
    </div>
    <h4><small>14.1</small> 数学库 Mathematical Functions</h4>

table(table table-bordered).
|_.函数|_.说明|
|math.abs (x)|求绝对值|
|math.acos (x)|求反余弦|
|math.asin (x)||
|math.atan (x)||
|math.atan2 (y, x)||
|math.ceil (x)||
|math.cos (x)||
|math.cosh (x)||
|math.deg (x)||
|math.exp (x)||
|math.floor (x)||

    <h4><small>14.2</small> table库</h4>

table(table table-bordered).
|_.函数|_.说明|
|table.concat (table [, sep [, i [, j]]])|拼接成字符串，sep代表连接符，i开始位置，j结束位置|
|table.insert (table, [pos,] value)|插入一个元素，默认是最后一个，pos指定位置|
|table.maxn (table)|获取最大长度|
|table.remove (table [, pos])|删除一个元素，默认删除最后一个，pos指定位置|
|table.sort (table [, comp])|排序|

<pre class="prettyprint">
tables = {1, 2, 3, 4, 5, 6, 7}
print(#tables)      -- 5.1开始使用#获取长度    -- 7

table.insert(tables, 8)
print(table.concat(tables))                 -- 12345678
table.insert(tables, 1, 0)
print(table.concat(tables))                 -- 012345678


print(table.maxn(tables))                   -- 9

table.remove(tables)
print(table.concat(tables))                 -- 01234567

table.remove(tables, 5)

print(table.concat(tables))                 -- 0123567
print(table.concat(tables, ','))            -- 0,1,2,3,5,6,7
print(table.concat(tables, '-', 2))         -- 1-2-3-5-6-7
print(table.concat(tables, '=', 1, 4))      -- 0=1=2=3

table.sort(tables)
print(table.concat(tables))                 -- 0123567

table.sort(tables, function(t1, t2)
    if t1 > t2 then
        return true
    else
        return false
    end
end)
print(table.concat(tables))                 -- 7653210
</pre>

    <h4><small>14.3</small> string库</h4>

table(table table-bordered).
|_.函数|_.说明|
|string.byte (s [, i [, j]])|把字符转换成ASCII码|
|string.char (...)|把ASCII码转换成字符|
|string.dump (function)||
|string.find (s, pattern [, init [, plain]])|查找，pattern查找的字符串，init从那里开始默认为1，plain|
|string.format (formatstring, ...)|格式化字符串|

    <h4><small>14.4</small> io库</h4>

table(table table-bordered).
|_.函数|_.说明|
|io.close ([file])|等效file:close()，如果没有file则关闭默认输出|
|io.flush ()|等效file:flush()|
|io.input ([file])||
|io.lines ([filename])|等效io.input():lines()|
|io.open (filename [, mode])|打开一个文件，模式：r,w,a,r+,w+,a+|
|io.output ([file])||
|io.popen (prog [, mode])|依赖系统的，不是所有平台都能用|
|io.read (...)|等效io.input():read|
|io.tmpfile ()|创建一个临时文件，当程序退出时自动删除|
|io.type (obj)|判断obj的类型，如果返回file是一个打开的文件句柄，返回close file是一个
关闭的文件句柄，nil不是文件|
|io.write (...)|等效io.output():write|
|file:close ()|关闭文件，会自动gc掉，但时间不确定|
|file:flush ()|保存任何数据到文件中|
|file:lines ()|迭代文件的每一行|
|file:read (...)|读取文件，==*n,*a,*l,number==|
|file:seek ([whence] [, offset])|指定位置，默认是cur,1，set,end|
|file:setvbuf (mode [, size])|设置buff缓存，no,full,line|
|file:write (...)|写文件，参数必须是string或者number|

<pre class="prettyprint">
local file = io.open('tabletest.lua', 'r')
print(io.type(file))

for line in file:lines() do
    --print(line)
end

--file:close()
io.close(file)
print(io.type(file))

------------------------------------------------------

for line in io.input('tabletest.lua'):lines() do
    print(line)
end

for line in io.lines('tabletest.lua') do
    --print(line)
end
</pre>

    <h4><small>14.5</small> os库</h4>

table(table table-bordered).
|_.函数|_.说明|
|os.clock ()|返回程序所使用的cpu时间|
|os.date ([format [, time]])|当前系统日期，或格式化某个日期|
|os.difftime (t2, t1)|时间差|
|os.execute ([command])|执行shell命令|
|os.exit ([code])|调用C的exit函数|
|os.getenv (varname)|获取系统环境变量，变量名，不包含$|
|os.remove (filename)|删除文件，文件名|
|os.rename (oldname, newname)|修改文件名|
|os.setlocale (locale [, category])|设置地区，"all", "collate", "ctype", "monetary", "numeric", or "time"|
|os.time ([table])|返回当前时间或把时间保存在table中，|
|os.tmpname ()|临时文件名|

<pre class="prttyprint">
table.foreach(os, print)

print(os.clock())

print(os.date())

print(os.date('%Y-%m-%d %H:%M'))

print(os.time())

print(os.difftime(1364957757, os.time()))

print(os.getenv ('PATH'))

print(os.tmpname ())
</pre>

    <h4><small>14.6</small> debug库</h4>
table(table table-bordered).
|_.函数|_.说明|

</section>

<section id="15">
    <div class="page-header">
        <h3>十五、标准库</h3>
    </div>
    <h4><small>15.1</small> 堆栈，后进先出原则</h4>
    <p>@压入@</p>
table(table table-bordered).
|_.函数|_.说明(栈底最后一个元素的索引是1,栈顶第一个元素是-1)|
|lua_pushnil(lua_State*)|压入一个空值|
|lua_pushboolean(lua_State*, int)|压入一个布尔值|
|lua_pushcclosure(lua_State*, lua_CFunction, int)|压入一个C闭包?|
|lua_pushcfunction(lua_State*, lua_CFunction)|压入一个C函数，由lua_pushcclosure(L, f, 0)宏定义出来|
|lua_pushlightuserdata(lua_State*, void*)|压入一个指针，不被gc管理|
|lua_pushinteger(lua_State*, lua_Integer)|压入一个数字|
|lua_pushnumber(lua_State*, lua_Number)|压入数字|
|lua_pushstring(lua_State*, const char*)|压入字符串|
|lua_pushfstring(lua_State*, const char*, ...)|压入一个格式化的string|
|lua_pushvfstring(lua_State*, const char*, va_list)|同上，只是接收一个va_list|
|lua_pushlstring(lua_State*, const char*, size_t);|压入长字符串|
|lua_pushliteral(lua_State*, const char*)|压入文字|
|lua_pushthread(lua_State*)|压入一个线程?|

    <p>@判断类型@</p>
table(table table-bordered).
|_.函数|_.说明|
|lua_isboolean(lua_State*, int)|是否是布尔类型|
|lua_iscfunction(lua_State*, int)|是否是C函数类型|
|lua_isfunction(lua_State*, int)|是否是C函数或者Lua函数|
|lua_islightuserdata(lua_State*, int)|是否是用户自定义类型指针|
|lua_isnil(lua_State*, int)|是否是空|
|lua_isnone(lua_State*, int)|是否是有效的|
|lua_isnoneornil(lua_State*, int)|是否是上面两者|
|lua_isnumber(lua_State*, int)|是否是数字|
|lua_isstring(lua_State*, int)|是否是字符串|
|lua_istable(lua_State*, int)|是否是table|
|lua_isthread(lua_State*, int)|是否是线程|
|lua_isuserdata(lua_State*, int)|是否是用户类型，包括full和light|
|lua_type(lua_State*, int)|返回元素的类型，对应LUA_TNIL等枚举|
|lua_typename(lua_State*, int)|返回元素的类型名称|

    <p>@获取栈中的元素并转换成C类型@</p>
table(table table-bordered).
|_.函数|_.说明|_.返回值类型|
|lua_toboolean(lua_State*, int)|把元素转换成C的布尔类型的值|int|
|lua_tocfunction(lua_State*, int)|把元素转换成C的函数|lua_CFunction|
|lua_tointeger (lua_State*, int)||lua_Integer|
|lua_tolstring (lua_State*, int, size_t *len)||const char*|
|lua_tonumber (lua_State*, int)||lua_Number|
|lua_topointer (lua_State*, int)||const void*|
|lua_tostring (lua_State*, int)||const char*|
|lua_tothread (lua_State*, int)||lua_State|
|lua_touserdata (lua_State*, int)||void*|

    <p>@栈内元素的操作@</p>
table(table table-bordered).
|_.函数|_.说明||
|lua_gettop(lua_State*)|返回栈的元素个数，同时也是栈顶元素的索引|
|lua_settop(lua_State*, int)|设置某个元素为栈顶元素，该元素之上的元素会被清除|
|lua_pushvalue(lua_State*, int)|压入（拷贝）一个已经存在栈的元素至栈顶|
|lua_insert(lua_State*, int)|移动栈顶元素至某个位置|
|lua_remove(lua_State*, int)|删除栈中某个元素|
|lua_replace(lua_State*, int)|替换栈顶元素至某个位置，相应那个位置的元素至栈顶|

</section>


<p>参考：http://book.luaer.cn</p>
<p>参考：http://www.lua.org/manual/5.1/manual.html</p>
