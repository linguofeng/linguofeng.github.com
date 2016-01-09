---
layout: default
title: "WebService"
---

<div id="charpter">

h3. WebService

</div>

h1. WebService

h3(#1). *HelloWorld* %(title)HelloWorld%
<hr />

* 1、服务端
<hr />

<pre class="brush: java">
package com.linguofeng.webservice;

import javax.jws.WebService;
import javax.xml.ws.Endpoint;

@WebService
public class Hello {
	public static void main(String[] args) {
		/*
		 * 发布一个网络服务
		 * addredd:	发布地址（绑定到哪个地址）
		 * implementor：端点实现者（提供服务）
		 */
		Endpoint.publish("http://localhost:8081/hello", new Hello());
	}
	
	public String sayHello(){
		return "Hello WebService"; 
	}
}
</pre>

* 2、启动后访问： "http://localhost:8081/hello?wsdl":http://localhost:8081/hello?wsdl
<hr />

* 3、使用wsimport工具生成java文件
<hr />

<pre>
生成.class文件：%JAVA_HOME%\wsimport -d d:\ws http://localhost:8081/hello?wsdl
生成.java文件： %JAVA_HOME%\wsimport -s d:\ws http://localhost:8081/hello?wsdl

Hello.java
HelloService.java
ObjectFactory.java
package-info.java
SayHello.java
SayHelloResponse.java
</pre>

* 4、把生成的java文件导入工程中和使用
<hr />

<pre class="brush: java">
Hello hello = new HelloService().getHelloPort();
String result = hello.sayHello();
System.out.println(result);
</pre>

h3(#2). *基础* %(title)基础%
<hr />

* 1、WSDL简单介绍
<hr />

<pre class="brush: xml">
<message name="sayHello">
	<part name="parameters" element="tns:sayHello"/>
</message>
<message name="sayHelloResponse">
	<part name="parameters" element="tns:sayHelloResponse"/>
</message>
<!-- 3.接口 -->
<portType name="Hello">
	<!-- 方法名 -->
	<operation name="sayHello">
		<input wsam:Action="http://webservice.linguofeng.com/Service/sayHelloRequest" message="tns:sayHello"/>
		<output wsam:Action="http://webservice.linguofeng.com/Service/sayHelloResponse" message="tns:sayHelloResponse"/>
	</operation>
</portType>
<!-- 2.绑定 -->
<binding name="HelloPortBinding" type="tns:Hello">
	<soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document"/>
	<!-- 方法名 -->
	<operation name="sayHello">
		<soap:operation soapAction=""/>
		<input>
			<soap:body use="literal"/>
		</input>
		<output>
			<soap:body use="literal"/>
		</output>
	</operation>
</binding>
<!-- 1.服务实现 -->
<service name="HelloService">
	<!-- 把该实现绑定到HelloPortBinding，getHelloPort() -->
	<port name="HelloPort" binding="tns:HelloPortBinding">
		<soap:address location="http://localhost:8081/server"/>
	</port>
</service>

<!--
服务：
    portType,types,message
如何调用服务：
    soap,soap12,post,get
在哪儿调
    address
-->
</pre>

* 2、SOAP协议 Simple Object Access Protoclo 简单对象访问协议
<hr />

<pre>
soap = http协议 + xml数据
soap1.1：text/xml;charset=utf-8
soap1.2：application/soap+xml
</pre>

* 3、注解的使用
<hr />

<pre class="brush: java">
// 一、类注解，把该类变成一个WebService类
@WebService(name="接口名", portName="端口", serviceName="服务名" targetNamespace="命名空间")
// 二、方法注解
@WebMethod(operationName="方法名")
// 三、返回名注解
@WebResult(name="返回值名称");
// 四、参数名称注解
@WebParam(name="参数名")
</pre>

* 4、使用javax.xml.ws.Service访问服务
<hr />

<pre class="brush: java">
// Hello2是通过wsdl生成的接口
public static void main(String[] args) throws Exception {
    // 名称空间
    String nameSpace = "http://webservice.linguofeng.com/";
    // 对应wsdl中对应的<service name="HelloService" ..
    String serviceName = "HelloService";
    // 对应wsdl中对应的<port name="HelloPort" ...
    String portName = "HelloPort";
    // wsdl地址
    URL url = new URL("http://localhost:8081/server?wsdl");
    QName qName = new QName(nameSpace, serviceName);
    // 服务
    Service service = Service.create(url, qName);
    QName portQName = new QName(nameSpace, portName);
    // 获取HelloPort对象
    Hello2 hello = service.getPort(portQName, Hello2.class);
    System.out.println(hello.sayHello());
}

//============================================================

//Hello2.java
@WebService(name = "Hello", targetNamespace = "http://webservice.linguofeng.com/")
public interface Hello2 {
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "sayHello", targetNamespace = "http://webservice.linguofeng.com/", className = "com.linguofeng.webservice.SayHello")
    @ResponseWrapper(localName = "sayHelloResponse", targetNamespace = "http://webservice.linguofeng.com/", className = "com.linguofeng.webservice.SayHelloResponse")
    public String sayHello();
}
</pre>


h3(#3). *文件上传* %(title)文件上传%
<hr />

* 1、文件上传服务端
<hr />

<pre class="brush: java">
@WebService
public class Upload {
    /** 文件上传 */
    public String fileUpload(String fileName, byte[] bs) throws IOException {
        OutputStream os = new FileOutputStream(fileName);
        os.write(bs);
        os.flush();
        os.close();
        return "success";
    }

    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8088/upload", new Upload());
    }
}
</pre>

* 2、生成接口等文件
<hr />

<pre>
运行：%JAVA_HOME%\wsimport -s . http://localhost:8088/upload?wsdl
</pre>

* 3、文件上传客户端
<hr />

<pre class="brush: java">
public class Main {
    public static void main(String[] args) throws Exception {
        InputStream is = new FileInputStream(new File("11.jpg"));
        byte[] bs = new byte[is.available()];
        is.read(bs);
        is.close();
        
        Upload upload = new UploadService().getUploadPort();
        System.out.println(upload.fileUpload("11.jpg", bs));
    }
}
</pre>

h3(#4). *CRUD操作* %(title)CRUD操作%
<hr />

* 1、Student.java
<hr />

<pre class="brush: java">
public class Student {
    private String id;
    private String name;
}
</pre>

* 2、StudentAction.java
<hr />

<pre class="brush: java">
@WebService
public class StudentAction {
    private Map<String, Student> map;
    public StudentAction {
        map = new HashMap<String, Student>;
    }
    
    public void addOrUpdate(Student s) {
        map.put(s.getId(), s);
    }
    
    public void delete(Student s) {
        map.remove(s.getId());
    }
    
    /*
     * 不支持Map类型的返回值
     */
    public Collection<Student> queryAll() {
        return map.values();
    }
}
</pre>

* 3、Main.java
<hr />

<pre class="brush: java">
public class Main {
    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8787/server", new StudentAction());
    }
}
</pre>

* 4、生成客户端JAVA文件
<hr />

<pre>
运行：%JAVA_HOME%\wsimport -s . http://localhost:8787/server?wsdl
</pre>

* 5、客户端Main.java
<hr />

<pre class="brush: java">
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.setId("1");
        s1.setName("linguofeng");
        Student s2 = new Student();
        s1.setId("2");
        s1.setName(".com");
        
        // 新增
        StudentAction sa = new StudentActionService().getStudentActionPort();
        sa.addOrUpdate(s1);
        sa.addOrUpdate(s2);
        
        // Collection类型会变成List类型
        List<Student> list = sa.queryAll();
        for (Student s : list){
            sysout(s.getName());
        }
        
        // 修改
        s1.setId("1");
        s1.setName("www.linguofeng");
        sa.addOrUpdate(s1);
        
        ...
    }
}
</pre>

