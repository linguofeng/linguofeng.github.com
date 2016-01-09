---
layout: page
title: "tmux"
description: "tmux"
navigation: [1.安装, 2.配置, 3.基本操作与快捷键]
update: 2013-03-30 23:11
---

<section id="1">
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
<pre>
$ brew install tmux
</pre>

</section>

<section id="2">
    <div class="page-header">
        <h3>二、配置</h3>
    </div>
    <h4><small>2.1</small> .tmux.conf</h4>
<pre class="prettyprint">
#设置PREFIX为Ctrl-a
set -g prefix C-a
#解除Ctrl-b与PREFIX的对应关系
unbind C-b
#copy-mode将快捷键设置为vi模式
setw -g mode-keys vi

#将r键设置为加载配置文件，并显示"reloaded!"信息
bind r source-file ~/.tmux.conf \; display "Reloaded!"
#设置终端颜色为256色
set -g default-terminal "screen-256color"
#开启status-bar uft-8支持
set -g status-utf8 on

# 开启鼠标模式
set -g mode-mouse on
set -g mouse-resize-pane on
set -g mouse-select-pane on
set -g mouse-select-window on

# 水平分割面板
unbind '"'
bind - splitw -v

# 垂直分割面板
unbind %
bind | splitw -h

# 绑定上j下k左l右h来方便在面板中切换
bind k selectp -U
bind j selectp -D
bind h selectp -L
bind l selectp -R

# 解决复制粘贴的问题
# $ brew install reattach-to-user-namespace
set-option -g default-command "reattach-to-user-namespace -l zsh"
</pre>
    <h4><small>2.2</small> 解决vim复制粘贴的问题</h4>
<pre>
$ brew install reattach-to-user-namespace
$ vim .tmux.conf
</pre>
<pre>
set-option -g default-command "reattach-to-user-namespace -l zsh"
</pre>
<p>参考：https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard</p>
    <h4><small>2.3</small> 安装tmux-powerline</h4>
<pre class="prettyprint">
# see https://github.com/erikw/tmux-powerline
# 字体打补丁 https://github.com/Lokaltog/vim-powerline/tree/develop/fontpatcher
$ brew install fontforge
$ fontforge -script fontpatcher Monaco.dfont
# 安装Monaco-Powerline.otf即可
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、基本操作与快捷键</h3>
    </div>
<pre class="prettyprint">
$ tmux new -s name      # 启动新的session，如果加 -d 参数则启动一个后台session
$ tmux ls               # 列出所有未退出的session，通过 PREFIX d 退出的session
$ tmux attach -t name   # 连接未退出的session
</pre>
<pre class="prettyprint">
PREFIX [                # 进入滚屏模式，操作方式为vi快捷键，hjkl c+b c+f，q或enter结束滚屏
PREFIX c                # create 创建一个window
PREFIX ,                # 修改当前window的名称
PREFIX x                # 关闭当前pane或window，注意pane与window的区别
PREFIX d                # detach 断开当前session，此时转为后台session
PREFIX 0-9              # 根据下标选择window
PREFIX p                # 切换至上一个window
PREFIX n                # 切换至下一个window
PREFIX w                # 提供一个列表选择要切换的window
PREFIX |                # 垂直拆分window，即创建pane
PREFIX -                # 水平拆分
PREFIX o                # 在pane中进行切换
PREFIX hjkl             # 左下上右地进行pane切换
PREFIX $                # 修改当前session的名称
</pre>
<p>参考：http://www.openbsd.org/cgi-bin/man.cgi?query=tmux</p>
</section>
