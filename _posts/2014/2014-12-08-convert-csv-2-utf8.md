---
layout: post
title: Convert CSV To UTF-8
description: 转换CSV格式为UTF-8
categories: [archive]
tags: [csv]
---

<section>
<pre class="prettyprint">
$ iconv -c -f GBK -t UTF-8 gbk.csv > utf8.csv
</pre>
</section>