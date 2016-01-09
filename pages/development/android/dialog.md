---
layout: default
category: Android
title: Dialog 对话框
description: 有四种：警告对话框、进度对话框、日期选择对话框、时间选择对话框
navigation: [1.AlertDialog, 2.ProgressDialog, 3. DatePickerDialog, 4.TimePickerDialog]
---

<section id="1">
    <div class="page-header">
        <h3>AlertDialog <small>警告对话框</small></h3>
    </div>
    <pre class="prettyprint linenums">
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("对话框标题");
        builder.setMessage("对话框内容");
        builder.setXXX(); // 其它参数
        AlertDialog dialog = builder.create();
        dialog.show();
    </pre>
p. 更多参数访问 "http://developer.android.com/reference/android/app/AlertDialog.Builder.html":http://developer.android.com/reference/android/app/AlertDialog.Builder.html
</section>

<section id="2">
    <div class="page-header">
        <h3>ProgressDialog <small>进度对话框</small></h3>
    </div>
    
    <pre class="prettyprint linenums">
        ProgressDialog pd = new ProgressDialog(this);
        pd.setMessage("内容");
        pd.setXXX(); // 其它参数
        // 显示
        pd.show();
        // 销毁
        pd.dismiss();
    
        // 进度条对话框有两种显示样式，通过
        pd.setProgressStyle(0/1); // 0表示圆形，1表示水平
    </pre>
    
p. 更多参数访问 "http://developer.android.com/reference/android/app/ProgressDialog.html":http://developer.android.com/reference/android/app/ProgressDialog.html
</section>