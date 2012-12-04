---
layout: post
title: Ubuntu安装apt-fast
description: 多线程加速安装与更新软件
categories: [archive]
tags: [ubuntu, apt-get]
---

<section>
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
<pre>
$ sudo add-apt-repository ppa:apt-fast/stable
$ sudo apt-get update
$ sudo apt-get install apt-fast
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、配置</h3>
    </div>
<pre>
$ sudo dpkg-reconfigure apt-fast
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、使用</h3>
    </div>
<pre>
$ sudo apt-fast install PACKAGE
$ sudo apt-fast upgrade
$ sudo apt-fast build-dep PACKAGE
</pre>
</section>
