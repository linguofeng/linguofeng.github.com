---
layout: default
title: Ant
description: 项目构建工具
---

<section>
    <div class="page-header">
        <h1>安装 <small>环境：Ubuntu 12.04.1</small></h1>
    </div>
    <p>下载：http://ant.apache.org/download.html</p>
    <pre>
        $ mkdir /path/to/apache
        $ mv apache-ant-1.8.4-bin.tar.gz /path/to/apache
        $ tar -zxvf apache-ant-1.8.4-bin.tar.gz
        $ subl ~/.bashrc
        $ ant -version
    </pre>
    <pre>
        export ANT_HOME=/path/to/apache/apache-ant-1.8.4
        PATH=$PATH:$ANT_HOME/bin
    </pre>
    <pre>
        Apache Ant(TM) version 1.8.4 compiled on May 22 2012
    </pre>
</section>
