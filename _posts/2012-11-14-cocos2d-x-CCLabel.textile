---
layout: post
title: Cocos2d-x之CCLabel 
description: Cocos2dx的文本显示
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h1>一、CCLabelAtlas <small>显示图片中的数字或文本</small></h1>
    </div>
    <p>
        <image src="http://ww2.sinaimg.cn/large/a74eed94jw1dyuee6bl7tj.jpg" />
    </p>
<pre class="prettyprint">
CCLabelAtlas * label = CCLabelAtlas::labelWithString("0", "数字图片", 24, 30, ' ');
label->setString("124");
</pre>
</section>

<section>
    <div class="page-header">
        <h1>二、CCLabelBMFont <small>显示Bitmap图片中的字体</small></h1>
    </div>
    <p>BMFont生成工具：http://www.n4te.com/hiero/hiero.jnlp</p>
    <p>
        <image src="http://ww1.sinaimg.cn/large/a74e55b4jw1dyuew3ezkyj.jpg" />
    </p>
<pre class="prettyprint">
CCLabelBMFont * label = CCLabelBMFont::labelWithString("http://blog.linguofeng.com", "生成的fnt文件");
                     // CCLabelBMFont::labelWithString("abc", "fnt", CCTextAlignment[Center, Left, Right], width);
label->setString("hello");              // 设置显示的文本，显示文本时加"\n"
label->setColor(ccc3(125, 15, 100));    // 设置显示的颜色

CCSprite * c1 = (CCSprite*)label->getChildByTag(1); // 得到的c1是"e"的一个精灵，可以做任何事情，比如动画效果
</pre>
</section>

<section>
    <div class="page-hereby">
        <h1>三、CCLabelTTF <small>显示ttf字体</small></h1>
    </div>
    <p>
        <image src="http://ww3.sinaimg.cn/large/a74ecc4cjw1dyujp9655uj.jpg" />
    </p>
<pre class="prettyprint">
                                              // 文本      大小         方向              字体名称             字体大小
CCLabelTTF * label = CCLabelTTF::labelWithString("hello", CCSizeMake, CCTextAlignment, "Monaco_Linux.TTF", 24);
label->setString("文本");
</pre>
</section>
