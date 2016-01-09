---
layout: page
title: "Go"
description: "http://golang.org/"
navigation: [1.安装, 2.Hello World, 3.开发环境配置, 4.基础知识, 5.流程与函数]
update: 2013-01-12
---

<section id="1">
  <div class="page-header">
    <h3>一、安装</h3>
  </div>
  <h4><small>1.1</small> -Ubuntu-</h4>
<p>下载地址： "https://code.google.com/p/go/downloads/list":https://code.google.com/p/go/downloads/list</p>
<pre>
$ sudo tar -C /usr/local -xzf go1.0.3.linux-386.tar.gz
$ mkdir $HOME/workspace/gocode
$ mkdir $HOME/workspace/gocode/src    # 源文件存放目录
$ mkdir $HOME/workspace/gocode/pkg    # 编译后的包（.a库）文件存放目录
$ mkdir $HOME/workspace/gocode/bin    # 编译后的可执行文件存放目录
</pre>
<p>@$ subl ~/.bashrc@ 环境变量配置</p>
<pre>
export GOPATH="$HOME/workspace/gocode"            # 工作目录
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin   # go安装目录，编译后生成的可执行文件目录
</pre>

    <h4><small>1.2</small> -OS X-</h4>
<pre>
$ brew install go
$ mkdir -p $HOME/work/golang/{bin,pkg,src}
$ vim $HOME/.zshrc
</pre>
<pre>
export GOPATH="$HOME/work/golang"
export PATH=$PATH:$GOPATH/bin
</pre>

    <h4><small>1.3</small> 安装Go中文指南</h4>
<pre>
$ go get bitbucket.org/mikespook/go-tour-zh/gotour
$ gotour
</pre>

    <h4><small>1.4</small> 通过gvm来进行安装与多版本共享管理</h4>
