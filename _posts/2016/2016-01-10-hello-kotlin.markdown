---
layout: post
title: "hello kotlin"
date: "2016-01-10 22:01"
description: "基于JVM实现的静态语言"
tags: [kotlin, android, java]
---

很早之前已经听说了一种运行在jvm上的类似swift的语言，kotlin。

最近在接Android第三方平台的时候，就试用了一下，后来一发不可收拾。

首先Kotlin是由JetBrains公司开发，并且Android Studio也是基于JetBrains公司的IDEA，所以kotlin支持是属于官方支持级别的，IDE特别友好。

提供的gradle插件也很好用，官方也有一篇开发Android的教程，[https://kotlinlang.org/docs/tutorials/kotlin-android.html](https://kotlinlang.org/docs/tutorials/kotlin-android.html)。

可以与Java很好地进行混合编程，无痛使用现有的jar库。

---

### > Hello Kotlin

首先给Android Studio安装Kotlin插件。通过插件管理界面即可安装。

也可以在线体验，[http://try.kotlinlang.org/](http://try.kotlinlang.org/)

创建Kotlin工程，hello。

```kotlin
fun main(args: Array<String>) {
    println("Hello")
}
```

---

### > apply

开发过程中，对于Bean的属性赋值过程如果属性特别多的时候，代码会很长并不是很优雅

```java
class Bean {
    private String a;
    // ...
    private String z;

    public void setA(String a) {
        this.a = a;
    }

    // ...

    public void setZ(String z) {
        this.z = z;
    }
}
```

```kotlin
val b = "b"
val bean = Bean().apply {
    a = "a"
    this.b = b // 使用this
    // ...
    z = "z"
}
```

通过使用 `apply` 可以使代码变成这样，看起来感觉更舒服。
