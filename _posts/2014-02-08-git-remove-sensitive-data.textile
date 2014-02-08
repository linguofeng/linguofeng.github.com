---
layout: post
title: git Remove sensitive data
description: git删除敏感数据
categories: [archive]
tags: [git]
---

<section>
<pre>
$ git filter-branch --force --index-filter \
  'git rm -r --cached --ignore-unmatch filedir' \
  --prune-empty --tag-name-filter cat -- --all
</pre>
</section>