<pre>
$ bash < <(curl -s https://raw.github.com/moovweb/gvm/master/binscripts/gvm-installer)
$ vim .zshrc
    [[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"
$ gvm install go1.0.3
$ gvm use go1.0.3 [--default]
$ echo $GOROOT
$ echo $GOPATH
</pre>
    <p>Gvm官网: @https://github.com/moovweb/gvm@</p>

    <h4><small>1.5</small> 安装gocode结合vim开发IDE</h4>
<pre>
$ go get -u github.com/nsf/gocode
</pre>
    <p>Gocode官网: @https://github.com/nsf/gocode@</p>

    <h4><small>1.6</small> 配置zsh自动完成提示</h4>
<pre>
$ mkdir -p ~/.oh-my-zsh/custom/plugins/go/
$ cp $GOROOT/misc/zsh/go ~/.oh-my-zsh/custom/plugins/go/go.plugin.zsh
</pre>
</section>

<section id="2">
  <div class="page-header">
    <h1>二、Hello World</h1>
  </div>
<pre>
$ mkdir $GOPATH/src/helloworld            # 创建helloworld工程目录
$ subl $GOPATH/src/helloworld/hello.go    # 创建helloworld工程的源文件
</pre>
<pre>
package main

import (
    "fmt"
)

func main() {
    fmt.Println("Hello, 世界")
}
</pre>
<pre>
$ go install helloworld     # 编译安装helloworld工程
$ helloworld                # 运行helloworld工程
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h1>三、基础知识</h1>
    </div>

    <h3><small>3.1</small> 变量的定义</h3>
<pre>
var a int = 12          // 定义一个类型为int的变量a并初始化值为12
var b int               // 定义一个类型为int的变量b默认初始化为0
var c = 15              // 定义一个变量c并初始化值为13,类型自动推导
var d, e int = 12, 16   // 变量d，e的类型都是int
var d, e = 19, "abc"    // 同时定义多个变量，并根据值来推导类型
var(                    // 与上面定义变量的方式一样
    d = 19
    e = "abc"
)
f := 16                 // 使用“:=”可以更简洁地定义变量，但不能在函数外使用这种方法定义变量
_, g := 12, 16          // “_”是一个特殊的变量名，赋予它的值都会被丢弃，变量e的值是16
                        // 注意事项：定义的变量未使用编译过程会报错
</pre>
    <p>关键字: @var@ 与 @:=@</p>

    <h3><small>3.2</small> 常量的定义 <small>只能是数字、字符串或布尔值</small></h3>
<pre>
const Pi = 3.1415926
</pre>
    <p>关键字: @const@</p>

    <h3><small>3.3</small> 基本数据类型</h3>
<pre>
bool                                            // 布尔值
string                                          // 字符串，不可变
int  int8  int16  int32  int64                  // 带符号整形
uint uint8 uint16 uint32 uint64 uintptr         // 不带符号整形
byte                                            // uint8 的别名
rune                                            // int32 的别名，代表一个Unicode码点，可以遍历字符串每个字符
float32 float64                                 // 浮点数，默认是float64
complex64 complex128                            // 复数
error                                           // 错误类型
</pre>

    <h3><small>3.4</small> iota枚举</h3>
<pre>
const(
    x = iota  // x == 0
    y = iota  // y == 1
    z = iota  // z == 2
    w  // 常量声明省略值时，默认和之前一个值的字面相同。这里隐式地说w = iota，因此w == 3。其实上面y和z可同样不用"= iota"
)

const v = iota // 每遇到一个const关键字，iota就会重置，此时v == 0
</pre>

    <h3><small>3.5</small> 数组</h3>
<pre>
var a1 [5]int          // 声明了一个长度为5的int数组
a := [3]int{1, 2, 3}   // 声明了一个长度为3的int数组
b := [10]int{1, 2, 3}  // 声明了一个长度为10的int数组，其中前三个元素初始化为1、2、3，其它默认为0
c := [...]int{4, 5, 6} // 可以省略长度而采用`...`的方式，Go会自动根据元素个数来计算长度

// 声明了一个二维数组，该数组以两个数组作为元素，其中每个数组中又有4个int类型的元素
doubleArray := [2][4]int{[4]int{1, 2, 3, 4}, [4]int{5, 6, 7, 8}}
// 如果内部的元素和外部的一样，那么上面的声明可以简化，直接忽略内部的类型
easyArray := [2][4]int{ {1, 2, 3, 4}, {5, 6, 7, 8} }
</pre>

    <h3><small>3.6</small> slice，指向数组的值</h3>
<pre>
p := []int{1, 2, 3, 4, 5}   // 与声明数组一样，只是少了长度

// slice的应用
var ar = [10]byte {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'}
var a, b []byte

a = ar[0:1]     // a = ['a']
a = ar[2:6]     // a = ['c', 'd', 'e', 'f']
b = ar[:4]      // b = ['a', 'b', 'c', 'd']
b = ar[:]       // b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
</pre>
    <p>数组与slice的区别，数组声明时需要长度并大小不可变，slice声明时不需要长度，大小可变，是一个指针，是指向数组的值的指针</p>
    <p>slice的长度: @len(ar)@</p>
    <p>slice的容量: @cap(ar)@</p>
    <p>slice追加: @append(a, 'h')@</p>

    <h3><small>3.7</small> map</h3>
<pre>
var a map[string] int
map["a"] = 1
map["b"] = 2

b := map[string] int {"a":1, "b":2, "c":3}
value, ok = b["a"]   // 如果a存在，则ok为true，否则为false
if (ok)
{
    // value = 1
}
else
{
    // value = 0
}

len(a)          // 返回a拥用key的个数，输出2
delete(a, "a")  // 从a中删除key为a的记录
</pre>

    <h3><small>3.8</small> make与new内存分配</h3>
    <p>make是给map、slice 和channel分配内存的</p>
    <p>new是给各种类型分配内存的</p>
<pre>
a := make([]int, 5)     // 分配一个长度为5，容量为5的int类型的数组，默认值为[0, 0, 0, 0, 0]
b := make([]int, 2, 5)  // 分配一个长度为2,容量为5的int类型的数组，默认值为[0, 0]

c := make(map[int]string)
</pre>

    <h3><small>3.9</small> range</h3>
<pre>
// for 循环的 range 格式可以对 slice 或者 map 进行迭代循环
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {                                 // i表示为下标，v表示为值
    fmt.Printf("2**%d = %d\n", i, v)
}

for _, v := range pow {                                 // 省略下标，v表示为值
    fmt.Printf("%d\n", v)
}

for i := range pow {                                    // 省略值
    fmt.Printf("%d\n", i)
}
</pre>
</section>

<section id="4">
    <div class="page-header">
        <h1>四、流程和函数</h1>
    </div>

    <h3><small>4.1</small> 流程控制</h3>
    <p>@if@</p>
<pre>
if a > 10 {         // 不需要“()”
    // true
} else {
    // false
}

// 条件中存在变量，作用域在if范围内
if i := getVaule(); i > 10 {
    // true
} else {
    // false
}
</pre>
    <p>@for@</p>
<pre>
for i := 0; i < 10; i++ {       // 不需要“()”

}

a := 0
for ;a < 10; {                  // 省略前置和后置
    a++
}

for a < 10 {                    // 可以省略“;”分号

}

for ;; {                        // 死循环

}

for {                           // 死循环

}
</pre>
    <p>@switch@</p>
<pre>
switch i {                      // 同时i也支持i := getVaule()这种形式
case 1:
    // 匹配成功后会自动终止，不需要break
case 2:
    //
case 5, 10, 15, 20:
    // 使用“,”表示"or"，i等于这些值时会执行
defaule:
    //
}

switch i := getVaule(); i {     // 局部变量
    //
}

switch {                        // 没有条件，为true，会从上往下匹配
case a > 10:
    //
case a < 10:
    //
case a == 5: fallthrough
case a == 6:
    // 当a等于5或6时会执行这里，必须使用fallthrough才会继续向下匹配
}
</pre>

    <h3><small>4.2</small> 函数</h3>
<pre>
func add(x int, y int) int {        // 接收两个int类型的参数，返回值是int类型
    return x + y
}

func add(x, y int) int {            // 同上，当参数类型相同时可省略前面参数的类型声明
    return x + y
}

func get()(string, string) {        // 函数可以返回任意数量的返回值
    return "a", "b"
}

func result()(a, b string) {        // 把a,b变量当作返回值返回
    a := "abc"
    b := "def"
    return
}

func do(args ...int) {              // 接收不定数量的int类型的参数，args是一个slice
    for i := 0; i < len(args); i++ {
        args[i]
    }
}

func br(a *int) {                   // 指针传递，参数应该使用“&”取地址符

}

func la(a int) {
    ...
    defer a := 0                    // a := 0会在la函数结束时执行，类似于try中的finally
}

a := func(b int) int {              // 有点类似于javascript中的函数定义
    return b + 10
}
a(12)
</pre>

    <h3><small>4.3</small> type</h3>
    <p>函数也可以作为变量或类型使用</p>
<pre>
type a func(b int) int              // 声明一个函数类型

func a1(b int) int {                // 函数类型的一个实现1

}

a2 := func(b int) int {             // 函数类型的一个实现2

}

func c(x int, y a) {                // 声明一个接收两个参数的函数，第二个参数是函数类型
    y(x)                            // 调用函数类型y处理x参数
}

c(10, a1)                           // 使用示例1
c(15, a2)                           // 使用示例2
</pre>

    <h3><small>4.4</small> 闭包</h3>
<pre>
func a() func() int {
    b := 0
    return func() int {
        return b + 10
    }
}
</pre>

    <h3><small>4.5</small> main函数与init函数</h3>
    <p>这两个函数都是系统自动调用的，不需要手动调用</p>
<pre>
func main() {                       // 只有package main时main函数才会被调用，并作为入口函数

}

func init() {                       // 在任意包下都有一个init函数，系统自动调用

}
</pre>
</section>

<section id="5">
    <div class="page-header">
        <h1>五、结构体</h1>
    </div>
    <h3><small>5.1</small> struct</h3>
<pre>
type s struct {                     // 声明一个拥有两个成员变量的s结构体
    X int
    Y int
}

a := s{X:12, Y:98}                  // 初始化方式1
b := s{20, 50}                      // 初始化方式2
a.X                                 // 以“.”为访问结构体的字段
</pre>

    <h3><small>5.2</small> struct嵌套</h3>
<pre>
type s1 struct {
    s                               // 这里就把上面定义的结构引进来，也叫做匿名字段
    x int
}

a := s1{s{10, 20}, 30}
fmt.Println(a.s.X, a.s.Y, a.X, a.Y, a.x)    // 匿名字段可以使用字段来访问也可以直接通过结构体来访问，如果字段重复，最外层的优先
</pre>

    <h3><small>5.3</small> 结构体的方法</h3>
<pre>
type Student struct {                       // 定义一个Student结构体
    age int
    name string
}

func (s Student) say(str string) {          // 为Student结构体定义一个say方法，接收一个string类型的参数
    s.age = 20                              // 此处修改是无效的
    fmt.Println(str)
}

s := Student{18, "Tom"}                     // 实例化Student结构体
s.say("hello")                              // 调用结构体的say方法

func (s *Student) say(str string) {         // 为Student结构体指针定义一个say方法，使用指针能够修改结构体的字段值
    s.age = 25                              // 此处修改有效，因为是指针
    fmt.Println(str)
}

s := &Student{20, "Lin"}
s.say("world")
</pre>

    <h3><small>5.4</small> 结构体方法继承</h3>
<pre>
type s1 struct {
    age int
}

type s2 struct {
    s1
}

func (m *s1) hello(str string) {

}

a := s1{10}
b := s2{s1{15}}

a.hello("Hello")
b.hello("World")
</pre>

    <h3><small>5.5</small> 结构体方法重载</h3>
<pre>
type s1 struct {
    age int
}

type s2 struct {
    s1
}

func (m *s1) hello(str string) {

}

func (m *s2) hello(str string) {            // 重载方法

}

a := s1{10}
b := s2{s1{15}}

a.hello("Hello")
b.s1.hello("Hello World")                   // 访问匿名结构体的方法
b.hello("World")                            // 访问重载后的方法
</pre>
</section>

<section id="6">
    <div class="page-header">
        <h1>六、interface</h1>
    </div>
    <h3><small>6.1</small> interface类型</h3>
<pre>
type Face interface {                       // 定义一接口，方法的集合
    sayHi()
    sing()
}

func (a *A) sayHi() {                       // 结构体实现了Face接口的sayHi()方法

}

func (a *A) sing() {                        // 结构体实现了Face接口的sing()方法
                                            // 这样，结构体就实现了Face接口的所有方法，即结构体实现了Face接口   
}
</pre>

    <h3><small>6.2</small> interface值</h3>
<pre>
type Face interface {                       // 定义一接口，方法的集合
    sayHi()
    sing()
}

type f Face                                 // interface值
f := A{}                                    // 类似于java中的实现与接口
f.sayHi()                                   // 调用抽象接口的方法
</pre>

    <h3><small>6.3</small> interface{}</h3>
<pre>
// 定义a为空接口
var a interface{}
var i int = 5
s := "Hello world"
// a可以存储任意类型的数值
a = i
a = s

func p(i interface{}) {         // 接收任意类型的参数
    value, ok := i.(string)     // 实现类型判断，如果i是string类型的变量，则ok等于true，value就是i的值
}

p(i)
p(s)
</pre>
<p>一个函数把interface{}作为参数，那么他可以接受任意类型的值作为参数，如果一个函数返回interface{},那么也就可以返回任意类型的值。</p>

    <h3><small>6.4</small> 嵌入interface</h3>
<pre>
type I1 interface {
    sayHi() string
    add(x, y int) int
}

type I2 interface {
    I1                                     // 嵌入一个interface，即I2包含I1的所有方法
}
</pre>
</section>

<section id="7">
    <div class="page-header">
        <h1>七、并发</h1>
    </div>
    <h3><small>7.1</small> goroutine</h3>
<pre>
func say(str string) {
    fmt.Println(str)
}

func main() {
    go say("hello")             // 开启新的goroutine执行
    say("World")
}
</pre>
<p>关键字: @go@</p>

    <h3><small>7.2</small> channel</h3>
<pre>
ci := make(chan int)            // 创建一个channel
cs := make(chan string)         //

a := 10
ci <- a                         // 把a的值发送给ci
b := <- ci                      // 从ci中接收数据赋值给b，这步应该是在新goroutine中执行的
                                // 执行“<-”发送或接收之前时会阻塞，直到读取到了值，即发送与接收是一起的
</pre>
<p>关键字: @chan@</p>

    <h3><small>7.3</small> 缓冲 channel</h3>
<pre>
ci := make(chan int, x)         // x为缓冲的长度，在x允许的长度内发送与接收都不会阻塞，当超过
</pre>

    <h3><small>7.4</small> Range和Close</h3>
<pre>
ci := make(chan int, 10)        // 创建一个缓冲长度为10的channel
for i := 0; i < cap(ci); i++ {
    ci <- i
}
close(ci)                       // 发送完数据就关闭channel
for v := range ci {
    fmt.Println(v)
}
</pre>

    <h3><small>7.5</small> Select</h3>
<pre>
select {
case <- :

case <- :

default:
    // 不阻塞时执行这里
}
</pre>
</section>
