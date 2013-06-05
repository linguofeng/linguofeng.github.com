---
layout: post
title: OpenCV Display Image
description: OpenCV显示一张图片
categories: [archive]
tags: [opencv]
---

<section>
    <p>DisplayImage.cpp</p>
<pre class="prettyprint">
#include <stdio.h>
#include <opencv2/opencv.hpp>

using namespace cv;

int main( int argc, char** argv )
{
  Mat image;
  image = imread( argv[1], 1 );

  if( argc != 2 || !image.data )
    {
      printf( "No image data \n" );
      return -1;
    }

  namedWindow( "Display Image", CV_WINDOW_AUTOSIZE );
  imshow( "Display Image", image );

  waitKey(0);

  return 0;
}
</pre>

    <p>CMakeLists.txt</p>
<pre class="prettyprint">
cmake_minimum_required(VERSION 2.8)
project( DisplayImage )
find_package( OpenCV REQUIRED )
add_executable( DisplayImage DisplayImage.cpp )
target_link_libraries( DisplayImage ${OpenCV_LIBS} )
</pre>

<pre>
$ mkdir build
$ cd build
$ cmake ..
$ DisplayImage ~/test.png
</pre>
</section>