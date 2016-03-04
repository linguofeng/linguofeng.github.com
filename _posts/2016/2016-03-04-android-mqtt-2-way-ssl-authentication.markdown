---
layout: "post"
title: "android与mqtt双向SSL认证"
date: "2016-03-04 15:06"
---

Android与MQTT实现双向认证。

需要的工具：

1. bcprov-ext-jdk14-1.54.jar
2. portecle-1.9
3. UnlimitedJCEPolicyJDK8

生成`ca.bks`完成对服务器的自签名单向认证

```bash
$ keytool -import \
    -alias mqtt.broker \
    -file ca.crt \
    -keypass passw0rd \
    -keystore ca.bks  \
    -storetype BKS \
    -storepass passw0rd \
    -providerClass org.bouncycastle.jce.provider.BouncyCastleProvider \
    -providerpath bcprov-ext-jdk14-1.54.jar
```

```java
MqttAndroidClient clint = ...
MqttConnectOptions options = new MqttConnectOptions();
InputStream input = this.getApplicationContext().getAssets().open("ca.bks");
options.setSocketFactory(client.getSSLSocketFactory(input, "passw0rd"));
```

生成`client.bks`完成对客户端的认证，需要借portecle工具把pfx转成bks

```bash
$ openssl pkcs12 -export -inkey client.key -in client.crt -out client.pfx
$ java -jar portecle.jar
```

```
File -> New Keystore -> BKS-V1 -> Tools -> Import Key Pair -> choose -> client.pfx
```

> 如果提示错误就安装UnlimitedJCEPolicyJDK8

```java
private SSLSocketFactory getSSLSocketFactory(Context context, String password) throws MqttSecurityException {
    try {
        InputStream keyStore = context.getResources().getAssets().open("client.bks");
        KeyStore km = KeyStore.getInstance("BKS");
        km.load(keyStore, password.toCharArray());
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
        kmf.init(km, password.toCharArray());

        InputStream trustStore = context.getResources().getAssets().open("ca.bks");
        KeyStore ts = KeyStore.getInstance("BKS");
        ts.load(trustStore, password.toCharArray());
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("X509");
        tmf.init(ts);

        SSLContext ctx = SSLContext.getInstance("SSL");
        ctx.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
        return ctx.getSocketFactory();
    } catch (KeyStoreException | CertificateException | IOException | NoSuchAlgorithmException | KeyManagementException | UnrecoverableKeyException e) {
        throw new MqttSecurityException(e);
    }
}

options.setSocketFactory(getSSLSocketFactory(context, "passw0rd"));
```

参考：

1. [http://www.hivemq.com/blog/mqtt-client-library-enyclopedia-paho-android-service](http://www.hivemq.com/blog/mqtt-client-library-enyclopedia-paho-android-service)
2. [http://blog.csdn.net/hfeng101/article/details/10163627](http://blog.csdn.net/hfeng101/article/details/10163627)
3. [http://certificate.fyicenter.com/971_Portecle_PKCS_12_Export_Error_in_Portecle.html](http://certificate.fyicenter.com/971_Portecle_PKCS_12_Export_Error_in_Portecle.html)