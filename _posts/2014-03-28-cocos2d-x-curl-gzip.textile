---
layout: post
title: Cocos2d-x Curl Gzip
description: Cocos2d-x Curl使用Gzip压缩
categories: [archive]
tags: [cocos2d-x, curl, gzip]
---

<section>
<p>HttpClient.cpp中的configureCURL里加入</p>
<pre>
code = curl_easy_setopt(handle, CURLOPT_ACCEPT_ENCODING, "gzip");
if (code != CURLE_OK) {
    return false;
}
</pre>
<p>关键字：curl, CURLOPT_ACCEPT_ENCODING, gzip</p>
</section>
