---
layout: post
title: Arduion And inotool
description: 使用inotool工具开发Arduino应用
categories: [archive]
tags: [Arduino, inotool]
---

<section>
    <p>Ino是Arduino的一个命令行工具，可以创建Arduino工程与工程的编译部署。</p>
    <h5>安装ino</h5>
<pre>
$ sudo pip install ino
</pre>

    <h5>创建Arduino工程</h5>
<pre>
$ mkdir inotest
$ cd inotest
$ ino init
</pre>

    <h5>编译Arduino工程</h5>
<pre>
$ ino build
</pre>

    <h5>上传到Arduino</h5>
<pre>
$ ino upload
</pre>

    <h5>有了inotool现在就可以使用熟悉的vim进行开发，不过首先要安装代码高亮</h5>
<pre>
$ mkdir -p ~/.vim/bundle/arduino/syntax && cd $_
$ wget http://www.vim.org/scripts/download_script.php?src_id=17108
$ vim ~/.vimrc
</pre>
<pre>
autocmd! BufNewFile,BufRead *.ino setlocal ft=arduino
</pre>

    <h5>安装picocom</h5>
<pre>
$ brew install picocom              # OS X
$ sudo apt-get install picocom      # Raspberry Pi
$ ino serial                        # 启动picocom查看串口的信息，用于Debug用
</pre>

    <h5>第三方库的依赖</h5>
    <p>ino创建的工程目录下有两个子目录 @src@ 与 @lib@ , src是源文件存放目录，lib是第三方库的存放目录，例如做红外传感器的时候需要用到IRremote这个第三方库那就需要放到lib目录中。</p>
<pre>
$ cd $INO_PROJECT/lib
$ git clone https://github.com/shirriff/Arduino-IRremote.git IRremote
</pre>

    <p>inotool: "http://inotool.org":http://inotool.org</p>
</section>