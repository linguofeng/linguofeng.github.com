---
layout: post
title: Cocos2d-x之CCMenu
description: Cocos2dx的菜单
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、CCMenuItemSprite <small>精灵按钮</small></h1>
    </div>
<pre class="prettyprint">
CCSprite * normal = CCSprite::spriteWithFile("默认状态的图片");
CCSprite * selected = CCSprite::spriteWithFile("选中状态的图片");
CCSprite * disabled = CCSprite::spriteWithFile("禁用状态的图片");
CCMenuItemSprite * item = CCMenuItemSprite::itemFromNormalSprite(normal, selected, disabled, this, menu_selector(Test::callback));
                                         // itemFromNormalSprite(normal, selected, disabled);
                                         // itemFromNormalSprite(normal, selected, this, menu_selector(Test::callback));
                                         // itemFromNormalSprite(normal, selected);
item->setIsEnabled(false);     // 是否可用，默认true
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、CCMenuItemImage <small>图片按钮</small></h1>
    </div>
<pre class="prettyprint">
CCMenuItemImage * item = CCMenuItemImage::itemFromNormalImage("默认状态", "选中状态", this, menu_selector(Test::callback));
                                       // itemFromNormalImage("默认状态", "选中状态");
                                       // itemFromNormalImage("默认", "选中", "禁用", this, menu_selector(Test::callback));
                                       // itemFromNormalImage("默认", "选中", "禁用");
</pre>
</section>

<section>
    <div class="page-header">
        <h1>三、CCMenuItemLabel <small>label按钮</small></h1>
    </div>
<pre class="prettyprint">
// 支持CCLabelAtlas、CCLabelBMFont
CCLabelAtlas * label = CCLabelAtlas::labelWithString("123", "nums.png", 24, 30, '');
CCMenuItemLabel * item = CCMenuItemLabel::itemWithLabel(label, this, menu_selector(Test::callback));
                                       // itemWithLabel(label);
item->setDisabledColor(ccc3(255, 255, 255));
item->setColor(ccc3(0, 0, 0));
</pre>
</section>

<section>
    <div class="page-header">
        <h1>四、CCMenuItemFont <small>字体按钮</small></h1>
    </div>
<pre class="prettyprint">
CCMenuItemFont * item = CCMenuItemFont::itemFromString("文本", this, menu_selector(Test::callback));
                                     // itemFromString("文本");
item->setFontSizeObj(24);
item->setFontName("Monaco");

// 全局字体与大小
CCMenuItemFont::setFontSize("全局字体大小");
CCMenuItemFont::setFontName("全局字体名称");
</pre>
</section>

<section>
    <div class="page-header">
        <h1>五、CCMenuItemToggle <small>开关式按钮</small></h1>
    </div>
<pre class="prettyprint">
CCMenuItemToggle * item = CCMenuItemToggle::itemWithTarget(this,
        menu_selector(Test::callback),
        CCMenuItemFont::itemFromString("On"),
        CCMenuItemFont::itemFromString("Off"),
        NULL);
item->getSubItems()->addObject(CCMenuItemFont::itemFromString("Other"));
item->setSelectedIndex(2);
</pre>
</section>

<section>
    <div class="page-header">
        <h1>六、CCMenu</h1>
    </div>
<pre class="prettyprint">
CCMenu * menu = CCMenu::menuWithItems(item1, item2, NULL);
menu->alignItemsHorizontally();         // 垂直对齐
menu->alignItemsVertically();           // 水平对象
menu->alignItemsInColumns(2, 1, NULL);  // 两行，两列，一列
</pre>
</section>

<section>
    <div class="page-header">
        <h1>七、callback</h1>
    </div>
<pre class="prettyprint">
Test::callback(CCObject * sender)
{

}
</pre>
</section>
