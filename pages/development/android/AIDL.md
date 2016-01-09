---
layout: default
title: "AIDL"
---

h1. {{ page.title }}
<hr />

* *一、建立.aidl文件* （类似于java语法的接口文件，服务端与客户端都需要该文件）
<hr />

<pre class="brush: java">
interface IRemoteService{
    void sayHello();
}
</pre>

* *二、建立服务类并创建内部类实现上面定义的接口* (服务端)
<hr />

<pre class="brush: java">
public class AIDLService extends Service {
    public static final String TAG = "AIDLService";

    // 1.定义一个内部类,实现aidl包下的IRemoteService.Stub类
    class MyBinder extends IRemoteService.Stub {
        // 服务器端暴露给客户端的方法sayHello()
        public void sayHello() throws RemoteException {
            System.out.prinltn("Hello AIDL");
        }
    }
    
    public IBinder onBind(Intent intent) {
        return new MyBinder();
    }
</pre>

* *三、配置AndroidManifest.xml文件让服务通过intent-filter来启动* (服务端)
<hr />

<pre class="brush: xml">
<service android:name="com.linguofeng.service.AIDLService">
    <intent-filter>
        <!-- 通过action匹配找到这个AIDLService服务 -->
        <action android:name="AIDLService" />
    </intent-filter>
</service>
</pre>

* *四、创建调用远程服务的Activity* (客户端)
<hr />

<pre class="brush: java">
public class AIDLClient extends Activity {
    IRemoteService rs;
    
    public void onCreate(Bundle savedInstanceState) {
        // ...
    }
    
    public void onClick(View v) {
        Intent intent = new Intent();
        // 启动匹配的action,即服务端AndroidManifest.xml中定义的action名称
        intent.setAction("AIDLService");
        bindService(intent, conn, BIND_AUTO_CREATE);
    }
    
    ServiceConnection conn = new ServiceConnection() {
        public void onServiceConnected(ComponentName name, IBinder service) {
            // 获得服务器端的service实例
            rs = IRemoteService.Stub.asInterface(service);
            // 调用远程方法
            rs.sayHello();
        }

        public void onServiceDisconnected(ComponentName name) {
            // TODO 断开服务
        }
    };
}
</pre>

p. 参考： "http://developer.android.com/guide/developing/tools/aidl.html":http://developer.android.com/guide/developing/tools/aidl.html