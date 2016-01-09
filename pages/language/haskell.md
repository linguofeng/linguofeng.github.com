---
layout: page
title: "Haskell"
description: "函数式编程语言"
navigation: [1.安装, 2.HelloWorld]
update: 2013-05-22
---

<section id="1">
    <div class="page-header">
        <h3>一、安装Haskell</h3>
    </div>
<pre>
$ brew install haskell-platform
$ cabal update  # 更新库
</pre>

</section>

<section id="2">
    <div class="page-header">
        <h3>二、Hello World</h3>
    </div>
<pre>
$ ghci
Prelude> print "Hello World!!"
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>三、开发工具配置</h3>
    </div>
    <p>主要使用的开发工具是vim，所以就配置vim用于haskell学习。</p>
<pre>
$ cd .vim
$ git submodule add git://github.com/lukerandall/haskellmode-vim.git \
    bundle/haskellmode
$ vim ~/.vimrc
</pre>
<pre>
"---------------------------------------------------
" haskell配置
"---------------------------------------------------
let g:haddock_browser = "open"
let g:haddock_browser_callformat = "%s %s"
</pre>
</section>
