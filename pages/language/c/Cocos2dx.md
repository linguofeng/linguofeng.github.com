---
layout: default
category: Tools
title: Cocos2d-x
description: 开源、跨平台的游戏引擎
---

<section>
    <div class="page-header">
        <h3>一、下载</h3>
    </div>

    <pre>
        http://cocos2d-x.org/projects/cocos2d-x/wiki/Download
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>二、安装 <small>环境：Ubuntu 12.04.1 32bit</small></h3>
    </div>
    
    <pre>
        $ mkdir /path/to/cocos2d-x
        $ mv cocos2d-2.0-rc2-x-2.0.1.zip /path/to/cocos2d-x
        $ cd /path/to/cocos2d-x
        $ unzip cocos2d-2.0-rc2-x-2.0.1.zip
        $ <a href="/pages/tools/SublimeText.html">subl</a> ~/.bashrc
    </pre>
    <pre>
        export COCOS2DX_ROOT=/path/to/cocos2d-x
        export NDK_ROOT=/path/to/android-ndk-r8b    // 需要Android Ndk环境
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>三、HelloWorld <small>需要有Android SDK环境与Ant，<a href="#">点击查看</a></small></h3>
    </div>
    
    <pre>
        $ cd $COCOS2DX_ROOT/HelloWorld/proj.android
        $ chmod u+x build_native.sh
        $ ./build_native.sh                            // 编译库
        $ android update project -p . -t android-10    // 生成Ant需要的build.xml文件
        $ ant debug install                            // 安装到机器上
    </pre>
</section>

<section>
    <div class="page-header">
        <h3>四、Cocds2d-x基础</h3>
    </div>
    <p>*主要类介绍*</p>
table(table table-bordered).
|_.类|_.说明|_.作用|_.关系|
|@CCDirector@|导演(单例)|负责场景的切换以及场景的信息。如宽度，高度，旋转场景内容。|包含多个 CCScene|
|@CCScene@|场景|场景包含有布景，精灵，每场戏的不同，要切换场景。游戏中可分为主界面， 游戏， 分数榜，结束界面等。|包含多个 CCLayer|
|@CCLayer@|布景|类似是层的概念，也可来源于PS的层的概念。每一层都带有众多精灵等|包含多个 CCSprite|
|@CCSprite@|精灵|就是演员的，演员就需要加入到层里面去的。有相应的动作。|包含多个 CCAction|
|@CCAction@|动作|精灵的动作。||
|@CCMenu@|菜单|||

    <p>*场景的转换*</p>
<pre class="prettyprint">
CCScene* scene = CCScene::node();                                   // 创建scene
CCLayer* layer = CCLayer::node();                                   // 创建layer
scene->addChild(layer);                                             // 添加layer到scene
CCScene* preScene = CCDirector::ShareDirector()->getRunningScene(); // 获取当前正在显示的场景
if (preScene == null) {                                             // 如果当前没有正在显示的场景
    CCDirecotr::ShareDirector()->runWithScene(scene);               // 显示myScene场景
} else {                                                            // 否则
    CCDirecotr::ShareDirector()->replaceScene(scene);               // 替换成myScene场景
}
</pre>

    <p>*常见宏*</p>
<pre class="prettyprint">
NS_CC_BEGIN
    // cocos2d命名空间开始
NS_CC_END
    // cocos2d命名空间结束
USING_NS_CC;
    // 声明cocos2d命名空间
CC_SYNTHESIZE_READONLY(varType, varName, funName)
    // 声明一个成员变量以及getfunName函数，没有set函数。getfunName已经实现，其实现就是返回这个值。
CC_SYNTHESIZE_READONLY_PASS_BY_REF(varType, varName, funName)
    // 类似CC_SYNTHESIZE_READONLY，不过getfunName返回的是引用。
CC_SYNTHESIZE(varType, varName, funName)
    // 声明一个成员变量以及getfunName，setfunName函数.函数声明和实现都有
