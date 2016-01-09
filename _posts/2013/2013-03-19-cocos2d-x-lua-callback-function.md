---
layout: post
title: Cocos2d-x之回调Lua的函数
description: 使用LuaJIT开发Android应用
categories: [archive]
tags: [android, lua]
---

<section>
    <div class="page-header">
        <h3>一、编写注册函数</h3>
    </div>
    <h4><small>1.1</small> 创建LuaHandler.h，方便其实控件增加该功能。</h4>
<pre class="prettyprint">
#ifndef __LUAHANDLER_H__
#define __LUAHANDLER_H__

#include "CCLuaEngine.h"

class LuaHandler
{
public:
    LuaHandler(): m_nLuaHandler(0){}
    virtual ~LuaHandler(){}

    // 注册Lua回调函数
    virtual void registerLuaHandler(int nHandler)
    {
        unregisterLuaHandler();
        m_nLuaHandler = nHandler;
        LUALOG("[LUA] Add lua handler: %d", m_nLuaHandler);
    }

    // 取消注册
    virtual void unregisterLuaHandler(void)
    {
        if (m_nLuaHandler != 0)
        {
            cocos2d::CCScriptEngineManager::sharedManager()
            ->getScriptEngine()
            ->removeScriptHandler(m_nLuaHandler);
            m_nLuaHandler = 0;
            LUALOG("[LUA] Remove lua handler: %d", m_nLuaHandler);
        }
    }

    // 获取在Lua中注册的Lua回调函数引用
    int getLuaHandler() { return m_nLuaHandler; };

    // 获取Lua的堆，方法调用各种函数
    cocos2d::CCLuaStack *getLuaStack(void) 
    {
        cocos2d::CCLuaEngine *pEngine = (cocos2d::CCLuaEngine*)
        (cocos2d::CCScriptEngineManager::sharedManager()->getScriptEngine());
        return pEngine->getLuaStack();
    }
protected:
    int m_nLuaHandler;
};

#endif
</pre>

    <h4><small>1.2</small> 使用LuaHandler.h</h4>
<pre class="prettyprint">
#include "LuaHandler.h"

class MyLayer: public CCLayer, public LuaHandler
{
public:
    // ... 省略

    void callback(void)
    {
        int mHandler = getLuaHandler();
        if (mHandler != 0)
        {
            CCLuaStack *pStack = getLuaStack();
            pStack->pushInt(1234);                           // 回调函数第一个参数
            pStack->pushString("abc");                       // 回调函数第二个参数
            pStack->executeFunctionByHandler(mHandler, 2);   // 2表示回调函数有两个参数
        }
    }
};
</pre>

    <h4><small>1.3</small> 创建MyLayer.pkg</h4>
<pre class="prettyprint">
class MyLayer: public CCLayer
{
    // ... 省略

    void registerLuaHandler(LUA_FUNCTION mHandler);
    void unregisterLuaHandler(void);
};
</pre>
</section>

<section>
  <div class="page-header">
    <h3>二、在Lua中注册回调函数</h3>
  </div>
<pre class="prettyprint">
local function callback(f, t)
    cclog("第一个参数：" .. f .. "，第二个参数：" .. t)
end

local myLayer = MyLayer:create()
myLayer:registerLuaHandler(callback)    -- 注册回调函数
myLayer:unregisterLuaHandler()          -- 取消注册
</pre>
</section>