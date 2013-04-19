---
layout: post
title: mosquitto与paho实现推送服务
description: mosquitto + paho
categories: [archive]
tags: [mosquitto, paho]
---

<section>
    <p>mosquitto是一个开源的mqtt服务器，官网: "http://mosquitto.org/":http://mosquitto.org</p>
    <p>paho是eclipse的一个开源项目，使用c、java、lua实现了mosquitto客户端，官网: "http://www.eclipse.org/paho/":http://www.eclipse.org/paho</p>
    
    <h4><small>一、</small> 安装mosquitto</h4>
<pre>
$ brew install mosquitto
$ /usr/local/sbin/mosquitto  // 启动mosquitto服务器
</pre>
    <p><img src="http://ww2.sinaimg.cn/large/a74ecc4cjw1e3v94ptn9nj20vo0eymzc.jpg" width="570" alt=""></p>

    <h4><small>二、</small> 下载并编译paho的jar包</h4>
<pre>
$ wget http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.java.git/snapshot/org.eclipse.paho.mqtt.java-0.2.1.zip
$ unzip org.eclipse.paho.mqtt.java-0.2.1.zip
$ cd org.eclipse.paho.mqtt.java-0.2.1
</pre>
    <h5><small>2.1</small> 编译jar包</h5>
<pre>
$ cd org.eclipse.paho.client.mqttv3
$ ant
</pre>
    <h5><small>2.2</small> 编译Sample例子</h5>
<pre>
$ cd org.eclipse.paho.sample.mqttv3app
$ mkdir bin
$ javac -d bin -classpath ../org.eclipse.paho.client.mqttv3/target/ship/org.eclipse.paho.client.mqttv3.jar src/org/eclipse/paho/sample/mqttv3app/Sample.java
$ java -classpath ../org.eclipse.paho.client.mqttv3/target/ship/org.eclipse.paho.client.mqttv3.jar:bin org.eclipse.paho.sample.mqttv3app.Sample -b localhost
</pre>
    <p>运行Sample将会看到</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74eed94jw1e3v95bjm5kj20vo0eytbu.jpg" width="570" alt=""></p>
    <p>再看一下服务器的反应</p>
    <p><img src="http://ww2.sinaimg.cn/large/a74e55b4jw1e3v95j4qzcj20vo0ey0vy.jpg" width="570" alt=""></p>
    <p>实现订阅，如果其它客户端连接进来则收到提示消息</p>
<pre>
$ java -classpath ../org.eclipse.paho.client.mqttv3/target/ship/org.eclipse.paho.client.mqttv3.jar:bin org.eclipse.paho.sample.mqttv3app.Sample -b localhost -a subscribe
</pre>
    <p><img src="http://ww4.sinaimg.cn/large/a74eed94jw1e3v9kczxvaj20vo0eygob.jpg" width="570" alt=""></p>
    <p>服务器的反应，是一个订阅类型的客户端</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74ecc4cjw1e3v9i0cdgqj20vo0eydj1.jpg" width="570" alt=""></p>
    <p>启动一个新客户端</p>
    <p><img src="http://ww1.sinaimg.cn/large/a74e55b4jw1e3va2v242jj20vo0ey0vv.jpg" width="570" alt=""></p>
    <p>订阅客户端的反应</p>
    <p><img src="http://ww4.sinaimg.cn/large/bfadf3bejw1e3va34ps16j20vo0ey43b.jpg" width="570" alt=""></p>
    <p>服务器的反应</p>
    <p><img src="http://ww4.sinaimg.cn/large/a74ecc4cjw1e3va3ea0jxj20vo0eydjl.jpg" width="570" alt=""></p>
    <p>参考: http://mobilave.info/blog/2012/Quick_start_guide_for_the_Paho_MQTT_Java_Client.html</p>
</section>