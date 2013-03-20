---
layout: post
title: Cocos2d-x之Lua支持std::vector容器
description: 使用LuaJIT开发Android应用
categories: [archive]
tags: [android, lua]
---

<section>
    <div class="page-header">
        <h3>一、编写vector.pkg</h3>
    </div>
<pre class="prettyprint">
class vector {

    TOLUA_TEMPLATE_BIND(T, string, CCSprite*)   // 添加我们想要的容器类型

    void clear();
    int size() const;

    const T& operator[](int index) const;
    T& operator[](int index);
    void push_back(T val);

    vector();
    ~vector();
};
</pre>

<section>
  <div class="page-header">
    <h3>二、生成绑定文件，使用tolua++生成的文件节选</h3>
  </div>
<pre class="prettyprint">
  ...
  #ifdef __cplusplus
  tolua_cclass(tolua_S,"vector_CCSprite__","vector<CCSprite*>","",tolua_collect_vector_CCSprite__);
  #else
  tolua_cclass(tolua_S,"vector_CCSprite__","vector<CCSprite*>","",NULL);
  #endif
  tolua_beginmodule(tolua_S,"vector_CCSprite__");
   tolua_function(tolua_S,"clear",tolua_Lottery_vector_CCSprite___clear00);
   tolua_function(tolua_S,"size",tolua_Lottery_vector_CCSprite___size00);
   tolua_function(tolua_S,".geti",tolua_Lottery_vector_CCSprite____geti00);
   tolua_function(tolua_S,".seti",tolua_Lottery_vector_CCSprite____seti00);
   tolua_function(tolua_S,".geti",tolua_Lottery_vector_CCSprite____geti01);
   tolua_function(tolua_S,"push_back",tolua_Lottery_vector_CCSprite___push_back00);
   tolua_function(tolua_S,"new",tolua_Lottery_vector_CCSprite___new00);
   tolua_function(tolua_S,"new_local",tolua_Lottery_vector_CCSprite___new00_local);
   tolua_function(tolua_S,".call",tolua_Lottery_vector_CCSprite___new00_local);
   tolua_function(tolua_S,"delete",tolua_Lottery_vector_CCSprite___delete00);
  tolua_endmodule(tolua_S);
  ...
</pre>
</section>

<section>
  <div class="page-header">
    <h3>三、在Lua中使用</h3>
  </div>
<pre class="prettyprint">
local string_vector = vector_string_:new_local()
string_vector:push_back("hello")
string_vector:push_back("world")
cclog(string_vector[0].." "..string_vector[1])

local ccsprite_vector = vector_CCSprite__:new_local()     // 注意指针类型的是__
ccsprite_vector:push_back(CCSprite:create("image"))
ccsprite_vector:push_back(CCSprite:create("image"))
</pre>
</section>