---
layout: default
title: "Box2D物理引擎"
description: "很出名的2d物理引擎，有C++、Flash、Java等版本"
navigation: [1.基础概念]
---

<section>
    <div class="page-header">
        <h3>一、Box2D的一些概念</h3>
    </div>
    <h4><small>1.1</small> 刚体，质点，只有位置没有大小</h4>
    <ul>
        <li>静态刚体：静态刚体没有质量，没有速度，只可以手动来改变他的位置</li>
        <li>运动刚体：运动刚体没有质量，但是可以有速度，可以自己更新位置</li>
        <li>动态刚体：动态刚体有质量也有速度</li>
    </ul>
    <p>创建刚体</p>
<pre class="prettyprint">
b2BodyDef bodyDef;                                  // 定义刚体
bodyDef.type = b2_dynamicBody;                      // 定义刚体的类型b2_staticBody*, b2_kinematicBody, b2_dynamicBody
bodyDef.position.Set(x/PTM_RATIO, y/PTM_RATIO);     // 设置刚体的位置，进行单位转换，box2d以米作单位，所以把像素转换成米，32像素为1米

b2Body* groundBody = world->CreateBody(&bodyDef);   // 根据刚体定义创建刚体
</pre>

    <h4><small>1.2</small> 形状，添加到刚体上进行碰撞，具有摩擦和恢复等材料特性</h4>
<pre class="prettyprint">
b2PolygonShape dynamicBox;                              // 定义一个形状
dynamicBox.SetAsBox(.5f, .5f);                          // 设置这个盒子的中点，则盒子长宽为1m
</pre>

    <h4><small>1.3</small> 关联，关联是一种附加到刚体的属性，一个刚体可以有多个关联。</h4>
<pre class="prettyprint">
b2FixtureDef fixtureDef;                                // 定义一个关联
fixtureDef.shape = &dynamicBox;                         // 关联的形状
fixtureDef.density = 1.0f;                              // 密度
fixtureDef.friction = 0.3f;                             // 摩擦
body->CreateFixture(&fixtureDef);                       // 创建刚体关联
</pre>

    <h4><small>1.4</small> 链接，链接可以联系多个刚体</h4>
<pre class="prettyprint">
b2RevoluteJointDef rjd;                                 // 定义一个链接
rjd.Initialize(m_attachment, m_platform, b2Vec2(0.0f, 5.0f));
rjd.maxMotorTorque = 50.0f;
rjd.enableMotor = true;
world->CreateJoint(&rjd);
</pre>

    <h4><small>1.5</small> 约束</h4>
<pre class="prettyprint">
</pre>

    <h4><small>1.6</small> 世界</h4>
<pre class="prettyprint">
b2Vec2 gravity;                                         // 定义重力
gravity.Set(0.0f, -10.0f);                              // 设置重力的方向为-10
world = new b2World(gravity);                           // 创建世界
world->SetAllowSleeping(true);                          // 
world->SetContinuousPhysics(true);
</pre>
</section>
