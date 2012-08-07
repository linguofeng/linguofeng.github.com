---
layout: default
title: Ubuntu
---

<div id="charpter">

h3. 导航

</div>

h1. {{ page.title }}

h3(#1). *一、Linux指令* %(title)Linux指令%
<hr />

*(1#101) *常用指令* %(title)常用指令%
<hr />

<pre>
pwd：    当前工作目录              pwd
ls：     当前目录内容（list）      ls
mkdir：  创建目录（makedir）       mkdir books
cd：     进入目录                  cd books
touch：  生成空文件                touch book.txt
echo：   带内容的文件              echo "内容" > book.txt
cp：     拷贝文件（copy）          cp book.txt book.txt.bak
rm：     删除文件（remove）        rm -r（删除所有文件）/-f（强制删除） book.txt
rmdir：  删除空目录                rmdir 空目录
mv：     移动文件（move）          mv 原文件 目标位置
mv：     重命名                    mv a.txt b.txt
find：   查找文件                  find [指定目录] -name 文件名
grep：   查找指定文件里的内容      grep "是否有包含内容" book.txt
wc：     统计文本的行数字符数      wc book.txt
tree：   树状目录                  tree
ln：     建立软链接（link）        ln -s 目标目录 链接目录（快捷方式）
cat：    查看文件内容              cat book.txt
more：   分页显示文件内容
less：   分页显示文件内容
head：   显示文本开头内容
tail：   显示文件内容结尾内容
</pre>