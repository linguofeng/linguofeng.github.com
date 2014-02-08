---
layout: post
title: xctool
description: 来自facebook的ios打包工具
categories: [archive]
tags: [xctool]
---

<section>
<pre>
$ sudo apt-get update
$ sudo apt-get install build-essential cmake git telnet
$ git clone http://git.eclipse.org/gitroot/mihini/org.eclipse.mihini.git mihini-repo	
$ cd mihini-repo
$ ./bin/build.sh
$ cd build.default/
$ make lua
$ make modbus_serial
$ make gpio 
$ mv runtime ~/mihini
$ cd ~/mihini
$ vim lua/agent/platform.lua
</pre>
<pre>
-- 修改成
function M.getdeviceid()
    local io = require "io"
    local string = require "string"
    local deviceId
    for line in io.lines('/proc/cpuinfo') do
        if string.find(line, 'Serial') then
            deviceId = string.sub(line, 11)
            break
        end
    end
    log("agent.platform", "INFO", "getdeviceid: deviceId set [%s]", deviceId);
    return deviceId
end
</pre>
<pre>
$ cd /etc/ld.so.conf.d/
$ sudo /bin/sh -c 'echo "/home/pi/mihini/lib/" > 01-mihini.conf'
$ sudo ldconfig
$ ./start.sh
</pre>
	<p>创建hello，然后是重要的一步，修改Ssh Lua节点中的Properties中的Lua CPath为</p>
<pre>
/home/pi/mihini/lua/?.so
</pre>
	<p>Lua Path为</p>
<pre>
/home/pi/mihini/lua/?.lua;/home/pi/mihini/lua/?/init.lua;?.lua
</pre>
	<p>然后就可以启动了</p>

	<p>参考：http://wiki.eclipse.org/Mihini/Build_Mihini</p>
	<p>参考：http://wiki.eclipse.org/Mihini/Run_Mihini_on_an_Open_Hardware_platform</p>
</section>
