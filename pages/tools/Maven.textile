---
layout: default
title: Maven
description: Maven安装与配置、插件与技巧
navigation: [1.下载, 2.配置, 3.完成, 4.Hello Maven, 更多...]
---

<section id="1">
    <div class="page-header">
        <h3>一、下载</h3>
    </div>

    <pre>
        官方下载地址：http://maven.apache.org/download.html
        
        解压至D:\Development\Apache
    </pre>
</section>

<section id="2">
    <div class="page-header">
        <h3>二、配置</h3>
    </div>

    <pre>
        M2_HOME = D:\Development\Apache\apache-maven-3.0.4
        Path = .;%M2_HOME%\bin
        
        添加一个MAVEN_OPTS环境变量来改变JVM的内存
        MAVEN_OPTS = -Xms256m -Xmx512m
    </pre>
</section>

<section id="3">
    <div class="page-header">
        <h3>三、完成</h3>
    </div>
    <pre>
        打开命令行输入：mvn -version
        
        Apache Maven 3.0.4 (r1232337; 2012-01-17 16:44:56+0800)
        Maven home: D:\Development\Maven\apache-maven-3.0.4
        Java version: 1.6.0_29, vendor: Sun Microsystems Inc.
        Java home: C:\Program Files\Java\jdk1.6.0_29\jre
        Default locale: zh_CN, platform encoding: GBK
        OS name: "windows 7", version: "6.1", arch: "amd64", family: "windows"
        
        就表示成功了
    </pre>

安装参考： "http://maven.apache.org/download.html#Installation":http://maven.apache.org/download.html#Installation
</section>

<section id="4">
    <div class="page-header">
        <h3>四、Hello Maven <small>第一个Maven工程</small></h3>
    </div>

<pre>
// 1、输入命令
mvn archetype:generate

// 2、提示选择，直接按回车默认选择：maven-archetype-quickstart
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 171:

// 3、之后提示选择maven-archetype-quickstart的版本
Choose org.apache.maven.archetypes:maven-archetype-quickstart version:
1: 1.0-alpha-1
2: 1.0-alpha-2
3: 1.0-alpha-3
4: 1.0-alpha-4
5: 1.0
6: 1.1
Choose a number: 6: // 4、直接按回车默认选择第6项

// 5、接着提示输入groupId、artifactId、 version、以及包名package，如下
Define value for property 'groupId': : com.linguofeng
Define value for property 'artifactId': : helloworld
Define value for property 'version':  1.0-SNAPSHOT: :
Define value for property 'package':  com.linguofeng: : helloworld
Confirm properties configuration:
groupId: com.linguofeng
artifactId: helloworld
version: 1.0-SNAPSHOT
package: helloworld
 Y: : Y // 6、最后确认
 
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Old (1.x) Archetype: maven-archetype-quickstart:1.0
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: com.linguofeng
[INFO] Parameter: packageName, Value: helloworld
[INFO] Parameter: package, Value: helloworld
[INFO] Parameter: artifactId, Value: helloworld
[INFO] Parameter: basedir, Value: d:\mvn
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] project created from Old (1.x) Archetype in dir: d:\mvn\helloworld
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 6:44.171s
[INFO] Finished at: Thu Feb 16 13:41:16 CST 2012
[INFO] Final Memory: 9M/59M
[INFO] ------------------------------------------------------------------------ 
 
 // 成功了
</pre>

* 2、编译打包
<hr />

<pre>
// 进行工程目录
cd helloworld

// 编译打包前需要修改pom.xml文件，在</dependencies>标签后增加
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-shade-plugin</artifactId>
      <version>1.5</version>
      <configuration>
        <transformers>
          <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <manifestEntries>
              <Main-Class>helloworld.App</Main-Class>
            </manifestEntries>
          </transformer>
        </transformers>
      </configuration>
      <executions>
        <execution>
          <phase>package</phase>
          <goals>
            <goal>shade</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>

// 参考：http://maven.apache.org/plugins/maven-shade-plugin/usage.html

// 打包
mvn clean package
</pre>

* 3、运行
<hr />

<pre>
java -jar target\helloworld-1.0-SNAPSHOT.jar
</pre>

<section id="5">
    <div class="page-header">
        <h3>更多内容 <small>常用插件与技巧</small></h3>
    </div>
    <ul><h5>常用插件：</h5>
    	<li><a href="http://maven.apache.org/scm/maven-scm-plugin/index.html">maven-scm-plugin</a> 把工程打Tag后发布到SCM(Git、Svn)服务器上，SCM＝Software Configuration Management软件配置管理</li>
<pre>
<scm>
    <url>https://github.com/linguofeng/android-dynamic-loading-framework</url>
    <connection>scm:git:git://github.com/linguofeng/android-dynamic-loading-framework.git</connection>
    <developerConnection>scm:git:ssh://git@github.com/linguofeng/android-dynamic-loading-framework.git</developerConnection>
</scm>

<plugin>
    <artifactId>maven-scm-plugin</artifactId>
    <version>1.7</version>
    <configuration>
        <scmVersionType>branch</scmVersionType>
        <scmVersion>master</scmVersion>
    </configuration>
</plugin>
</pre>
    	<li><a href="http://maven.apache.org/plugins/maven-release-plugin/">maven-release-plugin</a> 版本发布插件</li>
<pre>
<distributionManagement>
    <repository>
        <id>nexus-releases</id>
        <name>Nexus Release Repository</name>
        <url>http://127.0.0.1:8081/nexus/content/repositories/releases/</url>
    </repository>
    <snapshotRepository>
        <id>nexus-snapshots</id>
        <name>Nexus Snapshot Repository</name>
        <url>http://127.0.0.1:8081/nexus/content/repositories/snapshots/</url>
    </snapshotRepository>
</distributionManagement>

<plugin>
    <artifactId>maven-release-plugin</artifactId>
    <version>2.3.2</version>
    <configuration>
        <autoVersionSubmodules>true</autoVersionSubmodules>
        <scmCommentPrefix></scmCommentPrefix>
    </configuration>
</plugin>

使用命令：
$ mvn release:prepare // 此命令会将工程发布到SCM服务器上，需要maven-scm-plugin插件的支持
$ mvn release:perform // 此命令会将工程发布到Maven仓库中
</pre>
        <li><a href="https://github.com/jayway/maven-android-plugin">maven-android-plugin</a> 开发Android应用的插件，结合 <a href="/pages/favorites/eclipse.html#m2e-android">m2e-android</a> 一起使用</li>
<pre>
通过Maven命令行创建Android工程：https://github.com/rgladwell/m2e-android

$ mvn archetype:generate \
  -DarchetypeArtifactId=android-quickstart \
  -DarchetypeGroupId=de.akquinet.android.archetypes \
  -DarchetypeVersion=1.0.8 \
  -DgroupId=your.company \
  -DartifactId=my-android-application
</pre>
    </ul>
</section>