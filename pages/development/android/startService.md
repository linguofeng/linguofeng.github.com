---
layout: default
title: "Android 静态服务"
---

h1. {{ page.title }}

p. 所谓的静态服务就是在androidManifest.xml中注册，并且不随程序的退出而退出，是一个在后台运行的服务，默认配置下是运行在UI线程中，通过配置可运行在独立线程中。

* *一、继承Service*
<hr />

<pre class="brush: java">
public class ServiceDemo extends Service {
    public IBinder onBind(Intent intent) {
        return null;
    }
    
    public void onCreate() {
        super.onCreate();
        // 服务正在启动初始化
    }
}
</pre>

* *二、在androidManifest.xml中注册*
<hr />

<pre class="brush: xml">
<application android:icon="@drawable/icon" android:label="@string/app_name">
    ...
    <service android:name=".ServiceDemo" />
</application>
</pre>

* *三、启动与停止服务*
<hr />

<pre class="brush: java">
    startService(new Intent(this, ServiceDemo.class));
    
    stopService(new Intent(this, ServiceDemo.class));
</pre>

* *四、startService()方式启动的服务的生命周期*
<hr />

<pre class="brush: java">
public class ServiceDemo extends Service {
    public void onCreate() {
        super.onCreate();
        // 1.服务开始创建，且只创建一次
    }
    
    public void onStart(Intent intent, int flags, int startId) {
        super.onStart();
        // 2.服务运行，当startService()执行时会执行该方法
    }
    
    public void onDestroy() {
        super.onDestroy();
        // 3.销毁服务，当stopService()执行时会执行该方法
    }
</pre>

更多访问： "http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle":http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle