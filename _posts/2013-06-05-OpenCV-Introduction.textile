---
layout: post
title: OpenCV Introduction
description: OpenCV简介
categories: [archive]
tags: [opencv]
---

<section>
    <p>OpenCV是一个开源的计算机视觉库，具有模块化。</p>

table(table table-bordered).
|_.模块|_.说明|
|core|核心模块，包括基本的数据结构，例如cv::Mat。|
|imgproc|图像处理模块，包括图像过滤、图像转换、颜色空间转换和直方图等。|
|video|视频分析模块，包括运行估计、背景减法和对象跟踪算法等。|
|calib3d|基本的多视图几何算法、单一和立体摄像机标定、 对象的姿势估计、 立体声函授算法和元素的三维重建。|
|features2d|特征探测器|
|objdetect|对象检测，可做人脸识别、汽车识别等对象识别功能。|
|highgui|用户界面接口。|
|gpu|GPU加速算法。|

    <h4>API概念</h4>
    <h5>cv命名空间</h5>
    <p>所有的OpenCV类和函数都放在cv命名空间中，因此要使用OpenCV中的类或函数需要使用cv命名空间来访问。</p>
<pre class="prettyprint">
cv::Mat A;
</pre>
    <p>如果与stl或其它库的名称冲突则需要显式命名空间来访问。</p>
<pre class="prettyprint">
cv::log(1)
std::log(1)
</pre>
    <h5>自动内存管理</h5>
    <p>OpenCV自动处理所有内存</p>
    <p>OpenCV通过引用计数的方式来进行内存自动管理</p>
<pre class="prettyprint">
Mat A(1000, 1000, CV_64F);  // 创建一个新的Mat对象
Mat B = A;                  // B引用A
Mat C = B.clone();          // 克隆B赋给C，此时C是一个新对象，操作不会影响到A
Mat D;
C.copyTo(D);                // 拷贝C给D，此时D是一个新的对象，操作不会影响到C
</pre>
    <h5>自动释放与分配输出数据</h5>
    <p>OpenCV 自动释放内存，以及自动分配的内存为输出函数参数的大部分时间。</p>
    <h5>饱和度算法</h5>
    <p>cv::uchar是8位无符号整数类型</p>
    <h5>模块</h5>
table(table table-bordered).
|_.类型|_.说明|_.对应的枚举值|_.多通道|
|uchar|8位无符号整数|CV_8U=0|CV_8UC(n)|
|schar|8位有符号整数|CV_8S=1|CV_8SC(n)|
|ushort|16位无符号整数|CV_16U=2|CV_16UC(n)|
|short|16位有符号整数|CV_16S=3|CV_16SC(n)|
|int|32位有符号整数|CV_32S=4|CV_32SC(n)|
|float|32位浮点数|CV_32F=5|CV_32FC(n)|
|double|64位浮点数|CV_64F=6|CV_64FC(n)|

<p>多通道也可以使用CV_MAKETYPE函数来创建，例如 @CV_MAKETYPE(CV_8U, n)@</p>
<pre class="prettyprint">
Mat mtx(3, 3, CV_32F); // 创建3x3浮点矩阵
Mat cmtx(10, 1, CV_64FC2); // 创建10x1双通道浮点矩阵，10元素复杂向量
Mat img(Size(1920, 1080), CV_8UC3); // 创建1920列，1080行的3通道颜色的图像
Mat grayscale(image.size(), CV_MAKETYPE(image.depth(), 1)); // 创建与image同大小，同通道类型的单通道图像
</pre>
    <p>人脸识别算法能适用于8位灰度图像或彩色图像</p>
    <h5>异常处理</h5>
<pre class="prettyprint">
try
{
    ... // call OpenCV
}
catch( cv::Exception& e )
{
    const char* err_msg = e.what();
    std::cout << "exception caught: " << err_msg << std::endl;
}
</pre>
    <h5>多线程</h5>
    <p>OpenCV直接在多线程中访问同一个Mat对象，通过引用计数的方式，达到内存共享。</p>
</section>

<p>参考: http://docs.opencv.org/modules/core/doc/intro.html</p>