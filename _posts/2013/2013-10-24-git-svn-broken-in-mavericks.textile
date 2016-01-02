---
layout: post
title: Git svn broken in mavericks
description: 解决升级到OS X 10.9以后git svn无法使用的问题
categories: [archive]
tags: [osx, git, svn]
---

<section>
<pre>
$ sudo ln -s  /Applications/Xcode.app/Contents/Developer/Library/Perl/5.16/darwin-thread-multi-2level/SVN /System/Library/Perl/Extras/5.16/SVN
$ sudo ln -s /Applications/Xcode.app/Contents/Developer/Library/Perl/5.16/darwin-thread-multi-2level/auto/SVN/ /System/Library/Perl/Extras/5.16/auto/SVN
</pre>
</section>

<p>参考: http://nob-log.info/2013/10/24/git-svn-broken-in-mavericks/</p>