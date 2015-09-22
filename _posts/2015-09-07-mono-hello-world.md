---
layout: post
title: Mono Hello World
description:
categories: [archive]
tags: [cocos2d-x]
---

1.安装
```zsh
$ brew install mono
```

2.创建Hello.cs
```zsh
$ mkdir mono-workspace
$ cd mono-workspace
$ vim Hello.cs
```

```csharp
using System;

public class Hello {
    public static void Main() {
        Console.WriteLine("Hello linguofeng.com!!")
    }
}
```

3.编译
```zsh
$ mcs Hello.cs
```

4.执行
```zsh
$ mono Hello.exe
```

参考:
http://logicalgenetics.com/raspberry-pi-and-mono-hello-world/