CC_SYNTHESIZE_PASS_BY_REF(varType, varName, funName)
    // 类似CC_SYNTHESIZE，不过getfunName返回的是引用。
CC_PROPERTY_READONLY(varType, varName, funName)
    // 声明一个成员变量以及getfunName函数，没有set函数。getfunName函数的实现要自己做
CC_PROPERTY_READONLY_PASS_BY_REF(varType, varName, funName)
    // 类似CC_PROPERTY_READONLY，不过getfunName返回的是引用。getfunName函数的实现要自己做
CC_PROPERTY(varType, varName, funName)
    // 声明一个成员变量以及getfunName，setfunName函数.函数实现要自己做
CC_PROPERTY_PASS_BY_REF(varType, varName, funName)
    // 类似CC_PROPERTY，，不过getfunName返回的是引用
</pre>

    <h3><small>4.1</small> 动作</h3>

    <p>@CCAction@ ：动作，分为瞬时动作 @CCActionInstanse@ ，延时动作 @CCActionInterval@</p>

table(table table-bordered).
|_.动作|_.说明|_.构造 @CCActionInterval@|_.参数说明|
|@CCMoveTo@|移动到目标位置|@CCMoveTo::actionWithDuration(2, ccp(100, 100))@|时间，位置|
|@CCMoveBy@|从目标位置移动|@CCMoveBy::actionWithDuration(2, ccp(100, 100))@|时间，位置|
|@CCScaleTo@|缩放至多少倍|@CCScaleTo::actionWithDuration(2, 0.5f)@|时间，倍数（x、Y柚同时缩放）|
|@CCScaleBy@|放大至多少倍|@CCScaleBy::actionWithDuration(2, 2f, 3f)@|时间，x柚放大倍数，Y柚放大倍数|
|@CCRotateTo@|旋转多少角度|@CCRotateTo::actionWithDuration(2, 45f)@|时间，角度（正数顺时间，负数逆时针）|
|@CCRotateBy@|旋转多少角度|@CCRotateBy::actionWithDuration(2, 360f)@|时间，角度（正数顺时间，负数逆时针）|
|@CCSkewTo@|倾斜|@CCSkewTo::actionWithDuration(2, 37.2f, -37.2f)@|时间，X柚倾斜角度，Y柚倾斜角度|
|@CCSkewBy@|倾斜|@CCSkewBy::actionWithDuration(2, 37.2f, -37.2f)@|时间，X柚倾斜角度，Y柚倾斜角度|
|@CCJumpTo@|跳跃|@CCJumpTo::actionWithDuration(2, ccp(300,300), 50, 4)@|时间，目标坐标，跳的高度，跳的次数|
|@CCJumpBy@|跳跃|@CCJumpBy::actionWithDuration(2, ccp(300,300), 50, 4)@|时间，目标坐标，跳的高度，跳的次数|
|@CCBezierTo@|贝塞尔曲线运行|@CCBezierTo::actionWithDuration(3, bezier)@|时间， @ccBezierConfig@<sup><a href="javascript:void(0);" rel="popover" data-content="<pre>ccBezierConfig bezier;
bezier.controlPoint_1 = ccp(0, s.height/2);
bezier.controlPoint_2 = ccp(300, -s.height/2);
bezier.endPosition = ccp(300,100);</pre>" data-original-title="ccBezierConfig">注</a></sup> 结构体|
|@CCBezierBy@|贝塞尔曲线运行|@CCBezierBy::actionWithDuration(3, bezier)@|时间， @ccBezierConfig@ 结构体|
|@CCBlink@|闪|@CCBlink::actionWithDuration(2, 10)@|时间，次数|
|@CCFadeIn@|淡入|@CCFadeIn::actionWithDuration(1.0f)@|时间|
|@CCFadeOut@|淡出|@CCFadeOut::actionWithDuration(1.0f)@|时间|
|@CCTintTo@|颜色变化|@CCTintTo::actionWithDuration(2, 255, 0, 255)@|时间，红，绿，蓝|
|@CCTintBy@|颜色变化|@CCTintBy::actionWithDuration(2, 255, 0, 255)@|时间，红，绿，蓝|
|@CCAnimate@|动画|@CCAnimate::actionWithDuration(3, animation, false)@|时间， @CCAnimation@<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>CCAnimation* animation = CCAnimation::animation();
char frameName[100] = {0};
for(int i=1;i<15;i++) {
    sprintf(frameName, "Images/grossini_dance_%02d.png", i);
    animation->addFrameWithFileName(frameName);
}</pre>' data-original-title="CCAnimation">注</a></sup>，是否恢复原始帧|

