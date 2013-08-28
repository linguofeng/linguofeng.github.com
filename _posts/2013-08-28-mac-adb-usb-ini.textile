---
layout: post
title: Mac adb_usb.ini
description: 解决有些手机在Mac系统下没有驱动的问题
categories: [archive]
tags: [android]
---

<section>
    <h4>获取手机的Vendor ID</h4>
<pre>
$ system_profiler SPUSBDataType
</pre>

<pre>
Android:

  Product ID: 0x3f10
  Vendor ID: 0x1d91
  Version: 2.31
  Serial Number: MotorolaXT788
  Speed: Up to 480 Mb/sec
  Manufacturer: Android
  Location ID: 0x1d112000 / 8
  Current Available (mA): 500
  Current Required (mA): 500
</pre>
</section>

<section>
    <h4>创建adb_usb.ini</h4>
<pre>
$ vim ~/.android/adu_usb.ini
</pre>
    <p>添加0x1d91</p>
    <p>重新连接usb接口，完成。</p>
</section>