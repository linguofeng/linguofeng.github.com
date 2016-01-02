---
layout: post
title: Android中获取状态栏的高度
description: Android中获取状态栏的高度
categories: [archive]
tags: [android]
---

<section>
    <h4>代码</h4>
<pre class="prettyprint">
/**
 * @brief GetStatusBarHeight 获取状态栏的高度
 *
 * @return 
 */
public static int GetStatusBarHeight() {
    int statusBarHeight = 0;
    
    if (mActivity != null) {
        Rect rectgle = new Rect();
        Window window = mActivity.getWindow();
        window.getDecorView().getWindowVisibleDisplayFrame(rectgle);
        statusBarHeight= rectgle.top;
    }

    return statusBarHeight;
}   
</pre>