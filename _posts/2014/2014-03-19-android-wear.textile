---
layout: post
title: Android Wear
description: Android智能手表
categories: [archive]
tags: [android, wear]
---

<section>
<p>Android出智能手表平台了，然后就去申请了个测试，很简单，在线报名，然后会回复一个邮件，点击邮件中的链接去play上下载app</p>
<p>具体步骤看官网介绍</p>
1. Open the Android Wear Preview app. You should see a notice that the app is currently not enabled as a notification listener. Tap the message to open the system settings, then select Android Wear Preview to grant it notification access.
2. Connect your device to your development machine over USB. Be sure that no other Android devices are connected to the machine.
3. Ensure that the Android Wear emulator (created in the previous section) is running. The emulator should show the time and an icon that indicates no device is connected.
4. Open a command line terminal, navigate to your Android SDK's platform-tools/ directory, then execute:
adb -d forward tcp:5601 tcp:5601
5. Return to the Android Wear Preview app. It should now indicate that it is connected to the emulator. The Android Wear emulator should now show the 'g' orb icon, indicating that is is connected to your device.
<p>大概意思就是启动Android Wear模拟器，打开Android Wear Preview应用，打开权限，usb连接电脑，使用adb -d forward tcp:5601 tcp:5601命令，然后手机收到通知会同步推到Android Wear模拟器上。</p>
<p>还有一个开发工具包，明天有空自己写个app玩一下。</p>
<p>see: http://developer.android.com/wear/preview/start.html</p>
</section>
