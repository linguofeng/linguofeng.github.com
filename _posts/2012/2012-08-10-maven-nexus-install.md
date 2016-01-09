---
layout: post
title: Maven+Nexus私服搭建
description: 创建高速的本地（局域网）Maven仓库
categories: [archive]
tags: [maven, nexus]
navigation: [1.下载, 2.安装, 3.完成, 4.配置]
---

<section id="1">
    <div class="page-header">
        <h3>一、下载 <small>直接通过官方下载最新的开源版，里面也有详细的安装教程。</small></h3>
    </div>

    <pre>
        官方下载地址：http://www.sonatype.org/nexus/go
    </pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、安装 <small>安装过程很简单，只需要把文件拷贝到某路径下即可。</small></h3>
    </div>
<pre>
$ sudo mkdir -p /opt/nexus              // 创建/opt/nexus/目录
$ sudo chmod 777 /opt/nexus             // 给/opt/nexus/目录可读可写可执行权限
$ tar xvzf nexus-2.x.x-bundle.tgz       // 解压缩
$ cp -r nexus-2.x.x /opt/nexus/         // 拷贝到/opt/nexus/目录下
</pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、完成 <small>安装完成就可以启动来验证是否安装成功，如果提示：Failed to start Nexus OSS.就有可能是权限问题。</small></h3>
    </div>
</pre>
</section>

<section id="4">
    <div class="page-header">
        <h3>四、配置 <small>进行简单的配置实现官方仓库本地映射。</small></h3>
    </div>

    <p><h4>基本配置 <small>主要实现本地创建代理远程仓库。</small></h4></p>
<pre>
1、打开WEB管理界面：http://127.0.0.1:8081/nexus/index.html
2、点击右上角Log In进行登录，默认帐号：admin、密码：admin123
3、点击左侧Repositories项 -> central仓库 -> Configuration -> Download Remote Indexes=True -> Save，表示下载远程仓库的索引。
4、右键central仓库 -> Update Index，更新远程仓库索引到本地，这一步能够加速本地索引。
</pre>
    
    <p><h4>Maven配置 <small>配置Maven默认使用本地仓库，修改setting.xml全局配置文件。</small></h4></p>
<pre>
$ vim ~/.m2/setting.xml
</pre>
<pre class="prettyprint">
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <!-- 配置central镜像地址为本地仓库，加速索引速度 -->
  <mirrors>
    <mirror>
      <id>central</id>
      <mirrorOf>central</mirrorOf>
      <name>central</name>
      <url>http://127.0.0.1:8081/nexus/content/repositories/central</url>
    </mirror>
  </mirrors>
  
  <!-- 配置发布仓库，第一个为正式版仓库，第二个为快照版仓库。 -->
  <profiles>
    <!-- 执行：$ mvn release:prepare 命令时会打包并发布到该仓库。 -->
    <profile>
      <id>nexus</id>
      <repositories>
        <repository>
          <id>nexus</id>
          <name>local private nexus</name>
          <url>http://127.0.0.1:8081/nexus/content/groups/public</url>
        </repository>
      </repositories>
    </profile>
    <!-- 执行：$ mvn deploy 命令时会打包并发布到该仓库。 -->
    <profile>
      <id>nexus-snapshots</id>
      <repositories>
        <repository>
          <id>nexus-snapshots</id>
          <name>local private nexus snapshots</name>
          <url>http://127.0.0.1:8081/nexus/content/groups/public-snapshots</url>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <!-- servers节点的属性是在向仓库发布时使用 -->
  <servers>
    <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
  </servers>

  <!-- 激活配置 -->
  <activeProfiles>
    <activeProfile>nexus</activeProfile>
    <activeProfile>nexus-snapshots</activeProfile>
  </activeProfiles>
</settings>
</pre>
</section>

<section>
    <div class="page-header">
        <h3>参考</h3>
    </div>
<pre>
官方教程：http://sonatype.com/books/nexus-book/reference/index.html
很详细的教程：http://juvenshun.iteye.com/blog/349534
</pre>
</section>
