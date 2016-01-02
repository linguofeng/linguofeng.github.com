---
layout: post
title: Google Breakpad Android
description: Android使用Google Breakpad进行崩溃日志管理
categories: [archive]
tags: [android, breakpad]
---

<section>
<p>开发过程中，最担心的问题就是程序崩溃，而且还不知道崩溃的原因，现在使用Google Breakpad来跟踪崩溃的位置，非常方便</p>
<p>由于目前使用Mac系统开发，Google Breadpad处理Android崩溃日志时需要Linux环境，借助<a href="mac-osx-vagrant-ubuntu.html">vagrant</a>可以非常方便地在Mac使用Ubuntu环境</p>
<p>有了vagrant以后就方便了</p>
<pre>
$ varant ssh
$ cd /vagrant
$ sudo apt-get update
$ sudo apt-get install build-essential
$ svn checkout http://google-breakpad.googlecode.com/svn/trunk/ google-breakpad-read-only
$ cd google-breakpad-read-only
$ ./configure
$ make
</pre>
<p>这样就编译好了dump_syms与minidump_stackwalk工具，分析日志时需要</p>
<p>接下来就是整合breakpad_client.a静态库</p>
<p>我这里是与Cocos2d-x进行整合的，把google-breakpad-read-only目录拷贝到Cocos2d-x根目录，修改游戏工程的Android.mk文件，添加</p>
<pre>
LOCAL_STATIC_LIBRARIES += breakpad_client

$(call import-module,google-breakpad-read-only/android/google_breakpad)
</pre>
<p>修改jni/src/main.cpp，添加</p>
<pre>
#include "client/linux/handler/exception_handler.h"
#include "client/linux/handler/minidump_descriptor.h"

bool DumpCallback(const google_breakpad::MinidumpDescriptor& descriptor,
                  void* context,
                  bool succeeded) {
  LOGD("Dump path: %s\n", descriptor.path());
  return succeeded;
}

jint JNI_OnLoad(JavaVM *vm, void *reserved)
{
    JniHelper::setJavaVM(vm);
 	
 	// 这里是定义dump文件的保存位置，保存至sd卡根目录
    google_breakpad::MinidumpDescriptor descriptor("/sdcard");
    google_breakpad::ExceptionHandler eh(descriptor, NULL, DumpCallback, NULL, true, -1);

    return JNI_VERSION_1_4;
}
</pre>
<p>然后编译，在android工程的根目录下找到obj/local/armeabi/libxxx.so，把这个so复制到vagrant创建的ubuntu虚拟机根目录</p>
<p>回到ubuntu环境，生成sym文件</p>
<pre>
$ ./google-breakpad-read-only/src/tools/linux/dump_syms/dump_syms libxxx.so > libxxx.so.sym
</pre>
<p>查看libxxx.so.sym文件内容，头部会有，EB0351B143DA42A6D55FA6EA358B49D50不一样</p>
<pre>
MODULE Linux arm EB0351B143DA42A6D55FA6EA358B49D50 libxxx.so
</pre>
<p>接着执行</p>
<pre>
$ mkdir -p symbols/libxxx.so/EB0351B143DA42A6D55FA6EA358B49D50/
$ mv libxxx.so.sym symbols/libxxx.so/EB0351B143DA42A6D55FA6EA358B49D50/
</pre>
<p>当游戏在运行过程中崩溃了就会在sd卡根目录创建xxxx-xxxx-xxxxx-xxxx.dmp的文件，把这个文件复制到symbols同级目录，执行</p>
<pre>
$ ./google-breakpad-read-only/src/processor/minidump_stackwalk xxxx-xxxx-xxxxx-xxxx.dmp symbols > crashed.log
</pre>
<p>打开crashed.log就会发现类似</p>
<pre>
Thread 0 (crashed)
 0  libxxx.so!Crash [xxxxx.cpp : 28 + 0x4]
</pre>
<p>就是程序崩溃的位置，具体到xxxxx.cpp这个文件的28行</p>
<p>more: https://code.google.com/p/google-breakpad/source/browse/trunk/README.ANDROID</p>
</section>