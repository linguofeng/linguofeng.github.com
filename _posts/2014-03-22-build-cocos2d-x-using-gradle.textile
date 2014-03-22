---
layout: post
title: Cocos2d-x And Gradle
description: 使用Gradle编译Cocos2-dx
categories: [archive]
tags: [cocos2d-x, gradle]
---

<section>
<p>安装Gradle</p>
<pre>
$ brew update
$ brew install gradle
</pre>
<p>创建化gradle</p>
<pre>
$ cd $COCOS2DX-ROOT
$ gradle init
</pre>
<p>修改build.gradle，替换成</p>
<pre>
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.9.+'
    }
}
</pre>
<p>修改settings.gradle，替换成/p>
<pre>
include ':cocos2d:platform:android:java'
include ':projects:xxxx:proj.android'
</pre>
<p>创建build.gradle，保存至cocos2dx/platform/android/java里</p>
<pre>
apply plugin: 'android-library'

dependencies {
    compile fileTree(dir: 'libs', include: '*.jar')
}

android {
    compileSdkVersion 19
    buildToolsVersion "19.0.3"

    sourceSets {
        main {
            manifest.srcFile 'AndroidManifest.xml'
            java.srcDirs = ['src']
            resources.srcDirs = ['src']
            aidl.srcDirs = ['src']
            renderscript.srcDirs = ['src']
            res.srcDirs = ['res']
            assets.srcDirs = ['assets']
        }
    }
}
</pre>
<p>创建build.gradle保存至项目中</p>
<pre>
apply plugin: 'android'

repositories {
    mavenCentral()
}

dependencies {
    compile fileTree(dir: 'libs', include: '*.jar')
    compile fileTree(dir: "libs/armeabi", include: '*/so')
    compile project(':cocos2dx:platform:android:java')
}

// 编译so动态库
task ndkBuild(type: Exec) {
    commandLine './build_native.sh', 'NDK_DEBUG=1', 'NDK_APPLICATION_MK=jni/Application.mk', '-j4'
}

android {
    compileSdkVersion 19
    buildToolsVersion "19.0.3"

    defaultConfig {
        minSdkVersion 9
        targetSdkVersion 19
    }

    sourceSets {
        main {
            manifest.srcFile 'AndroidManifest.xml'
            java.srcDirs = ['src']
            resources.srcDirs = ['src']
            aidl.srcDirs = ['src']
            renderscript.srcDirs = ['src']
            res.srcDirs = ['res']
            assets.srcDirs = ['assets']
            jniLibs.srcDirs = ['libs']
        }
    }
}
</pre>
<p>编译</p>
<pre>
$ gradle ndkBuild
$ gradle installDebug
</pre>
</section>
