---
layout: post
title: error failed to attach to process ID 0
description: xcode问题解决
categories: [archive]
tags: [ios]
---

<section>
    <p>今天调整了一个工程名称与配置文件，发现无法启动应用了，出现 error: failed to attach to process ID 0 这个问题，最后在</p>
    <pre>http://stackoverflow.com/questions/12741188/error-failed-to-attach-to-process-id-0</pre>
    <p>中解决了，关键步骤是</p>
<pre>
1. 退出 xcode
2. 进入 ~/Library/Application Support/iPhone Simulator/6.1/Applications 删除里面所有目录
3. 进入 ~/Library/Developer/Xcode/DerivedData 删除里面所有目录
4. 启动 xcode，并清理工程，重新编译
</pre>
</section>