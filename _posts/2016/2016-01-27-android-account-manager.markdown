---
layout: "post"
title: "Android Account Manager"
date: "2016-01-27 20:15"
---

由于最近需要开发个后台同步的功能，翻看了官方的文档，发现了 `Sync Adapter` [https://developer.android.com/training/sync-adapters/index.html](https://developer.android.com/training/sync-adapters/index.html)

首先创建一个`AbstractAccountAuthenticator`，在系统设置的帐号里增加咱们的帐号管理器。

创建完该服务和创建`xml/authenticator.xml`和添加`AndroidManifest.xml`注册服务，安装包即可在系统设置的帐号里看到咱们的管理器。

```xml
<account-authenticator xmlns:android="http://schemas.android.com/apk/res/android"
    android:accountType="hr.saas.android.account"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:smallIcon="@mipmap/ic_launcher" />
```

```xml
<service
    android:name="hr.saas.android.account.GenericAccountService"
    android:enabled="true"
    android:exported="false">
    <intent-filter>
        <action android:name="android.accounts.AccountAuthenticator" />
    </intent-filter>
    <meta-data
        android:name="android.accounts.AccountAuthenticator"
        android:resource="@xml/authenticator" />
</service>
```

完成这步需要创建我们的登录Activity去请求我们的服务器验证登录，获得Token。

```java
// 创建Account
final Account account = new Account(accountEntity.getUsername(), GenericAccountService.ACCOUNT_TYPE);

// 添加
final AccountManager accountManager = AccountManager.get(getContext());
accountManager.addAccountExplicitly(account, accountEntity.getPassword(), null);
accountManager.setAuthToken(account, GenericAccountService.ACCOUNT_TYPE, accountEntity.getToken());
```

这样我们的帐号的信息就保存到了系统里了，就算把我们的应用删除了，帐号信息也不会被删除，可以做到持久化。

接下来就是使用这些帐号来登录我们的App了。

```java
Account accounts[] = mAccountManager.getAccountsByType(GenericAccountService.ACCOUNT_TYPE);
if (accounts.length > 0) {
    // 获取Token
    mAccountManager.getAuthToken(accounts[0], GenericAccountService.ACCOUNT_TYP, ...)
} else {
    // 通过addAccount方法去添加一个帐号
    mAccountManager.addAccount(GenericAccountService.ACCOUNT_TYPE, ...)
}
```

参考：

[http://udinic.wordpress.com/2013/04/24/write-your-own-android-authenticator/](http://udinic.wordpress.com/2013/04/24/write-your-own-android-authenticator/)

[https://github.com/Udinic/AccountAuthenticator](https://github.com/Udinic/AccountAuthenticator)

[http://www.devtf.cn/?p=1121](http://www.devtf.cn/?p=1121)
