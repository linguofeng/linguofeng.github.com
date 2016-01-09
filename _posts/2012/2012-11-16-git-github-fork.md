---
layout: post
title: Github中Fork的使用
description: 在Github中Fork自己的版本库并与原版本库同步
categories: [archive]
tags: [git]
---

<section>
    <div class="page-header">
        <h1>一、fork <small>把别人的版本库变成自己的</small></h1>
    </div>
    <p><image class="thumbnail" src="https://github.s3.amazonaws.com/docs/bootcamp_3_fork.jpg" /></p>
    <p>详细官方教程: "https://help.github.com/articles/fork-a-repo":https://help.github.com/articles/fork-a-repo</p>
</section>

<section>
    <div class="page-header">
        <h1>二、clone <small>克隆自己的版本库</small></h1>
    </div>
<pre>
$ git clone git@github.com:linguofeng/cocos2d-x.git
</pre>
</section>

<section>
    <div class="page-header">
        <h1>三、remote <small>配置远程版本库，实现与原始版本库同步</small></h1>
    </div>
<pre>
$ git remote -v                                                     // 查看当前远程版本库
$ git remote add cocos2d-x git://github.com/cocos2d/cocos2d-x.git   // 添加原始版本库
$ git fetch cocos2d-x                                               // 获取原始版本库的更新
$ git merge cocos2d-x/master                                        // 合并原始版本库的代码到当前版本库中，合并前确保当前分支是master
</pre>
</section>

<section>
    <div class="page-header">
        <h1>四、push</h1>
    </div>
<pre>
$ git fetch cocos2d-x                                               // 获取原始版本库最新的代码
$ git merge cocos2d-x/master                                        // 提交自己的前先合并最新原始版本库中的代码
$ git push origin master                                            // 提交代码到自己的版本库
</pre>
</section>

<section>
    <div class="page-header">
        <h1>五、pull <small>提交修改后的代码到原始版本库</small></h1>
    </div>
    <p><image class="thumbnail" src="https://github.s3.amazonaws.com/docs/pull-request-1.jpg" /></p>
    <p>详细官方教程: "https://help.github.com/articles/using-pull-requests":https://help.github.com/articles/using-pull-requests</p>
</section>
