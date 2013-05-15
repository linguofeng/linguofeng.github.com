---
layout: post
title: Linear Algebra
description: 线性代码笔记
categories: [archive]
tags: [math]
---

<section>
    <p>最近开始学习线性代数，在看http://v.163.com/special/opencourse/daishu.html麻省理工的线性代码公开课。</p>
    <p>这里做一些笔记吧。</p>
    <h4>方程组的几何解释</h4>
<pre>
x + 2y = 13;
3x - y = 4;
</pre>
    <p>使用矩形表示</p>
<pre>
  -   -     -    -   -    -
  | 1 |     |  2 |   | 13 |
x |   | + y |    | = |    |
  | 3 |     | -1 |   |  5 |
  -   -     -    -   -    -
</pre>
    <p>使用线性代数表示</p>
<pre>
-      -   -   -   -    -
| 1  2 |   | x |   | 13 |
|      | * |   | = |    |
| 3 -1 |   | y |   |  5 |
-      -   -   -   -    -
</pre>

When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

<math>
\begin{bmatrix}
3 & 5\\
1 & 2 
\end{bmatrix} \cdot
\begin{bmatrix}
x_1 \\
x_2 
\end{bmatrix} =
\begin{bmatrix}
4 \\
1
\end{bmatrix}
</math>

</section>