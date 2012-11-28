---
layout: post
title: Ubuntu安装SublimeClang插件
description: Ubuntu安装SublimeClang插件
categories: [archive]
tags: [ubuntu, Sublime Text 2, Clang]
---

<section>
    <div class="page-header">
        <h3>一、安装pythonbrew来安装Python2.6</h3>
    </div>
<pre>
$ curl -kL http://xrl.us/pythonbrewinstall | bash
$ source "$HOME/.pythonbrew/etc/bashrc"
$ pythonbrew install --configure="--enable-unicode=ucs4" 2.6
# 这一步会安装错误，修改$HOME/.pythonbrew/dists/Python-2.6.tgz压缩包中的Makefile.pre.in文件，搜索［-DSVNVERSION=\"`LC_ALL=C svnversion .`\"］改成［-DSVNVERSION="\"`LC_ALL=C svnversion .`\""］后重新执行pythonbrew install --configure="--enable-unicode=ucs4" 2.6安装．
$ ln -s $HOME/.pythonbrew/pythons/Python-2.6/lib/python2.6/ <your Sublime Text 2 folder>/lib/python2.6
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、Clang编译环境</h3>
    </div>
<pre>
$ sudo apt-get install clang
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、编译libcache.so</h3>
    </div>
<pre>
$ cd $HOME/.config/sublime-text-2/Packages/SublimeClang/src
$ mkdir build && cd build
$ cmake ..
$ make
</pre>
</section>
