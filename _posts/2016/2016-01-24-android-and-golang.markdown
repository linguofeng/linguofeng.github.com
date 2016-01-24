---
layout: "post"
title: "android and golang"
date: "2016-01-24 16:17"
---

毕竟Go语言是Google亲生的，现在Golang团队已经适配好了可以运行在Android平台的Go了，大概看了一下官方的说明，用起来也算很方便，还有Gradle插件支持。

[https://github.com/golang/mobile/tree/master/example/bind](https://github.com/golang/mobile/tree/master/example/bind) 这是官方提供的一个Demo。

Package layout

```
go.mobile/
    cmd/gobind        command line tool
    bind/             code generator, used by command line tool
        bindjava      cgo-JNI bridge, imported by generated code
        registry      global registration for wrapped functions
        seq           data serialization format - Go implementation
```

---

### > 安装gomobile

```bash
$ go get golang.org/x/mobile/cmd/gomobile
$ gomobile init

$ go get golang.org/x/mobile/example/bind/hello
$ gomobile bind -target=android golang.org/x/mobile/example/bind/hello
```

就会在当前目录下生成hello.aar，通过把hello.aar解压出来就会发现，原来底层也是通过JNI的方式去调用Go的函数的，只是中间包了一层。gomobile工具已经把so与java都提供好了，直接把aar导到现有的工程中就可以直接调用里面的java方法了，这个过程完全不用去定义jni方法，包名，当然了，demo中只提供了，java调用go的过程，go调用java看了一下设计文档，是通过type I interface定义一组接口并生成java的接口文件，然后去实现大概是这样。

[https://godoc.org/golang.org/x/mobile/cmd/gomobile](https://godoc.org/golang.org/x/mobile/cmd/gomobile)

[https://docs.google.com/document/d/1y9hStonl9wpj-5VM-xWrSTuEJFUAxGOXOhxvAs7GZHE/edit](https://docs.google.com/document/d/1y9hStonl9wpj-5VM-xWrSTuEJFUAxGOXOhxvAs7GZHE/edit)

Demo代码 [https://github.com/linguofeng/androidandgolang](https://github.com/linguofeng/androidandgolang)
