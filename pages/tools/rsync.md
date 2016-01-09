---
layout: default
category: Tools
title: "rsync"
description: "文件同步工具"
---

<section>
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
    <h4>ubuntu 12.10 x32</h4>
<pre>
$ sudo apt-get install rsync
$ sudo apt-get install grsync   # 图形化前端
</pre>

    <h4>Mac OS X</h4>
<pre>
$ curl -O http://rsync.samba.org/ftp/rsync/rsync-3.0.9.tar.gz             # 下载源代码
$ curl -O http://rsync.samba.org/ftp/rsync/rsync-patches-3.0.9.tar.gz     # 下载补丁
$ tar -xzvf rsync-3.0.9.tar.gz
$ tar -xzvf rsync-patches-3.0.9.tar.gz
$ cd rsync-3.0.9
$ patch -p1 < patches/xxx.diff                                            # 打补丁
$ ./prepare-source
$ ./configure
$ make
$ sudo make install
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、使用</h3>
    </div>
<pre>
$ rsync -r -t -v --progress -s /源目录 /目标目录

-v          # 显示详细信息
--progress  # 显示进度
-s          # 显示速度
</pre>
</section>
