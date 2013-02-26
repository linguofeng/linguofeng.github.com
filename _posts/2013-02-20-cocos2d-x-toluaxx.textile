---
layout: post
title: Cocos2d-x之使用tolua++生成lua对象
description: 以CCScale9Sprite为例
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、创建CCScale9Sprite.pkg</h3>
    </div>
<div class="lgf-command">
1.保留枚举类型
2.删除CC_DLL，改用多继承
3.删除inline内联关键字
4.删除public等访问限定词
5.删除成员变量
6.保留static关键字
7.删除非public的函数
</div>
<pre class="lgf-command-description prettyprint">
class CCScale9Sprite : public CCNode
{
    void setPreferredSize(CCSize size);
    static CCScale9Sprite* create(const char *pszFileName);
};
</pre>
</section>

<section>
    <div class="page-header">
        <h3>二、修改Cocos2d.pkg</h3>
    </div>
<pre class="prettyprint">
$#include "LuaCocos2d.h"

$pfile "CCScale9Sprite.pkg"
</pre>
</section>

<section>
    <div class="page-header">
        <h3>三、生成CCScale9Sprite.cpp</h3>
    </div>
<div class="lgf-command">
执行 @./tolua++ -tCocos2d -o CCScale9Sprite.cpp Cocos2d.pkg@
把生成的内容拷贝到LuaCocos2d.cpp，注意位置
</div>
<pre class="lgf-command-description prettyprint">
// static void tolua_reg_types (lua_State* tolua_S)
tolua_usertype(tolua_S,"CCScale9Sprite");

/* method: setPreferredSize of class  CCScale9Sprite */
#ifndef TOLUA_DISABLE_tolua_Cocos2d_CCScale9Sprite_setPreferredSize00
static int tolua_Cocos2d_CCScale9Sprite_setPreferredSize00(lua_State* tolua_S)
{
#ifndef TOLUA_RELEASE
 tolua_Error tolua_err;
 if (
     !tolua_isusertype(tolua_S,1,"CCScale9Sprite",0,&tolua_err) ||
     (tolua_isvaluenil(tolua_S,2,&tolua_err) || !tolua_isusertype(tolua_S,2,"CCSize",0,&tolua_err)) ||
     !tolua_isnoobj(tolua_S,3,&tolua_err)
 )
  goto tolua_lerror;
 else
#endif
 {
  CCScale9Sprite* self = (CCScale9Sprite*)  tolua_tousertype(tolua_S,1,0);
  CCSize size = *((CCSize*)  tolua_tousertype(tolua_S,2,0));
#ifndef TOLUA_RELEASE
  if (!self) tolua_error(tolua_S,"invalid 'self' in function 'setPreferredSize'", NULL);
#endif
  {
   self->setPreferredSize(size);
  }
 }
 return 0;
#ifndef TOLUA_RELEASE
 tolua_lerror:
 tolua_error(tolua_S,"#ferror in function 'setPreferredSize'.",&tolua_err);
 return 0;
#endif
}
#endif //#ifndef TOLUA_DISABLE

/* method: create of class  CCScale9Sprite */
#ifndef TOLUA_DISABLE_tolua_Cocos2d_CCScale9Sprite_create00
static int tolua_Cocos2d_CCScale9Sprite_create00(lua_State* tolua_S)
{
#ifndef TOLUA_RELEASE
 tolua_Error tolua_err;
 if (
     !tolua_isusertable(tolua_S,1,"CCScale9Sprite",0,&tolua_err) ||
     !tolua_isstring(tolua_S,2,0,&tolua_err) ||
     !tolua_isnoobj(tolua_S,3,&tolua_err)
 )
  goto tolua_lerror;
 else
#endif
 {
  const char* pszFileName = ((const char*)  tolua_tostring(tolua_S,2,0));
  {
   CCScale9Sprite* tolua_ret = (CCScale9Sprite*)  CCScale9Sprite::create(pszFileName);
    tolua_pushusertype(tolua_S,(void*)tolua_ret,"CCScale9Sprite");
  }
 }
 return 1;
#ifndef TOLUA_RELEASE
 tolua_lerror:
 tolua_error(tolua_S,"#ferror in function 'create'.",&tolua_err);
 return 0;
#endif
}
#endif //#ifndef TOLUA_DISABLE

// TOLUA_API int tolua_Cocos2d_open (lua_State* tolua_S)
  tolua_cclass(tolua_S,"CCScale9Sprite","CCScale9Sprite","CCNode",NULL);
  tolua_beginmodule(tolua_S,"CCScale9Sprite");
   tolua_function(tolua_S,"setPreferredSize",tolua_Cocos2d_CCScale9Sprite_setPreferredSize00);
   tolua_function(tolua_S,"create",tolua_Cocos2d_CCScale9Sprite_create00);
  tolua_endmodule(tolua_S);
</pre>
</section>

<section>
    <div class="page-header">
        <h3>四、修改LuaCocos2d.h，因为CCScale9Sprite对象在Cocos2d-x的扩展包中</h3>
    </div>
<pre class="prettyprint">
#include "cocos-ext.h"
using namespace cocos2d::extension;
</pre>
</section>

<section>
    <div class="page-header">
        <h3>五、使用</h3>
    </div>
<pre class="prettyprint">
local sprite = CCScale9Sprite:create("image.png")
sprite:setPreferredSize(CCSizeMake(100, 100))
</pre>
</section>