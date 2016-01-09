---
layout: page
title: "Node.js"
description: "服务器端JavaScript"
navigation: [1.安装, 2.HelloWorld]
update: 2013-02-22 16:21
---

<section id="1">
    <div class="page-header">
        <h3>一、安装Nodejs</h3>
    </div>

    <h4><small>1.1</small> -ubuntu 12.10 x32-</h4>
<pre>
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs npm   # npm为Nodejs的包管理器
</pre>

    <h4><small>1.2</small> -OS X-</h4>
<pre>
$ brew install node
    add /usr/local/share/npm/bin to $PATH
</pre>

    <h4><small>1.3</small> nvm</h4>
<pre>
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
$ nvm ls
$ nvm install 0.8
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、Hello World</h3>
    </div>
<pre>
$ echo "console.log('Hello World!!');" > hello-world.js
$ node hello-world.js
</pre>
</section>
