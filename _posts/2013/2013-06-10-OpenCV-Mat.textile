---
layout: post
title: OpenCV Mat
description: 基本图像容器
categories: [archive]
tags: [opencv]
---

<section>
    <p>Mat是OpenCV中基本的图像容器，2.0之前的版本是IplImage对象。它比IplImage有一个好处就是不需要再手动内存，而是让程序自动管理。</p>
    <p>Mat类带有两部分数据：矩阵的头信息与一个像素数据指针。</p>
    <p>Mat的内存管理，每个Mat对象有自己的头信息，当拷贝的时候只是拷贝头信息与指针地址。不是数据本身。</p>
<pre class="prettyprint">
Mat A, C; // 创建A与C两个Mat对象，只包含头信息部分。
A = imread("image.jpg", CV_LOAD_IMAGE_COLOR); // 读取图片并把图像的数据指针赋值给A

Mat B(C); // 使用拷贝构造函数

C = A;  // 使C等于A，头信息
</pre>
    <p>上面三种方式创建Mat对象只有头信息部分是不同的，指针都指向了相同的图像数据，如果修改其中任意一个Mat对象的图像，那大家都会受到影响。</p>
    <p>通过范围的大小来创建一个Mat对象</p>
<pre class="prettyprint">
Mat D(A, rect(x, y, width, height));        // 通过范围来创建
Mat E = A(Range:all(), Range(row, column)); // 通过行列来创建
</pre>
    <p>通过构造函数创建</p>
<pre class="prettyprint">
Mat M(row, column, type, ScalarObj);

Mat M(2, 2, CV_8UC3, Scalar(0, 0, 255));
</pre>
    <p>通过数组来创建</p>
<pre class="prettyprint">
int sz[3] = {2, 2, 2};
Mat L(3, sz, CV_8UC(1), Scalar::all(0)); // 8位1通道
</pre>
    <p>通过IplImage创建</p>
<pre class="prettyprint">
IplImage *img = cvLoadImage("image.jpg", 1);
Mat mtx(img);
</pre>
    <p>通过create方法</p>
<pre class="prettyprint">
Mat M;
M.create(row, column, type);
</pre>
</section>