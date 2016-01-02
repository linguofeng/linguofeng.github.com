---
layout: post
title: 使用Eclipse调试Android Native Application
description: Eclipse + Android + ndk
categories: [archive]
tags: [android, ndk, eclipse]
---

<section>
    <p>由于最近需要调试C++程序，以后都是暴力调试的，暴力调试就是在源码中把想要得到的内容通过log的形式输出，这就调试速度快精准度高，但是得到的内容有限，所以才开始使用GDB来高度C++。</p>
    <p>现在如果想要通过Google搜索关于Debug Android Ndk的内容很多都是旧版本的，如今ADT插件的发展已经支持NDK的调试的，不需要安装Sequoyah插件与一大堆配置，只需要简单几步即可调试应用，下面记录下调试的步骤，方便以后查阅。</p>
    <ol>
        <li>系统: OS X 10.8.3</li>
        <li>Eclipse: Juno 4.2.1</li>
        <li>ADT: r21.1.0</li>
        <li>NDK: android-ndk-r8e</li>
    </ol>
</section>

<section>
    <blockquote>一、创建工程</blockquote>
    <p><img src="http://ww3.sinaimg.cn/large/a74ecc4cjw1e3tkzqi5pdj21000uo0wt.jpg" width="648" alt=""></p>
    <blockquote>二、添加Native支持</blockquote>
    <p><img src="http://ww4.sinaimg.cn/large/a74e55b4jw1e3tl0oho2bj20yk07u0us.jpg" width="622" alt=""></p>
    <p><img src="http://ww1.sinaimg.cn/large/bfadf3bejw1e3tl0wjfddj.jpg" width="639" alt=""></p>
    <blockquote>三、切换至C/C++视图，方便C/C++代码编写</blockquote>
    <p><img src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e3tl13qqurj20jo0me0uu.jpg" width="354" alt=""></p>
    <blockquote>四、检查工程目录结构是否正常，如果没有includes文件夹可以关闭工程再重新打开</blockquote>
    <p><img src="http://ww4.sinaimg.cn/large/a74eed94jw1e3tl1dhg52j20j80gymyx.jpg" width="346" alt=""></p>
    <blockquote>五、这样一个完整的工程就创建完成了，接下来我们要实现的功能是点击一下按键，显示从Jni返回的字符串。</blockquote>
    <blockquote>六、修改activity_main.xml布局文件</blockquote>
<pre class="prettyprint">
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="@string/hello_world"
        android:textSize="@dimen/font_size" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:onClick="call_jni"
        android:text="@string/call_jni" />
</RelativeLayout>
</pre>
    <blockquote>七、修改MainActivity.java</blockquote>
<pre class="prettyprint">
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void call_jni(View v) {
        ((TextView) findViewById(R.id.textView1)).setText(jni_call());
    }

    private native String jni_call();

    static {
        System.loadLibrary("DebugNdkTest");
    }
}
</pre>
    <blockquote>八、获取jni_call的jni头文件</blockquote>
<pre>
$ cd $DebugNdkTest/jni
$ javah -classpath ../bin/classes  com.linguofeng.debugndktest.MainActivity
</pre>
    <blockquote>九、修改DebugNdkTest.cpp</blockquote>
<pre class="prettyprint">
#include "com_linguofeng_debugndktest_MainActivity.h"

JNIEXPORT jstring JNICALL Java_com_linguofeng_debugndktest_MainActivity_jni_1call
  (JNIEnv * env, jobject) {

    return env->NewStringUTF("Hello From JNI");
}
</pre>
    <blockquote>十、运行点击按键将会看到</blockquote>
    <p><img src="http://ww4.sinaimg.cn/large/a74e55b4jw1e3tlts36k4j20qk0u8dhn.jpg" width="428" alt=""></p>
    <p><img src="http://ww4.sinaimg.cn/large/bfadf3bejw1e3tltzwuvvj.jpg" alt="" width="428"></p>
</section>

<section>
    <p>接下来就是debug了，debug前需要修改工程属性</p>
    <p><img src="http://ww2.sinaimg.cn/large/a74ecc4cjw1e3tm4e2wdtj214g0sm7a1.jpg" width="728" alt=""></p>
    <p>在DebugNdkTest.cpp文件第6行打个断点</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74eed94jw1e3tm4k6jduj20ks07kmyn.jpg" width="374" alt=""></p>
    <p>现在就可以debug了</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74e55b4jw1e3tm4qfnmoj20yi08wmzb.jpg" width="621" alt=""></p>
    <p>当点击访问JNI按钮的时候就会停在断点处了，现在就可以像java的debug一样调试了，很方便。</p>
</section>
