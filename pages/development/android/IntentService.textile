---
layout: default
title: Android Intent服务
---

h1. {{ page.title }}

p. IntentService提供多线程处理环境,简化多线程代码,有效进行多线程安全管理。

* *一、继承Service*
<hr />

<pre class="brush: java">
public class IntentServiceDemo extends IntentService {
    public static final String TAG = "IntentService";

    // 定义一个不带参数的构造器
    public IntentServiceDemo() {
        super("");
    }

    // 定义一个带参数的构造器
    public IntentServiceDemo(String name) {
        super(name);
    }

    // 重写onHandleIntent()方法,处理多线程（该方法在子线程中运行）
    protected void onHandleIntent(Intent intent) {
        Log.i(TAG, "----------onHandleIntent()-----------------------" + intent.getIntExtra("key", 0));
        Log.i(TAG, "----------IntentService-Thread.id----------------" + Thread.currentThread().getId());// 获得当前线程的ID编号

        // 延时执行
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
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
    
    public int onStartCommand(Intent intent, int flags, int startId) {
        // 2.服务运行，当startService()执行时会执行该方法
        return 0;
    }
    
    public void onDestroy() {
        super.onDestroy();
        // 3.销毁服务，当stopService()执行时会执行该方法
    }
</pre>

更多访问： "http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle":http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle