---
layout: default
title: "NDK"
description: "交叉编译工具链 Native Development Kit"
---

<section>
    <div class="page-header">
        <h3>一、安装 <small>当前环境：Ubuntu 12.04 x64</small></h3>
    </div>
    <pre>
        $ axel -n 10 http://dl.google.com/android/ndk/android-ndk-*r8b*-linux-x86.tar.bz2    // r8b为版本号，根据具体修改。
        $ tar -zxvf android-ndk-r8b-linux-x86.tar.bz2
        $ <a href="/pages/tools/SublimeText.html" rel="tooltip" data-placement="right" title="一个很不错的文本编辑工具，点击查看">subl</a> ~/.bashrc 
        $ source ~/.bashrc
        $ ndk-build -v
    </pre>
    <pre>
        export ANDROID_NDK_HOME=/path/to/android-ndk-r8b
        PATH=$PATH:$ANDROID_NDK_HOME
    </pre>
    <pre>
        GNU Make 3.81
        Copyright (C) 2006  Free Software Foundation, Inc.
        This is free software; see the source for copying conditions.
        There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
        PARTICULAR PURPOSE.
        
        This program built for x86_64-unknown-linux-gnu
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>二、Hello NDK <small>通过java调用c/c++里的函数</small></h3>
    </div>
    <pre>
        1、创建一个新的Android工程HelloNDK
        2、在MainActivity中定义一个native方法：
        3、在工程根目录创建jni目录并创建hello.c源文件：
        4、在jni目录中编写Android.mk文件：
        5、进入Android工程所在路径，运行ndk-build：
        6、加载编译好以后的.so库文件：
        7、在MainActivity中调用hello()方法：
    </pre>
    <p>MainActivity.java</p>
    <pre>
        public native String hello();
    </pre>
    <p>hello.c</p>
<pre>
#include<string.h>
#include<jni.h>

JNIEXPORT jstring JNICALL // 返回值是String
Java_包名（.替换成_）_类名_方法名(JNIEnv * env, jobject this) {
    // env是一个结构体指针的指针，*env得到一个结构体指针，**env得到一个结构体
    // return (**env).NewStringUTF(env, "Hello World 4 C");
    return (*env)->NewStringUTF(env, "Hello World 4 C");
}
</pre>
    <p>Android.mk</p>
    <pre>
        LOCAL_PATH := $(call my-dir)        // 当前文件的路径
        include $(CLEAR_VARS)               // 清空变量，类似工具初始化
        LOCAL_MODULE    := hello            // 生成的.so文件名称，也是通过System.loadLibrary()的名称
        LOCAL_SRC_FILES := hello.c          // 源文件，多个用","分开
        // LOCAL_STATIC_LIBRARIES := 静态库     // 引入本地静态库
        include $(BUILD_SHARED_LIBRARY)     // BUILD_SHARED_LIBRARY表示是动态库.so、BUILD_STATIC_LIBRARY表示静态库.a
    </pre>
    <pre>
        $ cd /path/to/HelloNDK
        $ ndk-build
        
        Compile thumb  : hello <= hello.c
        SharedLibrary  : libhello.so
        Install        : libhello.so => libs/armeabi/libhello.so
    </pre>
    <p>MainActivity.java</p>
<pre>
static {
    System.loadLibrary("hello");
}
</pre>
    <pre>
        Toast.makeText(this, hello(), Toast.LENGTH_LONG).show();
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>三、使用javah生成jni头文件 <small>减少可能写错的风险</small></h3>
    </div>
    <pre>
        $ cd /path/to/HelloNDK/jni/
        $ javah -classpath ../bin/classes packageName.className
    </pre>
    <p>引入生成的.h头文件</p>
    <pre>
        #include "packageName_className.h"      // 以""引入本地头文件
        把头文件中的方法拷贝到.c文件中并添加参数名称，实现逻辑。
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>四、C/C++调用Java的方法 <small>比如在C/C++中处理一件事，让Java显示进度条；这里的实现也是Java -> C/C++ -> Java</small></h3>
    </div>
    <p>JavaClass.java</p>
<pre>
public class JavaClass {
    public void add(int x, int y) {
        Log.d("JavaClass", "JavaClass::add() = " + (x + y));
    }
    
    public static void add2(int x, int y) {
        Log.d("JavaClass", "JavaClass::add2() = " + (x + y));
    }
}
</pre>
    <p>获取JavaClass的方法签名</p>
    <pre>
        $ javap -classpath bin/classes -s 包名.JavaClass
    </pre>
    <pre>
        Compiled from "JavaClass.java"
        public class 包名.JavaClass extends java.lang.Object{
        public 包名.JavaClass();
          Signature: ()V
        public void add(int, int);
          Signature: (II)V
        public static void add2(int, int);
          Signature: (II)V
        }
    </pre>
    <p>hello.c</p>
<pre>
jobject // 实例化类函数
getInstance(JNIEnv * env, jclass clazz) {
    jmethodID construction_id = (*env)->GetMethodID(env, clazz, "<init>", "()V");
    jobject this = (*env)->NewObject(env, clazz, construction_id);
    return this;9
}

JNIEXPORT jint JNICALL  // 返回类型是int
Java_包名_类名_方法名(JNIEnv * env, jobject this, jint x, jint y) {
    jclass clazz = (*env)->FindClass(env, "path/to/类名");
    jobject obj = getInstance(env, clazz);
    
    jmethodID method1 = (*env)->GetMethodID(env, clazz, "add", "(II)V");
    (*env)->CallVoidMethod(env, obj, method1, x, y);

    // 静态方法
    jmethodID method2 = (*env)->GetStaticMethodID(env, clazz, "add2", "(II)V");
    (*env)->CallStaticVoidMethod(env, clazz, method2, x, y);
    return x + y;
}
</pre>
    <h4>总结：</h4>
    <p>调用Java的方法与Java的反射类似，先获取某个类，然后实例化，然后根据方法签名获取方法，然后调用的过程。</p>
    <p>在C++中只需要把 <b>*env</b> 换成 <b>env</b>，再是在参数的地方把 <b>env</b> 删除掉，如下</p>
<pre>
C：(*env)->GetStaticMethodID(env, clazz, "add2", "(II)V");
C++：env->GetStaticMethodID(clazz, "add2", "(II)V");
</pre>
</section>