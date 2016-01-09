---
layout: page
title: zsh
description: 强大的Shell
navigation: [1.安装, 2.配置]
update: 2013-01-19
---

<section>
    <div class="page-header">
        <h3>一、安装</h3>
    </div>
<pre>
$ brew install zsh
</pre>

</section>

<section>
    <div class="page-header">
        <h3>二、配置</h3>
    </div>
    <h4><small>2.1</small> 安装oh-my-zsh</h4>
<pre>
$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
</pre>
    <h4><small>2.2</small> 插件</h4>
<pre>
plugins=(svn git brew github bower)
</pre>
</section>