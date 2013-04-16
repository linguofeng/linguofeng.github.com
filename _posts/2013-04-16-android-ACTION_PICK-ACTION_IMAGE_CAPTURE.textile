---
layout: post
title: Android的中会用到的获取头像的功能
description: 在开发中用到头像的功能
categories: [archive]
tags: [android]
---

<section>
    <h3><small>1.1</small> ACTION_PICK的使用</h3>
    <p>通过相册获取图片</p>
<pre class="prettyprint">
Intent intent = new Intent(Intent.ACTION_PICK);
intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
startActivityForResult(intent, 1);
</pre>

    <h3><small>1.2</small> ACTION_IMAGE_CAPTURE的使用</h3>
    <p>通过相机获取图片</p>
<pre class="prettyprint">
File file = new File(Environment.getExternalStorageDirectory(), "avatar.png");

Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(file));
startActivityForResult(intent, 2);
</pre>

    <h3><small>1.3</small> com.android.camera.action.CROP的作用</h3>
    <p>有时候获取到的图片需要裁剪一下。</p>
<pre class="prettyprint">
File file = new File(Environment.getExternalStorageDirectory(), "temp.png");

Intent intent = new Intent("com.android.camera.action.CROP");
intent.setDataAndType(uri, "image/*");
intent.putExtra("crop", "true");
// aspectX aspectY 是宽高的比例
intent.putExtra("aspectX", 1);
intent.putExtra("aspectY", 1);
// outputX outputY 是裁剪图片宽高
intent.putExtra("outputX", 250);
intent.putExtra("outputY", 250);
// 把图片的数据以Uri的形式返回
//intent.putExtra("return-data", true);

// 有时候为了方便，直接把裁剪好以后的图片直接保存到本地SD卡上
intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(file));
// 输出的格式
intent.putExtra("outputFormat", Bitmap.CompressFormat.PNG.toString());
startActivityForResult(intent, 3);
</pre>
</section>