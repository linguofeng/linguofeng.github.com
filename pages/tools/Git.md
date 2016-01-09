---
layout: page
category: Tools
title: Git
description: 版本管理工具
---

<section>
    <div class="page-header">
        <h3>一、安装</h3>
    </div>

<pre>
$ sudo apt-get install git-core git-doc git-gui gitk
$ git config --global user.name "linguofeng"
$ git config --global user.email linguofeng@msn.com
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、基本操作</h3>
    </div>
    
<pre>
$ git init                // 初始化一个Git版本库
$ git add .               // 添加文件到版本库（未正式添加）
$ git commit -m 'message' // 提交文件到当前版本库的.git
$ git push                // 提交到仓库
</pre>
</section>

<section>
    <div class="page-header">
        <h3>Gitolite安装 <small>本机安装，环境：Ubuntu 12.04.1</small></h3>
    </div>
<p>安装依赖</p>
<pre>
$sudo apt-get install openssh-server
</pre>
<p>生成SSH KEY</p>
<pre>
$ ssh-keygen -t rsa -C "linguofeng@msn.com"
$ cp ~/.ssh/id_rsa.pub /tmp/linguofeng@msn.com.pub
</pre>
<p>创建git用户</p>
<pre>
$ sudo adduser \
    --system \
    --shell /bin/bash \
    --gecos 'git version control' \
    --group \
    --disabled-password \
    --home /home/git \
    git
</pre>
<p>使用git用户登录</p>
<pre>
$ sudo su git
$ echo "PATH=$HOME/bin:$PATH" > ~/.bashrc
$ cd ~
</pre>
<p>安装Gitolite</p>
<pre>
$ git clone git://github.com/sitaramc/gitolite.git
$ mkdir -p ~/bin
$ gitolite/install -to ~/bin
$ gitolite setup -pk /tmp/linguofeng@msn.com.pub
</pre>
<p>成功的提示</p>
<pre>
Initialized empty Git repository in /home/git/repositories/gitolite-admin.git/
Initialized empty Git repository in /home/git/repositories/testing.git/
WARNING: /home/git/.ssh missing; creating a new one
WARNING: /home/git/.ssh/authorized_keys missing; creating a new one
</pre>
<p>配置（在客户端执行）</p>
<pre>
$ git clone git@localhost:gitolite-admin.git
</pre>
</section>

<section>
    <div class="page-header">
        <h3>安装Gitweb <small>依赖apache</small></h3>
    </div>
<pre>
$ sudo apt-get install apache2 gitweb highlight
</pre>
<p>@$ sudo subl /etc/gitweb.conf@</p>
<pre>
$projectroot = "/home/git/repositories";
$projects_list = "/home/git/projects.list";
$feature{'highlight'}{'default'} = [1];
</pre>
<p>设置权限</p>
<pre>
$ sudo usermod -a -G git www-data
$ sudo chmod g+r /home/git/projects.list
$ sudo chmod -R g+rx /home/git/repositories
$ sudo service apache2 restart
</pre>
<p>添加库到gitweb中显示</p>
<p>@$ subl gitolite-admin/conf/gitolite.conf@</p>
<pre>
repo demo
    RW+     =   linguofeng@msn.com
    R       =   gitweb                  // 实际会在/home/git/projects.list文件中添加demo.git
</pre>
<p>打开URL： "http://localhost/gitweb":http://localhost/gitweb</p>
</section>

<section>
    <div class="page-header">
        <h3>参考：</h3>
    </div>
    
    <pre>
        http://gitref.org/
        http://git-scm.com/book/zh
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>技巧</h3>
    </div>
    <h4>Git修改最后提交的Message</h4>
<pre>
git commit --amend -m "New commit message"
</pre>
</section>