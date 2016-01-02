---
layout: post
title: Android
description: Android.mk包含所有cpp或c源文件
categories: [archive]
tags: [android]
---

<section>
<pre>
FILE_LIST := $(wildcard $(LOCAL_PATH)/目录1/*.cpp)
FILE_LIST += $(wildcard $(LOCAL_PATH)/目录2/*.cpp)

LOCAL_SRC_FILES := $(FILE_LIST:$(LOCAL_PATH)/%=%)
</pre>

</section>