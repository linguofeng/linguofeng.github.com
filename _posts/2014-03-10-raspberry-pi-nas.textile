---
layout: post
title: RaspberryPi NAS
description: Raspberry Pi搭建NAS服务器
categories: [archive]
tags: [raspberrypi, nas]
---

<section>
<pre>
# sudo apt-get install samba samba-common-bin
$ sudo smbpasswd -a pi
$ sudo mkdir /home/shares
$ sudo mkdir /home/shares/public
$ sudo chown -R root:users /home/shares/public
$ sudo chmod -R ug=rwx,o=rx /home/shares/public
$ sudo vim /etc/samba/smb.conf
</pre>
<pre>
[public]
  comment = Public Storage
  path = /home/shares/public
  valid users = @users
  force group = users
  create mask = 0660
  directory mask = 0771
  read only = no
</pre>
<pre>
$ sudo vim /etc/fstab
</pre>
<pre>
/dev/sdxx /home/shares/public/disk1 auto gid=pi,uid=pi,noatime 0 0
</pre>
<pre>
$ sudo reboot
</pre>
</section>