table(table table-bordered).
|_.动作组合方式|_.说明|_.构造 @CCAction@|_.参数|
|@CCSequence@|动作序列，有序地一个一个执行动作|@CCSequence::actions(actionTo, actionToBack, NULL)@|动作1、运作2、...、后面必须加NULL表示没有了|
|@CCRepeatForever@|重复执行动作|@CCRepeatForever::actionWithAction(actionTo)@|动作|
|@CCSpawn@|同时执行动作|@CCSpawn::actions(actionTo, actionToBack, NULL)@|动作1、运作2、...、后面必须加NULL表示没有了|

table(table table-bordered).
|_.动作回调|_.说明|_.构造|_.参数|
|@CCCallFunc@|不带参数的回调|@CCCallFunc::actionWithTarget(this, callfunc_selector(Class::callback1))@|当前动作，回调函数<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>
void Class::callback1()
{
    
}
</pre>' data-placement="left" data-original-title="Class::callback1">注</a></sup>|
|@CCCallFuncN@|不带参数但带调用本身|@CCCallFuncN::actionWithTarget(this, callfuncN_selector(Class::callback2))@|当前动作，回调函数<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>
void Class::callback2(CCNode* sender)
{
    
}
</pre>' data-placement="left" data-original-title="Class::callback2">注</a></sup>|
|@CCCallFuncND@|带参数的回调|@CCCallFuncND::actionWithTarget(this, callfuncND_selector(Class::callback3), (void*)0xbebabeba)@|当前动作，回调函数<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>
void Class::callback3(CCNode* sender, void* data)
{
    
}
</pre>' data-placement="left" data-original-title="Class::callback3">注</a></sup>|

<pre class="prettyprint">
CCSize size = CCDirector::sharedDirector()->getWinSize();           // 获取屏幕大小
CCSprite * pSprite = CCSprite::spriteWithFile("HelloWorld.png");    // 创建精灵
CCActionInterval * actionTo = CCMoveTo::actionWithDuration(2, CCPointMake(size.width-40, size.height-40));
pSprite->runAction(actionTo);                                       // 运行动作
</pre>

    <h3><small>4.2</small> 菜单</h3>

    <p>@CCMenu@ ：菜单，参考： "http://www.cocos2d-x.org/reference/native-cpp/d1/da0/classcocos2d_1_1_c_c_menu.html":http://www.cocos2d-x.org/reference/native-cpp/d1/da0/classcocos2d_1_1_c_c_menu.html</p>
<pre class="prettyprint">
// 创建菜单Item
CCMenuItem* m1 = CCMenuItemFont::itemFromString("新游戏", this, menu_selector(MainLayer::onNewGame));  // menu_selector为全局常量

CCLabelBMFont* label = CCLabelBMFont::labelWithString("Enable AtlasItem", "fonts/bitmapFontTest3.fnt");
CCMenuItem* m2 = CCMenuItemLabel::itemWithLabel(label, this, menu_selector(MainLayer::onNewGame));        // 通过Label创建Item

CCMenuItem* m3 = CCMenuItemAtlasFont    // 通过

