---
layout: post
title: Android中编译和使用LuaJIT开发应用
description: 使用LuaJIT开发Android应用
categories: [archive]
tags: [android, lua, luajit]
---

<section>
    <div class="page-header">
        <h3>一、编译Android平台的LuaJIT</h3>
    </div>
<pre class="prettyprint">
$ git clone http://luajit.org/git/luajit-2.0.git
$ cd luajit-2.0
$ NDK=/opt/android/ndk
$ NDKABI=8
$ NDKVER=$NDK/toolchains/arm-linux-androideabi-4.6
$ NDKP=$NDKVER/prebuilt/darwin-x86/bin/arm-linux-androideabi-
$ NDKF="--sysroot $NDK/platforms/android-$NDKABI/arch-arm"
$ make HOST_CC="gcc -m32" CROSS=$NDKP TARGET_FLAGS="$NDKF" TARGET_SYS=Linux #在OS X下编译需要指明TARGET_SYS
</pre>
    <p>参考：http://luajit.org/install.html</p>
</section>

<section>
  <div class="page-header">
    <h3>二、把生成的libluajit.a库文件与一些头文件拷贝到jni目录下</h3>
  </div>
  <p>本例子中使用的是ndk中的hello-jni工程</p>
<pre class="prettyprint">
$ cp src/{libluajit.a,lua.h,lauxlib.h,lua.hpp,luaconf.h,luajit.h,lualib.h} \
> ../android/jni  # android工程jni目录
$ vim ../android/jni/Android.mk
</pre>
<pre class="prettyprint">
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := hello-jni
LOCAL_SRC_FILES := hello-jni.c
LOCAL_LDLIBS := $(LOCAL_PATH)/libluajit.a   #加上这句

include $(BUILD_SHARED_LIBRARY)
</pre>
</section>

<section>
  <div class="page-header">
    <h3>三、修改hello-jin.c</h3>
  </div>
<pre class="prettyprint">
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"  // 引入头文件

lua_State* L;         // Lua指针

jstring
Java_com_example_hellojni_HelloJni_stringFromJNI( JNIEnv* env,
                                                  jobject thiz )
{
    L = lua_open();   // 打开Lua指针
    luaL_openlibs(L);
    luaL_dostring(L, "return 'Hello from Lua !'");  // 执行Lua语句
    const char * str = lua_tostring(L, -1);         // 获取Lua语句的返回值
    lua_close(L);

    return (*env)->NewStringUTF(env, str);
}
</pre>
</section>