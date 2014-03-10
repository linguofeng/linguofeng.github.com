---
layout: post
title: Cocos2d-x queueEvent
description: Cocos2d-x中Java调C/C++方法更新UI的坑
categories: [archive]
tags: [cocos2dx, queueEvent]
---

<section>
<p>坑惨了。。。</p>
<p>Java中回调C/C++方法更新OpenGL的UI时一定不能直接调用或使用runOnUiThread调用，必须使用</p>
<pre class="prettyprint">
// 定义jni接口
native private static void updateOpenGLUI();

Cocos2dxGLSurfaceView.getInstance().queueEvent(new Runnable() {
    @Override
    public void run() {
        updateOpenGLUI();
    }
});
</pre>
</section>