CCSprite *spriteNormal   = CCSprite::spriteWithFile("image.png",  CCRectMake(0,23*2,115,23));
CCSprite *spriteSelected = CCSprite::spriteWithFile("image.png",  CCRectMake(0,23*1,115,23));
CCSprite *spriteDisabled = CCSprite::spriteWithFile("image.png",  CCRectMake(0,23*0,115,23));
CCMenuItem* m4 = CCMenuItemSprite::itemFromNormalSprite(spriteNormal, spriteSelected, spriteDisabled, 
                                                        this, 
                                                        menu_selector(MainLayer::onNewGame));

CCMenuItem* m5 = CCMenuItemImage::itemFromNormalImage("image.png", "imagep.png", this, menu_selector(MainLayer::onNewGame) );

CCMenuItem* m6 = CCMenuItemToggle::itemWithTarget(this, menu_selector(MainLayer::onNewGame), 
                                                        CCMenuItemFont::itemFromString("High"),
                                                        CCMenuItemFont::itemFromString("Low"),
                                                        ...,
                                                        NULL);
m6->getSubItems()->addObject(CCMenuItemFont::itemFromString("33%"));
m6->setSelectedIndex(2);

// 添加菜单Item到菜单中
CCMenu* menu = CCMenu::menuWithItems(m1, m2, m3, m4, m5, m6, NULL); // 最后必须加NULL

void MainLayer::onNewGame(CCObject* pSender) {
    // 回调
}
</pre>

    <h3><small>4.3</small> 多层</h3>

    <p>@CCLayerMultiplex@ :多个层，参考： "http://www.cocos2d-x.org/reference/native-cpp/d3/d7e/classcocos2d_1_1_c_c_layer_multiplex.html":http://www.cocos2d-x.org/reference/native-cpp/d3/d7e/classcocos2d_1_1_c_c_layer_multiplex.html</p>
<pre class="prettyprint">
CCLayer* pLayer1 = new MenuLayer1();
CCLayer* pLayer2 = new MenuLayer2();
CCLayer* pLayer3 = new MenuLayer3();
CCLayer* pLayer4 = new MenuLayer4();

CCLayerMultiplex* layer = CCLayerMultiplex::layerWithLayers(pLayer1, pLayer2, pLayer3, pLayer4, NULL);
addChild(layer, 0); 

pLayer1->release();
pLayer2->release();
pLayer3->release();
pLayer4->release();

CCDirector::sharedDirector()->replaceScene(this);

// 切换
((CCLayerMultiplex*)m_pParent)->switchTo(0);
</pre>

    <h3><small>4.4</small> 进度条</h3>

    <p>@CCProgressTimer@ ：进度条</p>

table(table table-bordered).
|_.type|_.说明|
|@kCCProgressTimerTypeRadialCCW@|径向逆时针旋转|
|@kCCProgressTimerTypeRadialCW@|径向顺时针旋转|
|@kCCProgressTimerTypeHorizontalBarLR@|水平从左往右|
|@kCCProgressTimerTypeHorizontalBarRL@|水平从右往左|
|@kCCProgressTimerTypeVerticalBarBT@|垂直从下往上|
|@kCCProgressTimerTypeVerticalBarTB@|垂直从上往下|

<pre class="prettyprint">
CCProgressTimer * pt = CCProgressTimer::progressWithFile("image.png");
pt->setType(kCCProgressTimerTypeRadialCCW);
pt->setType(kCCProgressTimerTypeRadialCW);
pt->setType(kCCProgressTimerTypeHorizontalBarLR);
pt->setType(kCCProgressTimerTypeHorizontalBarRL);
pt->setType(kCCProgressTimerTypeVerticalBarBT);
pt->setType(kCCProgressTimerTypeVerticalBarTB);
CCProgressTo * to = CCProgressTo::actionWithDuration(2, 100);    // 时间，百分比
pt->runAction(CCRepeatForever::actionWithAction(to));
</pre>

    <h3><small>4.5</small> 场景转换</h3>

    <p>@CCTransitionScene@ ：场景转换效果</p>
