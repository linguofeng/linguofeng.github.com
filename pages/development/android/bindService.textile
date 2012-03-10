---
layout: default
title: Android 绑定服务
---

h1. {{ page.title }}

p. 所谓的绑定服务就是不需要在androidManifest.xml中注册，随程序的退出而退出，是一个在后台运行的服务，且运行在独立的线程中。

p. 绑定服务能够使用服务中定义的方法。

* *一、继承Service*
<hr />

<pre class="brush: java">
public class BindServiceDemo extends Service {
    // 通过内部类的方法返回当前类的实例引用
    // 因为onBind()方法返回的是IBinder父类,而Binder是IBinder的一个子类
    // 所以继承Binder的MyBinder类就是IBinder接口的一个子类
    class MyBinder extends Binder {
        // 通过这个方法往外部提供BindServiceDemo的一个实例的引用
        public BindServiceDemo getService() {
            // 返回外部类(BindServiceDemo)的引用
            return BindServiceDemo.this;
        }
    }

    // 创建一个MyBinder的实例
    MyBinder binder = new MyBinder();

    // 启动第一步
    public void onCreate() {
        super.onCreate();
    }

    // 启动第二步
    public IBinder onBind(Intent intent) {
        return binder;// 返回MyBinder的实例
    }

    // 停止第一步
    public boolean onUnbind(Intent intent) {
        return super.onUnbind(intent);
    }

    // 停止第二步
    public void onDestroy() {
        binder = null;
        super.onDestroy();
    }

    // 供调用的方法
    public String getName() {
        return "www.linguofeng.com";
    }
}
</pre>

* *三、绑定与解除绑定服务*
<hr />

<pre class="brush: java">
    // 绑定服务
    bindService(new Intent(this, BindServiceDemo.class), conn, BIND_AUTO_CREATE);
    
    // 解除绑定服务
    unbindService(conn);
    
    ServiceConnection conn = new ServiceConnection() {
        // 断开
        public void onServiceDisconnected(ComponentName name) {
        }

        /**
         * 获得服务的时候都要调用
         */
        public void onServiceConnected(ComponentName name, IBinder service) {
            // 把IBinder类型的service转换为在BindServiceDemo中定义的MyBinder类型的实例
            // 其实service就是MyBinder
            BindServiceDemo.MyBinder binder = (BindServiceDemo.MyBinder) service;
            // 通过binder的getService()方法返回绑定的服务的一个引用
            BindServiceDemo mBindServiceDemo = binder.getService();
            // 通过引用操作方法
            String str = mBindServiceDemo.getName();
        }
    };
</pre>

* *三、startService()方式启动的服务的生命周期*
<hr />

<pre class="brush: java">
public class ServiceDemo extends Service {
    public void onCreate() {
        super.onCreate();
        // 1.服务开始创建，且只创建一次
    }
    
    public IBinder onBind(Intent intent) {
        // 2.bindService()时执行
        return null;
    }
    
    public boolean onUnbind(Intent intent) {
        // 3.unbindService()时执行
        return mAllowRebind;
    }
    
    public void onDestroy() {
        super.onDestroy();
        // 4.销毁服务
    }
</pre>

更多访问： "http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle":http://developer.android.com/guide/topics/fundamentals/services.html#Lifecycle