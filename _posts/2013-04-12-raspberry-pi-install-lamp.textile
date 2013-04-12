---
layout: post
title: 树莓派安装LAMP服务器
description: Raspberry Pi LAMP
categories: [archive]
tags: [raspberry, lamp]
---

<section>
<p>先安装apache服务器和mysql数据库与php</p>
<pre class="prettyprint">
$ sudo apt-get install apache2 mysql-server php5 php5-mysql
$ sudo service apache2 restart 
$ sudo service apache2 static
$ sudo vim /var/www/phpinfo.php
</pre>
<p>输入并保存，显示当前php信息</p>
<pre class="prettyprint">
<?php phpinfo(); ?>
</pre>
<p>打开浏览器：http://raspbreey-pi-ip/phpinfo.php</p>
</section>