h3(#5). *Apache CXF* %(title)CXF%
<hr />

* 安装
<hr />

<pre>
配置环境变量：
ANT_HOME = D:\Development\Apache\apache-ant-1.8.2（CXF 2.5版本以后不需要安装Ant）
CXF_HOME = D:\Development\Apache\apache-cxf-2.5.2
CATALINA_HOME = D:\Development\Apache\apache-tomcat-7.0.23

Path = .;%ANT_HOME%\bin;%CXF_HOME%\bin;%CATALINA_HOME%\bin
CLASSPATH = .;%CXF_HOME%\lib\cxf-manifest.jar;.\build\classes
</pre>

* Ant运行CXF服务器并测试（2.5版之前）
<hr />

<pre>
cd /d D:\Development\Apache\apache-cxf-2.5.2\samples\java_first_pojo
编译：ant
启动：ant server
客户端：ant client
清理：ant clean
发布到Tomcat：ant deploy -Dtomcat=true
取消到Tomcat：ant undeploy -Dtomcat=true
访问：ant client-servlet -Dbase.url=http://localhost:9797
</pre>

*  "Maven":/pages/tools/Maven.html 运行CXF服务器并测试（2.5版以后都使用Maven）
<hr />

<pre>
cd /d D:\Development\Apache\apache-cxf-2.5.2\samples\java_first_pojo
编译安装：mvn install
启动服务：mvn -Pserver
客户端：  mvn -Pclient
</pre>

* CXF 工具使用
<hr />

<pre>
wsdl2java.bat：%CXF_HOME%\bin\wsdl2java -d . http://localhost:9797/services/hello?wsdl
</pre>

h3(#5). *第一个CXF服务* %(title)第一个CXF服务%
<hr />

* 服务端：HelloWorld.java
<hr />

<pre class="brush: java">
@WebService
// 默认是SOAP1.1版本，SOAP1.2注解
@BindingType(SOAPBinding.SOAP12HTTP_BINDING)
public interface HelloWorld {
    public String sayHello(String name);
}
</pre>

* 服务端：HelloWorldImpl.java
<hr />

<pre class="brush: java">
public class HelloWorldImpl implements HelloWorld {
    public String sayHello(String name) {
        return "Hello " + name;
    }
}
</pre>

* 服务端：Main.java
<hr />

<pre class="brush: java">
public class Main {
    public static void main(String[] args) {
        // 使用CXF发布一个服务
        // ServerFactoryBean server = new ServerFactoryBean(); // 生成接口不规范
        JaxWsServerFactoryBean server = new JaxWsServerFactoryBean();
        // 设置发布的地址
        server.setAddress("http://localhost:9797/service");
        // 建立实现者（接口、实现类）
        // 设置服务接口
        server.setServiceClass(HelloWorld.class);
        // 设置服务的实现类
        server.setServiceBean(new HelloWorldImpl());
        
        // 拦截器（拦截HTTP头信息）
        // 输入拦截器
        server.getInInterceptors().add(new LoggingInInterceptors());

        // 输出拦截器
        server.getOutInterceptors().add(new LoggingOutInterceptors());
        
        // 发布
        server.create();
    }
}
</pre>

* 客户端：生成JAVA文件
<hr />

<pre>
// wsimport
%JAVA_HOME%\bin\wsimport -s . http://localhost:9797/service?wsdl

// wsdl2java
%CXF_HOME%\bin\wsdl2java -d . http://localhost:9797/service?wsdl
</pre>

* 客户端：创建Main.java
<hr />

<pre class="brush: java">
public class Main {
    public static void main(String[] args) {
        HelloWorld hw = new HelloWorldService().getHelloWorldPort();
        System.out.println(hw.sayHello("www.linguofeng.com"));
    }
}
</pre>

h3(#6). *CXF整合Spring* %(title)CXF整合Spring%
<hr />

* 配置applicationContext.xml
<hr />

<pre class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jaxws="http://cxf.apache.org/jaxws"
    xmlns:jaxrs="http://cxf.apache.org.jaxrs"
    xmlns:cxf="http://cxf.apache.org/core"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
        http://cxf.apache.org/jaxrs
        http://cxf.apache.org/schemas/jaxrs.xsd
        http://cxf.apache.org/jaxws
        http://cxf.apache.org/schemas/jaxws.xsd
        http://cxf.apache.org/core
        http://cxf.apache.org/schemas/core.xsd ">

    <implort resource="classpath:META-INF/cxf/cxf.xml" />
    <implort resource="classpath:META-INF/cxf/cxf-servlet.xml" />
    <jaxws:server address="/helloworld" serviceClass="...HelloWorld"> 
        <jaxws:serverBean>
            <bean class="...HelloWorldImpl" /> 
        </jaxws:serverBean>
        <!-- 拦截器 -->
        <jaxws:inInterceptors>
            <bean class="...LoggingInterceptor" />
        </jaxws:inInterceptors>
        <jaxws:outInterceptors>
            <bean class="...LoggingOutterceptor" />
        </jaxws:outInterceptors>
    </jaxws:server>
    
</beans>
</pre>

* 配置web.xml
<hr />

<pre class="brush: xml">
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>

<!-- Spring监听器 -->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<servlet>
    <servlet-name>cxf</servlet-name>
    <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>cxf</servlet-name>
    <url-pattern>/webservice/*</url-pattern>
</servlet-mapping>
</pre>

* 服务端：HelloWorld.java
<hr />

<pre class="brush: java">
@WebService
// 默认是SOAP1.1版本，SOAP1.2注解
@BindingType(SOAPBinding.SOAP12HTTP_BINDING)
public interface HelloWorld {
    public String sayHello(String name);
}
</pre>

* 服务端：HelloWorldImpl.java
<hr />

<pre class="brush: java">
public class HelloWorldImpl implements HelloWorld {
    public String sayHello(String name) {
        return "Hello " + name;
    }
}

* 客户端：SSH
<hr />

<pre>
步骤：
    1、根据wsdl生成客户端JAVA文件，只把HelloWorld.java接口文件导入工程。
    2、在applicationContext.xml中配置
        <jaxws:client id="hello" address="http://localhost:8080/webservice/helloworld" serviceClass="...HelloWorld" />
    3、把hello注入Struts2中
        private HelloWorld helloworld;
        public void set/get
        <bean class="...Action"><property name="helloworld" ref="hello" /></bean>
    4、在Action中直接调用HelloWorld接口中的方法。
    
    动态验证思考：第一次访问通过用户与密码校验后生成一个动态授权码，以后每次访问都只带授权码访问
</pre>

* 客户端：jQuery调用
<hr />

<pre>
$.ajax({
    type : "POST",
    url : "http://localhost:8080/webservice/helloworld",
    ContentType : "application/soap+xml",
    dataType : "xml",
    data : "<soap:Envelope xmlns:sopa....",
    success : function(data) {
        alert($(data).find("return").first().text());
    }
},"xml");
</pre>