---
layout: page
title: CMake
description: 跨平台的make编译工具
update: 2013-01-19
---

<section>
    <div class="page-header">
        <h3>安装 <small>环境：ubuntu 12.10</small></h3>
    </div>
<pre>
$ sudo apt-get install cmake
</pre>
</section>

<section>
    <div class="page-header">
        <h3>基本命令</h3>
    </div>
<pre>
# 最低版本要求
cmake_minimum_required(VERSION 2.8)

# 工程名称，同时声明了两个变量：
    # project_name_binary_dir（二进制文件存放目录）
    # project_name_source_dir（源文件存在目录，当前目录）
    # 同时系统自动声明 project_{binary,source}_dir
project(project_name)

# 声明变量，显示变量“${source_list}”
set(source_list main.cpp student.cpp)

# 显示，输出消息的三种类型
    # status        普通消息
    # send_error    产生错误，生成过程被跳过
    # fatal_error   立即终止所有过程 
message(status|send_error|fatal_error "source_list = ${source_list}")
</pre>
</section>
