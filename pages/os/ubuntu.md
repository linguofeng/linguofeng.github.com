---
layout: default
title: "Ubuntu"
---

<section>
  <div class="page-header"><h4>一、Linux指令</h4></div>

<h5><small>1.1</small> 常用指令</h5>

<pre>
pwd      当前工作目录               pwd
ls       当前目录内容(list)         ls
mkdir    创建目录(makedir)         mkdir books
cd       进入目录                  cd books
touch    生成空文件                touch book.txt
echo     带内容的文件              echo "内容" > book.txt
cp       拷贝文件（copy）          cp book.txt book.txt.bak
rm       删除文件（remove）        rm -r（删除所有文件）/-f（强制删除） book.txt
rmdir    删除空目录                rmdir 空目录
mv       移动文件（move）          mv 原文件 目标位置
mv       重命名                    mv a.txt b.txt
find     查找文件                  find [指定目录] -name 文件名
grep     查找指定文件里的内容      grep "是否有包含内容" book.txt
wc       统计文本的行数字符数      wc book.txt
tree     树状目录                  tree
ln       建立软链接（link）        ln -s 目标目录 链接目录（快捷方式）
cat      查看文件内容              cat book.txt
more     分页显示文件内容
less     分页显示文件内容
head     显示文本开头内容
tail     显示文件内容结尾内容
</pre>

<h5><small>1.2</small> 系统管理命令</h5>

<pre>
stat         查看目录详细信息                stat 目录
who          查看有多少登录用户              who
hostname     显示主机名称                    hostname
uname        显示系统信息                    uname -a
top          显示当前系统资源实时信息        top
ps           显示当前系统瞬间进程状态        ps -aux
du           显示指定文件目录的磁盘使用情况  du -h 目录/文件
df           显示磁盘使用情况                df -h
free         显示当前内存使用情况            free -s2 2秒数更新数据
ifconfig     显示网络接口信息                ifconfig
ping         测试网络连通性
netstat      显示网络状态信息
man          命令帮助信息查询                man ls 查看ls的帮助
alias        设置命令别名                    aliax list="ls"
unaliax      删除命令别名                    unaliax list
clear        清屏
kill         杀死一个进程
</pre>

<h5><small>1.2</small> 备份压缩命令</h5>

<pre>
# gzip 只能压缩文件 后缀  gz
-----------------------------------------------------------
压缩         gzip 文件名
解压         gzip -d xxx.gz
压缩比       gzip -l xxx.gz
压缩速度     gzip -num    默认num=6 数值越小压缩率越小

# bzip2 只能压缩文件 后缀  bz2
-----------------------------------------------------------
压缩  bzip2 -z 文件名
解压  bzip2 -d xxx.bz2
压缩比   bzip2 -l xxx.gz
压缩速度    bzip2 -num    默认num=6 数值越小压缩率越小

# tar 打包
-----------------------------------------------------------
-c 打包
-x 解包
-z 使用gzip压缩
-j 使用bzip2压缩
-v 显示压缩过程
-f 文件名

例子  
tar -cvf 文件名 把谁压缩
tar -xvf 文件名 把谁解包

tar -zcvf 文件名 把谁压缩
tar -zxvf 文件名 解压到

tar -jcvf 文件名 把谁压缩
tar -jxvf 文件名 解压到
</pre>

<h5><small>1.2</small> 关机重启命令</h5>

<pre>
shutdown -r now 立即重启
shutdown -h now 立即关机
halt            关机
reboot          重启

Linux 通道符 |
</pre>
</section>

