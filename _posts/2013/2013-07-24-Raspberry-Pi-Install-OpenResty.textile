---
layout: post
title: Raspberry Pi Install OpenResty
description: 树莓派安装OpenResty服务
categories: [archive]
tags: [Raspberry Pi, OpenResty]
---

<section>
    <h4>OpenResty是一个全功能的web服务器，以Nginx为核心，集成了Lua模块。</h4>
<pre>
$ ssh pi@raspberrypi.local
$ sudo apt-get update
$ sudo apt-get install libreadline-dev libpcre3-dev libssl-dev perl libncurses5-dev
$ wget http://openresty.org/download/ngx_openresty-1.4.1.1.tar.gz
$ tar xzvf ngx_openresty-1.4.1.1.tar.gz
$ cd ngx_openresty-1.4.1.1
$ ./configure --with-luajit
$ make
$ make install
</pre>
</section>

<section>
    <h4>Hello World</h4>
<pre>
$ mkdir work
$ cd work
$ mkdir logs/ conf/
</pre>
<pre>
worker_processes  1;
error_log logs/error.log;
events {
        worker_connections 1024;
}
http {
    server {
        listen 8080;
        location / {
            default_type text/html;
            content_by_lua '
                ngx.say("<p>hello, world</p>")
            ';
        }
    }
}
</pre>
<pre>
$ PATH=/usr/local/openresty/nginx/sbin:$PATH
$ export PATH
$ nginx -p `pwd`/ -c conf/nginx.conf
</pre>
</section>