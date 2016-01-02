---
layout: post
title: Cocos2d-x之CCProfiler
description: Cocos2dx的性能分析器
categories: [archive]
tags: [cocos2d-x]
---

<p>注：本api基于Cocos2d-x 0.13版本</p>

<section>
    <div class="page-header">
        <h1>一、CCProfilingTimer <small>分析计时器</small></h1>
    </div>
<pre class="prettyprint">
#if CC_ENABLE_PROFILERS
    CCProfilingTimer * timer = CCProfiler::timerWithName("none", this)
#endif

#if CC_ENABLE_PROFILERS
    CCProfiler::releaseTimer(timer);
    timer = NULL;
#endif

#if CC_ENABLE_PROFILERS
    CCProfilingBeginTimingBlock(timer);
#endif

#if CC_ENABLE_PROFILERS
    CCProfilingEndTimingBlock(timer)
#endif
</pre>
</section>

