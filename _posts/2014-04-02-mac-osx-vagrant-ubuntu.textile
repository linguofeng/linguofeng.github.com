---
layout: post
title: Mac vagrant ubuntu
description: OSX 使用vagrant安装ubuntu环境
categories: [archive]
tags: [vagrant, ubuntu]
---

<section>
<p>由于需要在mac下使用ubuntu环境，如果要建一个虚拟机太费事了，还费内存，现在使用vagrant非常简单，这里记录一下</p>
<p>首先安装 https://github.com/phinze/homebrew-cask，这个brew的一个扩展命名，能够通过命令行安装dmg的应用</p>
<pre>
$ brew tap phinze/cask
$ brew install brew-cask
</pre>
<p>安装vagrant与virtualbox</p>
<pre>
$ brew cask install vagrant
$ brew cask install virtualbox
</pre>
<p>下载ubuntu的box</p>
<pre>
$ mkdir ubuntu
$ cd ubuntu
$ wget http://files.vagrantup.com/precise32.box
</pre>
<p>创建与初始化ubuntu box</p>
<pre>
$ vagrant box add ubuntu ./precise32.box
$ vagrant init ubuntu
</pre>
<p>接下来就可以使用ssh登录了</p>
<pre>
$ vagrant up
$ vagrant ssh
</pre>
<p>完</p>
<p>参考：http://blog.segmentfault.com/fenbox/1190000000264347</p>
</section>