h3(#2). *二、VIM编辑器的使用* %(title)VIM编辑器的使用%
<hr />

*(2#201) *VIM的三种模式* %(title)三种模式%

<pre>
编辑模式  等待编辑，按esc进入编辑模式
插入模式  输入“i、o、a”进入插入模式
命令模式  在编辑模式输入“:”进入命令
</pre>

*(2#202) *VIM的常用命令* %(title)常用命令%

<pre>
:q              退出
:wq [文件名]     保存并退出
:q!             强制退出
:set number     显示行号
:set nonumber   不显示行号
:edit 文件名     编辑该文件
</pre>

h3(#3). *三、用户和组帐号管理* %(title)用户和组帐号管理%
<hr />

*(3#301) *用户帐户* 在/etc/passwd文件中每行定义了一个用户 %(title)用户帐户%
<hr />
** 普通用户帐户
** 超级用户帐户

<pre>
/etc/passwd
root:x:0:0:Ubuntu:/root:/bin/bash
root        用户名
x           密码，受/etc/shadow文件保护
0           用户标示，普通用户从1000开始
0           组标示
Ubuntu      注释
/root       宿主目录
/bin/bash   命令解析器

/etc/shadow
每行代表
用户名:
口令:
最后一次修改时间:天数
最小时间间隔:天数
最大时间间隔:天数
警告时间:天数
不活动时间:天数
失效时间:天数
标志:
</pre>

*(3#a302) *组帐户* 在/etc/group文件中每行定义了一个组 %(title)组帐户%
<hr />
** 私有组（与用户同名）
** 标准组

<pre>
/etc/group
组名:组口令:组ID:组成员

groups  显示某用户所有的组
</pre>

*(3#a303) *帐户管理* %(title)帐户管理%
<hr />

<pre>
添加一个用户  
sudo useradd -m 用户名
useradd -u  指定UID
useradd -p  密码
useradd -g  指定组
useradd -s  SHELL
useradd -d  用户目录

adduser 用户名

-------------------------------------------------------------------------------
修改用户  
sudo usermod -l 新用户名 原用户名
usermod -u  指定UID
usermod -p  修改密码
usermod -g  修改组
usermod -s  修改SHELL
usermod -d  修改用户目录
usermod -l  修改用户登录名
usermod -L  锁定用户密码
usermod -U  锁定用户帐号

-------------------------------------------------------------------------------
删除用户  
userdel     删除帐号
userdel -r  删除帐号的同时也删除目录
</pre>

*(3#304) *组管理* %(title)组管理%
<hr />

<pre>
添加一个组  
sudo groupadd 组名
groupadd -g 指定组ID

修改一个组  
groupmod -g 更改组GID
groupmod -n 更改组名

删除一个组  
groupdel 组名
</pre>

*(3#305) *口令管理* %(title)口令管理%
<hr />

<pre>
修改密码  
sudo passwd root
passwd -l   锁定用户帐户
passwd -u   解锁用户帐户
passwd -d   删除帐记口令

修改组口令  
gpasswd -a 添加指定用户到指定组
gpasswd -d
gpasswd -A
</pre>

*(3#306) *切换用户* %(title)切换用户%
<hr />

<pre>
su root     切换到用户
su - root   切换到用户并且切换到该用户的工作目录下
</pre>

*(3#307) *sudo命令* %(title)sudo命令%
<hr />

<pre>
/etc/sudoers
该文件配置了sudo这个命令能够被哪些主机、哪些用户以root权限执行哪些命令
admin组拥有sudo这个命令的权限
</pre>

*(3#308) *用户/组状态命令* %(title)用户/组状态命令%
<hr />

<pre>
id root     查看用户的UID、GID
groups root 查看用户的所在组
</pre>

h3(#4). *四、文件权限管理* %(title)文件权限管理%
<hr />

*(4#401) *三种文件权限* %(title)三种文件权限%
<hr />

<pre>
第一段  文件类型
    d   目录
    -   普通文件
    l   链接文件

第二段  所属用户的权限
第三段  所属组的权限
第四段  其它用户的权限
    r   只读
    w   可读
    x   可执行
</pre>

*(4#402) *更改文件权限* %(title)更改文件权限%
<hr />

<pre>
chmod命令  
    u   所属用户
    g   所属组用户
    o   其它用户
    a   所有用户
    +   加权限
    -   减权限
    =   加后将原权限删除
    w   写权限 2 +
    r   读权限 4 +  =7
    x   执行权 1 +

    例子  chmod g+w xxx.txt 给所属组用户增加写权限，多个用逗号分开
</pre>

h3(#5). *五、软件安装* %(title)软件安装%
<hr />

*(5#501) *dpkg软件包管理工具* %(title)dpkg软件包工具%
<hr />

<pre>
安装  sudo dpkg -i xxx.deb
卸载  sudo dpkg -r xxx
信息  sudo dpkg -c xxx.deb
列表  sudo dpkg -l
</pre>

*(5#502) *apt软件包管理工具* %(title)apt软件包工具%
<hr />

<pre>
下载的包保存在/var/cache/apt目录下

安装  sudo apt-get install xxx
重装  sudo apt-get reinstall xxx
卸载  sudo apt-get remove xxx
更新  sudo apt-get update
升级  sudo apt-get upgrade
帮助  sudo apt-get help
</pre>

*(5#503) *安装目录* %(title)安装目录%
<hr />

<pre>
通常软件都安装在  
/usr/local/     用户软件
/opt/           拓展软件
</pre>


h3(#6). *六、远程登录* %(title)远程登录%
<hr />

<pre>
设置IP地址  ifconfig eth0 192.168.1.2 netmask 255.255.255.0
</pre>

*(6#601) *telnet* %(title)telnet%
<hr />

<pre>
1.安装telnet-server

    sudo dpkg -i xinetd_1%3a2.3.14-7ubuntu3_i386.deb
    sudo dpkg -i telnetd_0.17-36build1_i386.deb

    如果连网的情况下可以 sudo apt-get install telnet 进行安装


2.设置一下ip

    sudo ifconfig eth0 192.168.1.222 netmask 255.255.255.0

3.修改/etc/xinetd.conf配置文件

    vim /etc/xinetd.conf

加入如下内容  

defaults
{
# Please note that you need a log_type line to be able to use log_on_success
# and log_on_failure. The default is the following :
# log_type = SYSLOG daemon info(插入如下部分）
instances = 60
log_type = SYSLOG authpriv
log_on_success = HOST PID
log_on_failure = HOST
cps = 25 30
}

4.修改/etc/xinetd.d/telnet 配置文件

    vim /etc/xinetd.d/telnet

加入如下内容  

# default: on
# description: "The telnet server serves telnet sessions; it uses \"
# unencrypted username/password pairs for authentication.
service telnet
{
disable = no
flags = REUSE
socket_type = stream
wait = no
user = root
server = /usr/sbin/in.telnetd
log_on_failure += USERID
}  

5.重启网络服务

sudo /etc/init.d/xinetd restart

6.打开window命令行 telnet 192.168.1.222
</pre>

h3(#7). *七、安装JAVA开发环境* %(title)JAVA开发环境%
<hr />

*(7#701) *一、安装jdk* %(title)安装jdk%
<hr />

<pre>
su - root 切换成root用户

sudo -i 不需要密码直接切换成root

1.进入usr目录

cd /usr

2.在usr目录下建立java安装目录

mkdir java

3.将jdk-6u24-linux-i586.bin拷贝到java目录下

cp /home/itcast/Desktop/jdk-6u24-linux-i586.bin /usr/java

4.安装jdk

cd /usr/java

./jdk-6u24-linux-i586.bin

5.安装完毕为他建立一个链接以节省目录长度

ln -s /usr/java/jdk1.6.0_24/ /usr/jdk

6.编辑配置文件

vim /etc/profile

添加如下内容  
JAVA_HOME=/usr/jdk
CLASSPATH=$JAVA_HOME/lib/
PATH=$PATH:$JAVA_HOME/bin
export PATH JAVA_HOME CLASSPATH

8.重启机器

sudo shutdown -r now

9.查看安装情况
java -version

java version "1.6.0_24"
Java(TM) SE Runtime Environment (build 1.6.0_24-b07)
Java HotSpot(TM) Client VM (build 19.1-b02, mixed mode, sharing)
</pre>

*(7#702) *二、安装tomcat* %(title)安装tomcat%
<hr />

<pre>
tar -zxvf apache-tomcat-6.0.29.tar.gz -C /opt       (解压到/opt下)
ln -s /opt/apache-tomcat-6.0.29/ /opt/tomcat   (建立链接文件)
启动tomcat
cd /opt/tomcat/bin/
./startup.sh   (注意  点代表当前目录下)
如果启动不了，请尝试
-i 切换到root用户再重新启动
./startup.sh
测试http://127.0.0.1:8080/
</pre>

*(7#703) *三、安装eclipse* %(title)安装eclipse%
<hr />

<pre>
tar -zxvf eclipse-jee-helios-linux-gtk.tar.gz -C /opt (解压到/usr/local目录下并生成/usr/local/eclipse目录)
cd /opt/eclipse/
./eclipse (注意  点代表当前目录下)
</pre>
