---
layout: "post"
title: "ssl authentication"
date: "2016-03-04 09:44"
---

最近在搞一个MQTT的推送服务器，需要做客户端认证，双向认证。

首先是创建`ca.crt`文件, 再创建`server.crt`与`client.crt`。

配置文件

```
listener 8883
cafile /mqtt/config/ca_certificates/ca.crt
certfile /mqtt/config/certs/server.crt
keyfile /mqtt/config/certs/server.key
require_certificate true
```

测试

```bash
$ mosquitto_sub -t \$SYS/broker/bytes/\# -v --cafile ca.crt -h localhost -p 8883 --cert client.crt --key client.key
```

---

下面讲讲在Nginx中怎么配置双向认证，平时我们用到的都是单向认证，配置也比较简单。

```
server {
    # ...

    ssl                    on;
    ssl_certificate        /etc/nginx/certs/server.crt;
    ssl_certificate_key    /etc/nginx/certs/server.key;
    ssl_session_timeout    5m;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

    # ...
}
```

```
server {
    # ...

    ssl_client_certificate /etc/nginx/certs/ca.crt;
    ssl_verify_client      on;
    ssl_verify_depth       2;

    location / {
        if ($ssl_client_verify != SUCCESS) { return 403; }
        proxy_pass http://blog.linguofeng.com;
    }
}
```

```
$ http --verify=ca.crt --cert=client.pem HEAD https://localhost
```

参考：

[http://rockingdlabs.dunmire.org/exercises-experiments/ssl-client-certs-to-secure-mqtt](http://rockingdlabs.dunmire.org/exercises-experiments/ssl-client-certs-to-secure-mqtt)

[https://gist.github.com/mtigas/952344](https://gist.github.com/mtigas/952344)

[https://mosquitto.org/man/mosquitto-tls-7.html](https://mosquitto.org/man/mosquitto-tls-7.html)