table(table table-bordered).
|_.效果|_.说明|_.方法|_.参数|
|@CCTransitionFade@|以颜色淡出淡入|@transitionWithDuration(时间, 场景, ccBLACK)@|@ccc3(255,0,0)@ ：三原色|
|@CCTransitionFlipX@|水平翻转屏幕|@transitionWithDuration(时间, 场景, kOrientationRightOver)@|@kOrientationLeftOver@ ：从左往右 <br>@kOrientationRightOver@ ：从右往左|
|@CCTransitionFlipY@|垂直翻转屏幕|@transitionWithDuration(时间, 场景, kOrientationUpOver)@|@kOrientationUpOver@ ：从上往下 <br>@kOrientationDownOver@ ：从下往上|
|@CCTransitionFlipAngular@|角度翻转屏幕|@transitionWithDuration(时间, 场景, kOrientationRightOver)@|@kOrientationLeftOver@ ：从左下角往上 <br>@kOrientationRightOver@ ：从右上角往下|
|@CCTransitionZoomFlipX@|水平翻转并缩小/放大|@transitionWithDuration(时间, 场景, kOrientationRightOver)@|@kOrientationLeftOver@ ：从左(放大)往右 <br>@kOrientationRightOver@ ：从右(放大)往左|
|@CCTransitionZoomFlipY@|垂直翻转并缩小/放大|@transitionWithDuration(时间, 场景, kOrientationUpOver)@|@kOrientationUpOver@ ：从上(放大)往下 <br>@kOrientationDownOver@ ：从下(放大)往上|
|@CCTransitionZoomFlipAngular@|角度翻转并缩小/放大|@transitionWithDuration(时间, 场景, kOrientationRightOver)@|@kOrientationLeftOver@ ：从左下角(放大)往上 <br>@kOrientationRightOver@ ：从右上角(放大)往下|
|@CCTransitionShrinkGrow@|收缩出放大入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionRotoZoom@|转收缩出转放大入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionMoveInL@|从左移动入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionMoveInR@|从右移动入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionMoveInT@|从上移动入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionMoveInB@|从下移动入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSlideInL@|从左平滑移入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSlideInR@|从右平滑移入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSlideInT@|从上平滑移入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSlideInB@|从下平滑移入|@transitionWithDuration(时间, 场景)@||
|@CCTransitionCrossFade@|交叉淡入两个场景|@transitionWithDuration(时间, 场景)@||
|@CCTransitionPageTurn@|翻页|@transitionWithDuration(时间, 场景, 参数)@|@true@ ：合上 <br>@false@ ：翻开|
|@CCTransitionFadeTR@|往右上角马赛克退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionFadeBL@|往左下角马赛克退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionFadeUp@|往上角马赛克退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionFadeDown@|往下角马赛克退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionTurnOffTiles@|随机马赛克退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSplitRows@|基数行左，偶数行右退出|@transitionWithDuration(时间, 场景)@||
|@CCTransitionSplitCols@|基数行上，偶数行下退出|@transitionWithDuration(时间, 场景)@||

<pre class="prettyprint">
CCTransitionFade * tfScene = CCTransitionFade::transitionWithDuration(2, new CCScene(), ccBLACK);
if (tfScene) {
    CCDirector::sharedDirector()->replaceScene(pScene);
}
</pre>

    <h3><small>4.6</small> 效果</h3>
