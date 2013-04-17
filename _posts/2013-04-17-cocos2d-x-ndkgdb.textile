---
layout: post
title: Cocos2d-x ndkgdb 调试记录
description: Cocos2d-X + ndkgdb.sh
categories: [archive]
tags: [cocos2d-x, ndk, gdb]
---

<section>
    <p>由于目前Cocos2d-x中的libtiff.a静态库中存在main主函数，导致gdb调试时会出现问题，现在需要重新编译一个没有main函数的libtiff静态库</p>
<pre class="prettyprint">
$ git clone git://github.com/dumganhar/libtiff.git
$ cp -r libtiff $NDK_ROOT/samples/hello-jni/jni/tiff
$ cd libtiff
$ ./configure 
    # 目的是生成tif_config.h和tiffconf.h两个文件
$ cp libtiff/{tif_config.h,tiffconf.h} $NDK_ROOT/samples/hello-jni/jni/tiff/libtiff
$ vim $NDK_ROOT/samples/hello-jni/jni/tiff/libtiff/tif_config.h
    # 注释120行的#define HAVE_SEARCH_H 1与206行的#define LZMA_SUPPORT 1
$ vim $NDK_ROOT/samples/hello-jni/jni/tiff/libtiff/mkg3states.c
    # 注释掉main函数
$ vim $NDK_ROOT/samples/hello-jni/jni/Android.mk
</pre>
<pre class="prettyprint">
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE         := tiff

LOCAL_TIFF_SRC_FILES := \
        tiff/libtiff/tif_dirread.c \
        tiff/libtiff/tif_zip.c \
        tiff/libtiff/tif_flush.c \
        tiff/libtiff/tif_next.c \
        tiff/libtiff/tif_ojpeg.c \
        tiff/libtiff/tif_dirwrite.c \
        tiff/libtiff/tif_dirinfo.c \
        tiff/libtiff/tif_dir.c \
        tiff/libtiff/tif_compress.c \
        tiff/libtiff/tif_close.c \
        tiff/libtiff/tif_tile.c \
        tiff/libtiff/tif_open.c \
        tiff/libtiff/tif_getimage.c \
        tiff/libtiff/tif_pixarlog.c \
        tiff/libtiff/tif_warning.c \
        tiff/libtiff/tif_dumpmode.c \
        tiff/libtiff/tif_jpeg.c \
        tiff/libtiff/tif_jbig.c \
        tiff/libtiff/tif_predict.c \
        tiff/libtiff/mkg3states.c \
        tiff/libtiff/tif_write.c \
        tiff/libtiff/tif_error.c \
        tiff/libtiff/tif_version.c \
        tiff/libtiff/tif_print.c \
        tiff/libtiff/tif_color.c \
        tiff/libtiff/tif_read.c \
        tiff/libtiff/tif_extension.c \
        tiff/libtiff/tif_thunder.c \
        tiff/libtiff/tif_lzw.c \
        tiff/libtiff/tif_fax3.c \
        tiff/libtiff/tif_luv.c \
        tiff/libtiff/tif_codec.c \
        tiff/libtiff/tif_unix.c \
        tiff/libtiff/tif_packbits.c \
        tiff/libtiff/tif_aux.c \
        tiff/libtiff/tif_fax3sm.c \
        tiff/libtiff/tif_swab.c \
        tiff/libtiff/tif_strip.c

LOCAL_TIFF_SRC_FILES += tiff/port/lfind.c

LOCAL_SRC_FILES              := $(LOCAL_TIFF_SRC_FILES)
LOCAL_C_INCLUDES             := $(LOCAL_PATH)/tiff/libtiff
LOCAL_WHOLE_STATIC_LIBRARIES := cocos_jpeg_static

include $(BUILD_STATIC_LIBRARY)

include $(CLEAR_VARS)

LOCAL_MODULE           := hello-jni
LOCAL_SRC_FILES        := hello-jni.c
LOCAL_STATIC_LIBRARIES := tiff

include $(BUILD_SHARED_LIBRARY)

$(call import-module,libjpeg)
</pre>
    <p>参考: https://code.google.com/p/tiffonandroid/source/browse/tiffviewer/project/jni/Android.mk</p>
<pre class="prettyprint">
$ ndk-build NDK_MODULE_PATH=$COCOS2DX_ROOT/cocos2dx/platform/third_party/android/prebuilt
$ cp obj/local/armeabi/libtiff.a $COCOS2DX_ROOT/cocos2dx/platform/third_party/android/prebuilt/libtiff/libs/armeabi
</pre>
</section>

<section>
    <p>首先编译时要加NDK_DEBUG=1</p>
<pre class="prettyprint">
$ cd $COCOS2DX_ROOT/samples/Cpp/HelloCpp/proj.android
$ ./build_native.sh NDK_DEBUG=1
</pre>
    <p>AndroidManifest.xml增加android:debuggable="true"</p>
<pre>
<application android:label="@string/app_name" android:debuggable="true">
    ...
</application>
</pre>
    <p>安装应用到模拟器</p>
<pre class="prettyprint">
$ android update project -p . -t android-17
$ ant debug install
</pre>
    <p>开始进行调试</p>
<pre class="prettyprint">
$ ./ndkgdb.sh
(gdb) b HelloWorldScene.cpp:83
(gdb) c     # 这时点击退出按键将会断点到83行
Breakpoint 1, HelloWorld::menuCloseCallback (this=0x2a19b3a0, pSender=0x2a14b8d0) at jni/../../Classes/HelloWorldScene.cpp:83
83      CCDirector::sharedDirector()->end();
(gdb) q
</pre>
</section>