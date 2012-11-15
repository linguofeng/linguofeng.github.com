---
layout: default
title: AnimationDrawable
description: Android逐帧动画
---
<section>
    <div class="page-header">
        <h1>一、XML资源文件 <small>res/drawable/spin_animation.xml</small></h1>
    </div>
<pre class="prettyprint">
<animation-list android:id="selected" android:oneshot="false">
   <item android:drawable="@drawable/wheel0" android:duration="50" />
   <item android:drawable="@drawable/wheel1" android:duration="50" />
   <item android:drawable="@drawable/wheel2" android:duration="50" />
   <item android:drawable="@drawable/wheel3" android:duration="50" />
   <item android:drawable="@drawable/wheel4" android:duration="50" />
   <item android:drawable="@drawable/wheel5" android:duration="50" />
</animation-list>
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、使用</h1>
    </div>
<pre class="prettyprint">
ImageView img = (ImageView)findViewById(R.id.spinning_wheel_image);
// 设置动画
img.setBackgroundResource(R.drawable.spin_animation);
// 获取动画
AnimationDrawable frameAnimation = (AnimationDrawable) img.getBackground();
// 启动动画
frameAnimation.start();
</pre>
</section>

p. 更多参数访问 "http://developer.android.com/reference/android/graphics/drawable/AnimationDrawable.html":http://developer.android.com/reference/android/graphics/drawable/AnimationDrawable.html
