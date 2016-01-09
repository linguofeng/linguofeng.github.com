---
layout: page
title: Objective-C
description: OC学习笔记
date: 2013-04-01 08:36
---

<section>
    <div class="page-header">
        <h3>一、Hello World</h3>
    </div>
<pre class="prettyprint">
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        // insert code here...
        NSLog(@"Hello, World!");
        
    }
    return 0;
}
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、面向对象 OOP</h3>
    </div>
    <h4><small>2.1</small> 对象声明</h4>
<pre class="prettyprint">
// Student.h -----------------------------------------------------------------------
#import <Foundation/Foundation.h>

@interface Student : NSObject                // 声明Student,OC中所有类的父类都是NSObject
{
    NSString* name;                          // 实例变量(成员变量)
    int age;
}

@property(nonatomic, copy) NSString* name;   // 线程不安全，拷贝字符串
@property(nonatomic) int age;                // 线程不安全

- (void) goHome;                             // 对象方法，注意没有()

- (void) go2: (NSString*) target;            // 接收一个参数的对象方法,方法名叫go2:

- (void) toString;

+ (id) sharedStudent;                        // 类方法，类似C++的静态方法

@end

// Student.m -----------------------------------------------------------------------
#import "Student.h"

@implementation Student                      // 实现Student

@synthesize name;   // 生成geter/seter方法，如果是readonly则只有getter方法
@synthesize age;

- (void) goHome{
    NSLog(@"%@ go Home", name);
}

- (void) go2: (NSString*) target {
    NSLog(@"%@ go2 %@", name, target);
}

- (void) toString {
    NSLog(@"name: %@, age: %d", name, age);
}

+ (id) sharedStudent {
    return [[self alloc] init];     // 对象的创建过程是先申请内存，然后再初始化
}

@end
</pre>
    <h4><small>2.2</small> 继承、重载与其它面向对象语言基本相同，只要注意语法即可。</h4>
    <p>@super@ : 代表父类对象; @self@ : 代表本对象.</p>
<pre class="prettyprint">
// Father.h ------------------------------------------------------------------------
#import <Foundation/Foundation.h>

@interface Father : NSObject
{
    NSString* name;
}

- （void) run;

@end

// Son.h ---------------------------------------------------------------------------
#import <Foundation/Foundation.h>

//@class Father;           // 类似于C++中的class，只声明类而不把头文件引进来
#import "Father.h"         // 由于继承需要访问父类的成员变量或方法，需要import进来

@interface Son : Father    // 继承Father父类
{
    // NSString* name;     // 通过继承不需要声明name成员变量
}

// - (void) run;           // 通过继承也不需要声明run方法，如果

@end

// Son.m ---------------------------------------------------------------------------
#import "Son.h"
@implementation Son

- (void) run {
    [super run]            // 重载，然后调用父类的方法
}

@end
</pre>
    <h4><small>2.3</small> 多态与动态类型识别、绑定与加载</h4>
    <p>多态: 相同的名称，不同的类；使不同的类共享相同的方法名称的功能叫做多态。</p>

table(table table-bordered).
|_.类型|_.说明|
|id|动态对象的类型，通用指针类型，id = void*|
|Class|动态类的类型|
|SEL|选择器的数据类型(typedef)|
|BOOL|布尔类型，只有YES或NO|

table(table table-bordered).
|_.方法|_.参数类型|_.作用|
|isKindOf|class|是否是class类或其子类的实例</br>
<blockquote>if ([person isKindOf: [NSObject class]])
</blockquote>|
|isMemberOfClass|class|是否是class类的实例</br>
<blockquote>if ([person isMemberOfClass: [Person class]])
</blockquote>|
|respondsToSelector|selector|判断对象实例是否有这个方法</br>
<blockquote>if ([person respondsToSelector: @selector(run)])
</blockquote>|
|instancesRespondToSelector|selector|判断类是否有这个方法</br>
<blockquote>if ([Person instancesRespondToSelector: @select(run)])
</blockquote>|
</section>

<section>
    <div class="page-header">
        <h3>三、常用类</h3>
    </div>
    <h4><small>3.1</small> NSNumber</h4>
<pre class="prettyprint">
NSNumber *number1 = [[NSNumber alloc] init];
NSLog(@"number1 %@", number1);

NSNumber *number2 = [[NSNumber alloc] initWithInt:12];
NSLog(@"number2 %@", number2);

NSNumber *number3 = [NSNumber numberWithInt:87];
NSLog(@"number3 %@", number3);
NSLog(@"number3 %d", number3.intValue);
</pre>
</section>

<section>
    <div class="page-header">
        <h3>四、类目、延展、协议与代理模式</h3>
    </div>
    <h4><small>4.1</small> 类目</h4>
    <p>类目，我的理解是把类的函数进行分类，在现在类并不修改原类的基础上增加新的函数，并且这些函数能够被子类继承</p>
<pre class="prettyprint">
// 参考NSArray.h
@interface NSArray : NSObject
...
@end

@interface NSArray (NSExtendedArray)
...
@end

@interface NSArray (NSArrayCreation)
...
@end
</pre>
    <h4><small>4.2</small> 延展</h4>
    <p>延展，我的理解就是把头文件的声明写在了.m文件里，达到所谓的私有函数的功能</p>
<pre class="prettyprint">
@interface Student ()

- (void)test;

@end

@implementation Student
</pre>
    <h4><small>4.3</small> 协议与代理模式</h4>
    <p>协议，我的理解就是java中的抽象类，有可实现与必须实现的方法。</p>
<pre class="prettyprint">
@protocol TestProtocol <NSObject>

@required
- (void)callback;

@optional
- (void)callback1;

@end
</pre>
<pre class="prettyprint">
// Italk.h
#import <Foundation/Foundation.h>

@protocol Italk <NSObject>

- (void)talk:(NSString*) msg;

@end

// ItalkProxy.h
#import <Foundation/Foundation.h>
#include "Italk.h"

@interface ItalkProxy : NSObject <Italk>
{
    @private id <Italk> _italk;
}

@property(nonatomic, assign) id <Italk> italk;

- (void)talk:(NSString *)msg sing:(NSString*) sing;

- (void)sing:(NSString *)sing;

@end

// ItalkProxy.m
#import "ItalkProxy.h"

@implementation ItalkProxy

@synthesize italk = _italk;

- (void)talk:(NSString*) msg {
    [self.italk talk:msg];
}

- (void)talk:(NSString *)msg sing:(NSString*) sing {
    [self.italk talk:msg];
    
    [self sing:sing];
}

- (void)sing:(NSString *)sing {
    NSLog(@"sing %@", sing);
}

@end

// Student.h
@interface Student : NSObject <Italk>

// main.m
[stu talk:@"hello"];    // 原来只有talk方法

// 代理增加了sing方法，并且代理了原来的talk方法
ItalkProxy *proxy = [[ItalkProxy alloc] initWithItalk: stu];
[proxy talk:@"joy" sing:@"七里香"];
</pre>
</section>