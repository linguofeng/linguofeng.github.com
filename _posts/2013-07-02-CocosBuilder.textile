---
layout: post
title: CocosBuilder
description: CocosBuilder笔记
categories: [archive]
tags: [CocosBuilder]
---

<section>
    
table(table table-bordered).
|_.宏|_.说明|
|CCB_MEMBERVARIABLEASSIGNER_GLUE|绑定成员变量
CCBMemberVariableAssigner::onAssignCCBMemberVariable|
|CCB_SELECTORRESOLVER_CCMENUITEM_GLUE|绑定菜单事件
CCBSelectorResolver::onResolveCCBMenuItemSelector|
|CCB_SELECTORRESOLVER_CCCONTROL_GLUE|绑定按钮事件
CCBSelectorResolver::onResolveCCBControlSelector|




</section>

<section>
    <h4>JavaScript Controlled的坑</h4>
    <p>原来Cocos2dBuilder是区分脚本[lua/js]与C++的，如果选中了 Document > JavaScript Controlled 则表明这个ccb是与脚本绑定的，并且要是Owner var类型的绑定。</p>
    <p>所以创建ccb之后要考虑好这个ccb是与脚本还是C++进行绑定的。</p>
</section>