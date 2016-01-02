---
layout: post
title: Cocos2d-x之CCUserDefault
description: Cocos2dx的用户配置信息
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、set <small>设置</small></h1>
    </div>
<pre class="prettyprint">
CCUserDefault::sharedUserDefault()->setStringForKey("string", "value");
CCUserDefault::sharedUserDefault()->setIntegerForKey("integer", 10);
CCUserDefault::sharedUserDefault()->setFloatForKey("float", 2.3f);
CCUserDefault::sharedUserDefault()->setDoubleForKey("double", 2.4);
CCUserDefault::sharedUserDefault()->setBoolForKey("bool", true);
CCUserDefault::sharedUserDefault()->flush();
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、get <small>获取</small></h1>
    </div>
<pre class="prettyprint">
string ret = CCUserDefault::sharedUserDefault()->getStringForKey("string");
double d = CCUserDefault::sharedUserDefault()->getDoubleForKey("double");
int i = CCUserDefault::sharedUserDefault()->getIntegerForKey("integer");
float f = CCUserDefault::sharedUserDefault()->getFloatForKey("float");
bool b = CCUserDefault::sharedUserDefault()->getBoolForKey("bool");
</pre>
</section>
