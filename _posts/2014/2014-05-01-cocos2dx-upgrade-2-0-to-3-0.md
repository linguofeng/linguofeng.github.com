---
layout: post
title: Cocos2d-x Upgrade 2.0 to 3.0
description: Cocos2d-x从2.0升级到3.0的一些比较
categories: [archive]
tags: [cocos2d-x]
---

<section>
	<p>由于项目使用CocosBuilder构建UI，类的变化比较多</p>

table(table table-bordered).
|_.old|_.new|
|@CCNodeLoaderLibrary@|@NodeLoaderLibrary@|
|@CC*Loader@|@*Loader@|
|@CCTable*@|@Table*@|
|@CCLuaEngine@|@LuaEngine@|
|@CCScriptEngineManager@|@ScriptEngineManager@|
|@SEL_CCControlHandler@|@Control::Handler@|
|@CCScrollView@|@ScrollView@|
|@CCControlEvent*@|@Control::EventType::*@|
|@CCControlEvent@|@Control::EventType@|
|@registerCCNodeLoader@|@registerNodeLoader@|
|@ccTouch*@|@onTouch*@|
|@CCScale9Sprite@|@Scale9Sprite@|
|@CCLabelTTF@|@Label@|
|@CCLabelBMFont@|@Label@|
|@CCBValue@|@Value@|
|@CCDictElement@|@DictElement@|
|@CCHttp*@|@network::Http*@|
|@CCHttpRequest::kHttp*@|@HttpRequest::Type::*@|
|@getChildren()->objectAtIndex(0)@|@getChildren().at(0)@|
|@unsigned int@|@ssize_t@|
|@kCCScrollViewDirection*@|@ScrollView::Direction::*@|
|@kCCTableViewFill*@|@TableView::VerticalFillOrder::*@|
|@pushCCObject@|@pushObject@|
|@CCEditBox@|@EditBox@|
|@EAGLView@|@CCEAGLView@|

</section>
