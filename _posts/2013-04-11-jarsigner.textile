---
layout: post
title: jarsigner 的使用
description: android jarsigner
categories: [archive]
tags: [android, jarsigner]
---

<section>
    <div class="page-header">
        <h3>一、使用jarsigner</h3>
    </div>
    <p>jarsigner 是java的jar签名与校验工具，随jdk一同安装</p>
    <h4><small>1.1</small> 使用jarsigner校验apk是否签名</h4>
<pre class="prettyprint">
$ jarsigner -verbose -verify test.apk
</pre>
    
    <h4><small>1.2</small> 使用jarsigner对apk进行签名</h4>
<pre class="prettyprint">
// 签名需要三样东西，证书:test.keystore 密码:000000 alias:test
$ jarsigner -verbose -keystore test.keystore -storepass 000000 -keypass 000000 test.apk test
</pre>

    <h4><small>1.3</small> apk对齐优化</h4>
<pre class="prettyprint">
$ zipalign -v 4 test.apk test-1.apk
</pre>
</section>