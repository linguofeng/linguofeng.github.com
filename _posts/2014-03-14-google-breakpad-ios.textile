---
layout: post
title: Google Breakpad IOS
description: 使用Google Breakpad
categories: [archive]
tags: [raspberrypi, nas]
---

<section>
<pre>
$ svn checkout http://google-breakpad.googlecode.com/svn/trunk/ google-breakpad-read-only
$ cd google-breakpad-read-only
$ ./configure
$ make
</pre>
<p>打开google-breakpad-read-only/src/tools/mac/dump_syms/dump_syms.xcodeproj编译dump_syms工具，编译成功后记录下可执行文件的地址。</p>
<p>打开已有的ios工程，把google-breakpad-read-only/src/client/ios/Breakpad.xcodeproj拖进工程，前提是该工程是workspace</p>
<p>在didFinishLaunchingWithOptions方法里加入</p>
<pre>
[[BreakpadController sharedInstance]start: YES];
</pre>
<p>在applicationWillTerminate方法时加入</p>
<pre>
[[BreakpadController sharedInstance]stop];
</pre>
<p>有几个配置是必须要填的</p>
<p>在Info.plist中加入</p>
<pre>
BreakpadProduct
BreakpadProductDisplay
BreakpadURL
</pre>
<p>出异常时会在当前应用的Library/Caches/Breakpad生成xxxxx.dmp文件</p>
<p>使用dump_syms生成sym文件</p>
<p>使用head -n1 xxx.sym查看</p>
<p>创建对应的目录</p>
<p>使用minidump_stackwalk查看错误信息</p>
<p>参考:https://code.google.com/p/google-breakpad/wiki/LinuxStarterGuide</p>
</section>
