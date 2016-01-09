---
layout: default
title: "Android 菜单"
---

<div id="charpter">

h3. Android 菜单

</div>

h1. {{ page.title }}

h3(#2). *intent-filter用法* %(title)intent-filter%
<hr />

p. intent-filter作用是能够隐式启动组件

* 隐式启动一个Activity
<hr />

<pre class="brush: xml">
<activity android:name=".Demo" android:label="Demo Activity">
    <!-- 设置当前activity的intent-filter可以响应的intent -->
    <intent-filter>
        <!-- 当前这个activity有一个action为linguofengAndroid的值,只有符合这个值的Intent才可以启动它 -->
        <action android:name="linguofengAndroid" />
        <!-- 使用startActivity()需要加上如下的category -->
        <category android:name="android.intent.category.DEFAULT" />
        <!-- 自定义（当系统中存在多个重名时会提示选择启动哪个Activity） -->
        <category android:name="a1101" />
        <data android:mimeType="jpeg/*" android:scheme="http" android:host="www.linguofeng.com" />
    </intent-filter>
</activity>
</pre>

<pre class="brush: java">
Intent intent = new Intent();
// 设置当前的intent中包含的action,只有匹配的intent-filter才会响应
// 如果有多个相同的intent-filter都匹配,那么会有一个列表提供给用户选择
intent.setAction("linguofengAndroid");
// 设置类别
intent.addCategory("a1101");
// 设置Data
// intent.setData(Uri.parse("http://www.linguofeng.com"));
// 设置数据和数据类型
intent.setDataAndType(Uri.parse("http://www.linguofeng.com"), "jpeg/*");
startActivity(intent);
</pre>

p. 参考： "http://developer.android.com/guide/topics/manifest/intent-filter-element.html":http://developer.android.com/guide/topics/manifest/intent-filter-element.html

h3(#1). *Intent用法总结* %(title)Intent用法总结%
<hr />

*(1#101) *一、通过浏览器打开网页* %(title)打开浏览器%
<hr />

<pre class="brush: java">
// 通过浏览器打开网页
Uri uri = Uri.parse("http://www.google.com");
Intent intent  = new Intent(Intent.ACTION_VIEW, uri);
startActivity(intent);
</pre>

*(1#102) *二、发送电子邮件* %(title)发送电子邮件%
<hr />

<pre class="brush: java">
// 给someone@domain.com发邮件
Uri uri = Uri.parse("mailto:someone@domain.com");
Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
startActivity(intent);
// 给someone@domain.com发邮件发送内容为“Hello”的邮件
Intent intent = new Intent(Intent.ACTION_SEND);
intent.putExtra(Intent.EXTRA_EMAIL, "someone@domain.com");
intent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
intent.putExtra(Intent.EXTRA_TEXT, "Hello");
intent.setType("text/plain");
startActivity(intent);
// 给多人发邮件
Intent intent=new Intent(Intent.ACTION_SEND);
String[] tos = {"1@abc.com", "2@abc.com"}; // 收件人
String[] ccs = {"3@abc.com", "4@abc.com"}; // 抄送
String[] bccs = {"5@abc.com", "6@abc.com"}; // 密送
intent.putExtra(Intent.EXTRA_EMAIL, tos);
intent.putExtra(Intent.EXTRA_CC, ccs);
intent.putExtra(Intent.EXTRA_BCC, bccs);
intent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
intent.putExtra(Intent.EXTRA_TEXT, "Hello");
intent.setType("message/rfc822");
startActivity(intent);
</pre>

*(1#103) *三、显示地图与路径规划* %(title)显示地图%
<hr />

<pre class="brush: java">
// 打开Google地图中国北京位置（北纬39.9，东经116.3）
Uri uri = Uri.parse("geo:39.9,116.3");
Intent intent = new Intent(Intent.ACTION_VIEW, uri);
startActivity(intent);
// 路径规划：从北京某地（北纬39.9，东经116.3）到上海某地（北纬31.2，东经121.4）
Uri uri = Uri.parse("http://maps.google.com/maps?f=d&saddr=39.9 116.3&daddr=31.2 121.4");
Intent intent = new Intent(Intent.ACTION_VIEW, uri);
startActivity(intent);
</pre>

*(1#104) *四、播放多媒体* %(title)播放多媒体%
<hr />

<pre class="brush: java">
Intent intent = new Intent(Intent.ACTION_VIEW);
Uri uri = Uri.parse("file:///sdcard/foo.mp3");
intent.setDataAndType(uri, "audio/mp3");
startActivity(intent);

Uri uri = Uri.withAppendedPath(MediaStore.Audio.Media.INTERNAL_CONTENT_URI, "1");
Intent intent = new Intent(Intent.ACTION_VIEW, uri);
startActivity(intent);
</pre>

*(1#105) *五、拍照* %(title)拍照%
<hr />

<pre class="brush: java">
// 打开拍照程序
Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE); 
startActivityForResult(intent, 0);
// 取出照片数据
Bundle extras = intent.getExtras(); 
Bitmap bitmap = (Bitmap) extras.get("data"); 
</pre>

*(1#106) *六、获取并剪切图片* %(title)剪切图片%
<hr />

<pre class="brush: java">
Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
intent.setType("image/*");
intent.putExtra("crop", "true"); // 开启剪切
intent.putExtra("aspectX", 1); // 剪切的宽高比为1：2
intent.putExtra("aspectY", 2);
intent.putExtra("outputX", 20); // 保存图片的宽和高
intent.putExtra("outputY", 40); 
intent.putExtra("output", Uri.fromFile(new File("/mnt/sdcard/temp"))); // 保存路径
intent.putExtra("outputFormat", "JPEG");// 返回格式
startActivityForResult(intent, 0);
// 剪切特定图片
Intent intent = new Intent("com.android.camera.action.CROP"); 
intent.setClassName("com.android.camera", "com.android.camera.CropImage"); 
intent.setData(Uri.fromFile(new File("/mnt/sdcard/temp"))); 
intent.putExtra("outputX", 1); // 剪切的宽高比为1：2
intent.putExtra("outputY", 2);
intent.putExtra("aspectX", 20); // 保存图片的宽和高
intent.putExtra("aspectY", 40);
intent.putExtra("scale", true);
intent.putExtra("noFaceDetection", true); 
intent.putExtra("output", Uri.parse("file:///mnt/sdcard/temp")); 
startActivityForResult(intent, 0); 
</pre>

*(1#107) *七、打开Google Market* %(title)打开Google Market%
<hr />

<pre class="brush: java">
// 打开Google Market直接进入该程序的详细页面
Uri uri = Uri.parse("market://details?id=" + "com.demo.app");
Intent intent = new Intent(Intent.ACTION_VIEW, uri);
startActivity(intent);
</pre>

*(1#108) *八、安装和卸载程序* %(title)安装和卸载程序%
<hr />

<pre class="brush: java">
// 安装和卸载程序
Uri uri = Uri.fromParts("package", "com.demo.app", null);  
Intent intent = new Intent(Intent.ACTION_DELETE, uri);  
startActivity(intent); 
</pre>

*(1#109) *九、进入设置页面* %(title)进入设置页面%
<hr />

<pre class="brush: java">
// 进入无线网络设置界面（其它可以举一反三）  
Intent intent = new Intent(android.provider.Settings.ACTION_WIRELESS_SETTINGS);  
startActivityForResult(intent, 0); 
</pre>

*(1#110) *十、调用拨号程序* %(title)调用拨号程序%
<hr />

<pre class="brush: java">
// 给移动客服10086拨打电话
Uri uri = Uri.parse("tel:10086");
Intent intent = new Intent(Intent.ACTION_DIAL, uri);
startActivity(intent);

// <uses-permission android:name="android.permission.CALL_PHONE" />
</pre>

*(1#111) *十一、发送短信或彩信* %(title)发送短信或彩信%
<hr />

<pre class="brush: java">
// 给10086发送内容为“Hello”的短信
Uri uri = Uri.parse("smsto:10086");
Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
intent.putExtra("sms_body", "Hello");
startActivity(intent);
// 发送彩信（相当于发送带附件的短信）
Intent intent = new Intent(Intent.ACTION_SEND);
intent.putExtra("sms_body", "Hello");
Uri uri = Uri.parse("content://media/external/images/media/23");
intent.putExtra(Intent.EXTRA_STREAM, uri);
intent.setType("image/png");
startActivity(intent);

// <uses-permission android:name="android.permission.SEND_SMS" />
</pre>