table(table table-bordered).
|_.类|_.说明|_.静态函数|
|@CCShaky3D@|摇动的3D|@CCShaky3D::actionWithRange(5, true, ccg(15,10), t)@ // 范围 是否摇动 网格大小 时间|
|@CCWaves3D@|波浪3D|@CCWaves3D::actionWithWaves(5, 40, ccg(15,10), t)@|
|@CCFlipX3D@|水平翻转3D|@CCFlipX3D::actionWithDuration(t)@|
|@CCFlipY3D@|垂直翻转3D|@CCFlipY3D::actionWithDuration(t)@|
|@CCLens3D@|镜面3D|@CCLens3D::actionWithPosition(CCPointMake(size.width/2,size.height/2), 240, ccg(15,10), t)@|
|@CCRipple3D@|波纹3D|@CCRipple3D::actionWithPosition(CCPointMake(size.width/2,size.height/2), 240, 4, 160, ccg(32,24), t)@|
|@CCLiquid@|液体效果|@CCLiquid::actionWithWaves(4, 20, ccg(16,12), t)@|
|@CCWaves@|波浪效果|@CCWaves::actionWithWaves(4, 20, true, true, ccg(16,12), t)@|
|@CCTwirl@|晃动效果|@CCTwirl::actionWithPosition(CCPointMake(size.width/2, size.height/2), 1, 2.5f, ccg(12,8), t)@|
|@CCShakyTiles3D@|摇动马赛克|@CCShakyTiles3D::actionWithRange(5, true, ccg(16,12), t)@|
|@CCShatteredTiles3D@|破碎马赛克|@CCShatteredTiles3D::actionWithRange(5, true, ccg(16,12), t)@|
|@CCShuffleTiles@|随机马赛克|@CCShuffleTiles::actionWithSeed(25, ccg(16,12), t)@|
|@CCFadeOutTRTiles@|往右上角马赛克淡出|@CCFadeOutTRTiles::actionWithSize(ccg(16,12), t)@|
|@CCFadeOutBLTiles@|往左下角马赛克淡出|@CCFadeOutBLTiles::actionWithSize(ccg(16,12), t)@|
|@CCFadeOutUpTiles@|往上马赛克淡出|@CCFadeOutUpTiles::actionWithSize(ccg(16,12), t)@|
|@CCFadeOutDownTiles@|往下马赛克淡出|@CCFadeOutDownTiles::actionWithSize(ccg(16,12), t)@|
|@CCTurnOffTiles@|马赛克随机消失|@CCTurnOffTiles::actionWithSeed(25, ccg(48,32) , t)@|
|@CCWavesTiles3D@|波浪马赛克|@CCWavesTiles3D::actionWithWaves(4, 120, ccg(15,10), t)@|
|@CCJumpTiles3D@|跳动的3D马赛克|@CCJumpTiles3D::actionWithJumps(2, 30, ccg(15,10), t)@|
|@CCSplitRows@|基数往左，偶数往下|@CCSplitRows::actionWithRows(9, t)@|
|@CCSplitCols@|基数往上，偶数往下|@CCSplitCols::actionWithCols(9, t)@|
|@CCPageTurn3D@|3D翻页效果|@CCPageTurn3D::actionWithSize(ccg(15,10), t)@|

    <h3><small>4.7</small> 节点</h3>
    <p>节点嵌套节点</p>
<pre class="prettyprint">
CCSprite * pSprite1 = new CCSprite();   // 一个精灵相当于一个节点
CCSprite * pSprite2 = new CCSprite();

pSprite1->addChild(pSprite2);           // 一个节点嵌套另一个节点

pSprite1->runAction(action);            // 如果父节点执行动作，那此时所有子节点都会执行该动作。
</pre>

    <p>节点删除与清除</p>
<pre class="removeChild">
prettyprint(node, false/true);          // 节点，false不清理正在运行的动作、true清理正在运行的动作
</pre>

    <h3><small>4.8</small> 精灵</h3>

