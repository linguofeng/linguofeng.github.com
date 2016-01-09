---
layout: page
title: "Ruby"
description: "Ruby"
update: 2012-12-06
---

<section id="1">
    <div class="page-header">
        <h1>一、安装RVM <small>管理多个Ruby的工具，很实用</small></h1>
    </div>
    <p>"https://rvm.io/rvm/install":https://rvm.io/rvm/install/</p>
<pre>
$ sudo apt-get install git-core curl
$ bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
$ echo "source \"$HOME/.rvm/scripts/rvm\"" >> $HOME/.bashrc
$ source ~/.bashrc
$ rvm -v
</pre>
    <pre>
        rvm 1.15.7 (stable) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
    </pre>
</section>

<section id="2">
    <div class="page-header">
        <h1>二、安装Ruby</h1>
    </div>
    <pre>
        $ rvm pkg install zlib      // 为避免在安装Jekyll时报cannot load such file -- zlib，先安装zlib
        $ rvm pkg install iconv     // 避免出现iconv will be deprecated in the future, use String#encode instead.
        $ rvm install *1.9.3*
        $ rvm use *1.9.3*
        $ ruby -v
    </pre>
    <pre>
        ruby 1.9.3p194 (2012-04-20 revision 35410) [i686-linux]
    </pre>
</section>

<section id="3">
     <div class="page-header">
          <h1>三、安装Jekyll</h1>
     </div>
     <pre>
        $ gem install jekyll
        $ gem install RedCloth
     </pre>
</section>
