---
layout: "post"
title: "R6300V2 and dnspod ddns"
date: "2016-02-20 19:23"
---

终于把联通宽带配的光猫的路由给废了，为什么，因为端口转发功能实在是配置不起来了。

所以，把光猫的路由改成桥接模式变成交换机。

R6300V2刷了KoolShare改版固件的梅林固件。

```bash
$ vi /jffs/scripts/ddns-start
```

```bash
#!/bin/sh

updateDns() {
local userName="DNSPod的帐号"
local password="DNSPod的密码"
local sub_domain="@"
local domain_id="" # 域名ID
local record_id="" # 子记录ID
local data="login_email=${userName}&login_password=${password}&format=json&domain_id=${domain_id}&record_id=${record_id}&record_line=%E9%BB%98%E8%AE%A4&sub_domain=${sub_domain}"
curl -X POST https://dnsapi.cn/Record.Ddns -d "${data}" -s | grep -c '"code":"1"'
}

local updated="0"
local waitTime=10
logger -t DnsPodUpdater "Trying to update dnspod record..."
while [[ $updated -ne "1" ]]; do
updated=$(updateDns)
echo $updated
if [[ $updated -eq "1" ]]; then
logger -t DnsPodUpdater "Dnspod record updated."
else
logger -t DnsPodUpdater "Dnspod record update failed, retrying after $waitTime seconds..."
sleep $waitTime
fi
done

/sbin/ddns_custom_updated 1
```

```bash
$ chmod 755 /jffs/scripts/ddns-start
```

> domain_id与record_id可以通过https://www.dnspod.cn/docs/index.html文档里的`获取域名信息`与`记录列表`得到。

进入路由的外部网络 -> DDNS -> 启用，Custom。

完成。

参考：

https://nap6.com/question/1144

http://koolshare.cn/thread-4422-1-1.html