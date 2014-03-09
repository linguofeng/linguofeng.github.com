---
layout: post
title: Apache Ivy
description: 依赖库管理工具
categories: [archive]
tags: [ivy]
---

<section>
<pre>
$ brew update
$ brew install ivy
$ mkdir -p ~/.ant/lib
$ cp /usr/local/Cellar/ivy/2.3.0/libexec/ivy-2.3.0.jar ~/.ant/lib
</pre>

<pre>
$ mkdir hello-ivy
$ cd hello-ivy
</pre>

<p>vim ivy.xml</p>
<pre>
<ivy-module version="2.0">
    <info organisation="org.apache" module="hello-ivy"/>
    <dependencies>
        <dependency org="org.apache.mina" name="mina-core" rev="2.0.7" />
    </dependencies>
</ivy-module>
</pre>

<p>vim build.xml</p>
<pre>
<project xmlns:ivy="antlib:org.apache.ivy.ant" name="hello-ivy">
    <target name="resolve" description="retrieve dependencies with ivy">
        <ivy:retrieve />
    </target>

    <target name="main" depends="resolve"/>
</project>
</pre>

<pre>
$ ant main
</pre>
</section>
