---
layout: default
title: "Scala"
description: "运行于JVM虚拟机的语言，能够与JAVA相互调用！！"
navigation: [1.安装Scala, 2.安装SBT, 3.安装Giter8]
---

<section id="1">
  <div class="page-header">
    <h3>一、安装Scala <small></small></h3>
  </div>
  <p>"http://www.scala-lang.org/":http://www.scala-lang.org/</p>
  <pre>
    $ axel -n 10 http://www.scala-lang.org/downloads/distrib/files/scala-2.9.2.tgz // axel是linux下多线程下载工具
    $ mv scala-2.9.2.tgz /path/to/     // 拷贝到/path/to/目录
    $ cd /path/to/                     // 进入/path/to/目录
    $ tar -zxvf scala-2.9.2.tgz        // 解压scala-2.9.2.tgz
    $ subl ~/.bashrc                   // 添加环境变量
  </pre>
  <pre>
    export SCALA_HOME=/path/to/scala-2.9.2
    PATH=$PATH:$SCALA_HOME/bin
  </pre>
</section>

<section id="2">
  <div class="page-header">
    <h3>二、安装SBT <small>SBT（Simple Build Tool），是一个快速构建Scala工程的命令行工具。</small></h3>
  </div>
  <p>"http://www.scala-sbt.org/":http://www.scala-sbt.org/</p>
  <pre>
    $ <a href="javascript:void(0)" rel="popover" data-content="Axel是一个多线程下载工具，安装办法：$ sudo apt-get install axel" data-original-title="Axel">axel</a> -n 10 http://scalasbt.artifactoryonline.com/scalasbt/sbt-native-packages/org/scala-sbt/sbt/0.12.0/sbt.tgz
    $ mv sbt.tgz /path/to/
    $ cd /tp/path/
    $ tar -zxvf sbt.tgz
    $ subl ~/.bashrc
  </pre>
  <pre>
    export SBT_HOME=/path/to/sbt
    PATH=$PATH:$SBT_HOME/bin
  </pre>
</section>

<section id="3">
  <div class="page-header">
    <h3>二、安装Giter8 <small>一个从github上获取模板工程的命令行工具。</small></h3>
  </div>
  <p>"https://github.com/n8han/giter8":https://github.com/n8han/giter8</p>
  <pre>
    $ curl https://raw.github.com/n8han/conscript/master/setup.sh | sh  // 安装conscript
    $ cs n8han/giter8                                                   // 安装giter8
  </pre>
</section>
