---
layout: post
title: Cocos2d-x之Schedule
description: Cocos2dx的定时器
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、schedule <small>定时器</small></h1>
    </div>
<pre class="prettyprint">
// 每隔0.5秒执行一次callback函数
schedule(schedule_selector(Test::callback), 0.5f);

Test::callback(ccTime dt)
{
    
}
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、unschedule <small>取消定时器</small></h1>
    </div>
<pre class="prettyprint">
unschedule(schedule_selector(Test::callback));
</pre>
</section>

<section>
    <div class="page-header">
        <h1>三、CCScheduler <small>定时器管理器</small></h1>
    </div>
<pre class="prettyprint">
CCScheduler::sharedScheduler()->pauseTarget(this);          // 暂停当前对象所有的定时器
                              ->resumeTarget(this);         // 恢复当前对象所有的定时器
                              ->unscheduleAllSelectors();   // 取消所有的定时器，CCNode的会取消当前节点的定时器
</pre>
</section>

<section>
    <div class="page-header">
        <h1>四、scheduleUpdate() <small>默认定时器</small></h1>
    </div>
<pre class="prettyprint">
scheduleUpdate();

Test::update(ccTime dt)
{
    // 将会执行
}

unscheduleUpdate();
</pre>
</section>

<section>
    <div class="page-header">
        <h1>五、unscheduleUpdate() <small>取消默认定时器</small></h1>
    </div>
<pre class="prettyprint">
unscheduleUpdate();
</pre>
</section>
