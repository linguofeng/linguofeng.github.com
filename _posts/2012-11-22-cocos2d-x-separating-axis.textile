---
layout: post
title: 游戏开发-分离轴定律
description: 使用分离轴定律进行碰撞检测
categories: [archive]
tags: [c++, cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、分离轴定律定义</h3>
    </div>
    <p>是指两个物体每条边分别垂直于该轴，如两物体的投影全部重叠则为碰撞，否则没碰撞。</p>
</section>

<section>
    <div class="page-header">
        <h3>二、一些公式</h3>
    </div>
    <p>2.1 投影公式</p>
<pre>
投影公式：
      顶点：(vx, vy)
      轴  ：(ax, ay)
      顶点的投影：(x, y)
        x = (vx * ax + vy * ay) / (ax * ax + ay * ay) * ax
        y = (vx * ax + vy * ay) / (ax * ax + ay * ay) * ay
      优化程序，可以省略(ax * ax + ay * ay)，假如为1
        x = (vx * ax + vy * ay) * ax
        y = (vx * ax + vy * ay) * ay
      顶点的投影的向量位置公式：
        d = (x * ax + y * ay)
</pre>

    <p>2.2 坐标旋转公式</p>
<pre class="prettyprint">
// angle : 旋转角度
// origin: 原点坐标
// point : 要旋转的坐标

// 弧度
float radian = angle * 3.1415926 / 180.0f;
// 旋转后的x坐标
float x = (point.x - origin.x) * cosf(radian) + (point.y - origin.y) * sinf(radian);
// 旋转后的y坐标
float y = (point.y - origin.y) * cosf(radian) - (point.x - origin.x) * sinf(radian);
</pre>
</section>