table(table table-bordered).
|_.类|_.说明|_.静态函数|_.参数|
|/8.@CCSprite@|/8.精灵|@CCSprite::spriteWithTexture(CCTexture2D*)@|质地|
|@CCSprite::spriteWithTexture(CCTexture2D*, CCRect&)@|质地， @CCRect@<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>
CCRectMake(x, y, width, height);
</pre>' data-original-title="CCRect">注</a></sup> 矩形|
|@CCSprite::spriteWithTexture(CCTexture2D*, CCRect&, CCPoint&)@|质地，矩形， @CCPoint@<sup><a href="javascript:void(0);" rel="popover" data-content='<pre>
CCPointMake(x, y);
</pre>' data-original-title="CCPoint">注</a></sup> 点|
|@CCSprite::spriteWithSpriteFrame(CCSpriteFrame*)@|@CCSpriteFrame@<sup><a href="#CCSpriteFrame" data-toggle="modal">注</a></sup> 精灵框架|
|@CCSprite::spriteWithSpriteFrameName(char*)@|CCSpriteFrame名称|
|@CCSprite::spriteWithFile(char*)@|文件名|
|@CCSprite::spriteWithFile(char*, CCRect&)@|文件名，矩形|
|@CCSprite::spriteWithBatchNode(CCSpriteBatchNode*, CCRect&)@|@CCSpriteBatchNode@<sup><a href="#CCSpriteBatchNode" data-toggle="modal">注</a></sup> 批量节点，矩形|
|@CCSpriteBatchNode@|精灵批量节点|@CCSpriteBatchNode->addChild(CCSprite)@|添加多个精灵到节点上|
<div id="CCSpriteFrame" class="modal hide fade" style="display: none; ">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h3>CCSpriteFrame</h3>
    </div>
    <div class="modal-body">
<pre>
frameWithTexture(CCTexture2D* pobTexture, const CCRect& rect);
frameWithTexture(CCTexture2D* pobTexture, const CCRect& rect, 
                 bool rotated, 
                 const CCPoint& offset, 
                 const CCSize& originalSize);
</pre>
    </div>
    <div class="modal-footer">
      <button class="btn" data-dismiss="modal">Close</button>
    </div>
</div>

<div id="CCSpriteBatchNode" class="modal hide fade" style="display: none; ">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h3>CCSpriteBatchNode</h3>
    </div>
    <div class="modal-body">
<pre>
batchNodeWithTexture(CCTexture2D* tex);
batchNodeWithTexture(CCTexture2D* tex, unsigned int capacity);
batchNodeWithFile(const char* imgName);
batchNodeWithFile(const char* imgName, unsigned int capacity);
</pre>
    </div>
    <div class="modal-footer">
      <button class="btn" data-dismiss="modal">Close</button>
    </div>
</div>

    <h3><small>4.9</small> 定时器</h3>

<pre class="prettyprint">
schedule(schedule_selector(Class::callback), 1);   // 回调，时间；每隔1秒执行一次

void Class::callback(ccTime dt) {
    
}

unschedule(schedule_selector(Class::callback));   // 取消定时器
</pre>

    <h3><small>4.10</small> 内存管理 <small>原则：每个自定义类必须继承 @cocos2d::CCObject@ 对象</small></h3>

    <p>*CCObject对象的内存管理相关接口*</p>
<pre class="prettyprint">
// 引用次数+1 
virtual void CCObject::retain(void); 
// 引用次数-1；若引用计数器=0，则delete this； 
virtual void CCObject::release(void); 
// helper方法，快速判断当前对象只有唯一引用 
bool CCObject::isSingleRefrence(void); 
// 返回引用次数 
unsigned int CCObject::retainCount(void);
// 自动释放（自动管理）
CCObject* CCObject::autorelease(void); 
</pre>

    <p>*手动管理内存*</p>
<pre class="prettyprint">
class MyClass: public cocos2d::CCObject
{
public:
    MyClass();
    ~MyClass();
}

MyClass * obj = new MyClass();
...
obj->release(); // 谁生成（new、copy）谁负责release

// 谁retain，谁负责release。
obj->retain();
...
obj->release();

// 传递赋值时，需要先retain形参，后release原指针，最后赋值。（注意，因为这里没有使用自赋值检查，所以这组顺序不能错。）
void CCNode::setGrid(CCGridBase* pGrid) 
{ 
    CC_SAFE_RETAIN(pGrid);
    CC_SAFE_RELEASE(m_pGrid);
    m_pGrid = pGrid;
}
</pre>

    <p>*自动管理内存*</p>
<pre class="prettyprint">
MyClass * obj = new MyClass();
obj->autorelease(); // 每帧绘制结束，就自动release池中的对象。
</pre>
</section>
