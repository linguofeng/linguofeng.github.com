---
layout: post
title: OSX Install OpenCV
description: 苹果系统安装OpenCV
categories: [archive]
tags: [osx, opencv]
---

<section>
    <p>通过homebrew安装opencv</p>
<pre>
$ brew tap homebrew/science
$ brew install opencv
</pre>

    <p>配置vim自动补全与查看源码，只有头文件</p>
<pre>
$ /usr/local/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q \
    /usr/local/include/opencv
$ mv tags ~/.vim/tags/opencv
$ /usr/local/bin/ctags -R --c++-kinds=+p --fields=+iaS --extra=+q \
    /usr/local/include/opencv2
$ mv tags ~/.vim/tags/opencv2
$ vim ~/.vimrc

    set tags+=~/.vim/tags/opencv
    set tags+=~/.vim/tags/opencv2
</pre>
</section>