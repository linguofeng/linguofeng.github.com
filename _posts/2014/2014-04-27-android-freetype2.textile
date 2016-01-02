---
layout: post
title: Android Freetype2
description: 编译Freetype2静态库
categories: [archive]
tags: [opengl, freetype2]
---

<section>
<p>下载源码包: http://download.savannah.gnu.org/releases/freetype</p>
<p>设置构建环境:</p>
<pre>
$ $NDK_ROOT/build/tools/make-standalone-toolchain.sh --platform=android-19 --install-dir=~/standalone-toolchain-19
$ PATH=~/standalone-toolchain-19/bin:$PATH
</pre>
<p>解压freetype</p>
<pre>
$ cd Download
$ tar xf freetype-2.5.3.tar.bz2
$ cd freetype-2.5.3
$ ./configure --host=arm-linux-androideabi --prefix=/freetype --without-zlib --enable-static --disable-shared
$ make -j4
$ make install DESTDIR=$(pwd)
</pre>
<p>然后在freetype-2.5.3/freetype目录里就是编译好的文件</p>
</section>
<p>参考：http://my.oschina.net/nkm/blog/111831</p>
<p>参考：http://en.wikibooks.org/wiki/OpenGL_Programming/Installation/Android#FreeType</p>
