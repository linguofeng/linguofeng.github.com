---
layout: post
title: SpiderMonkey是mozilla开发的js引擎
description: SpiderMonkey HelloWorld
categories: [archive]
tags: [SpiderMonkey, js]
---

<section>
    <p>1. 安装</p>
<pre>
$ brew install SpiderMonkey
</pre>
    <p>2. Hello World</p>
<pre class="prettyprint">
#include "jsapi.h"

static JSClass global_class = {
    "global", JSCLASS_GLOBAL_FLAGS,
    JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
    JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, JS_FinalizeStub,
    JSCLASS_NO_OPTIONAL_MEMBERS
};

void reportError(JSContext *cx, const char *message, JSErrorReport *report)
{
    fprintf(stderr, "%s:%u:%s\n",
            report->filename ? report->filename : "<no filename=\"filename\">",
            (unsigned int) report->lineno,
            message);
}

int main(int argc, const char *argv[])
{
    JSRuntime *rt;
    JSContext *cx;
    JSObject  *global;

    // 创建新的运行时
    rt = JS_NewRuntime(8 * 1024 * 1024);
    if (rt == NULL)
        return 1;

    // 创建新的上下文并与运行时绑定
    cx = JS_NewContext(rt, 8192);
    if (cx == NULL)
        return 1;

    JS_SetOptions(cx, JSOPTION_VAROBJFIX | JSOPTION_JIT | JSOPTION_METHODJIT);
    JS_SetVersion(cx, JSVERSION_LATEST);
    JS_SetErrorReporter(cx, reportError);

    global = JS_NewCompartmentAndGlobalObject(cx, &global_class, NULL);
    if (global == NULL)
        return 1;

    // 实例化内置全局对象
    if (!JS_InitStandardClasses(cx, global))
        return 1;

    const char *script = "'Hello ' + 'World!'";
    jsval rval;
    JSString *str;
    JSBool ok;
    const char *filename = "noname";
    uintN lineno = 0;

    ok = JS_EvaluateScript(cx, global, script, strlen(script),
            filename, lineno, &rval);
    if (!rval | rval == JS_FALSE)
        return 1;

    str = JS_ValueToString(cx, rval);
    printf("%s\n", JS_EncodeString(cx, str));


    JS_DestroyContext(cx);
    JS_DestroyRuntime(rt);
    JS_ShutDown();
    return 0;
}
</pre>
    <p>3. 编译与执行</p>
<pre>
$ g++ -o bin/HelloJS -I/usr/local/include/js -lmozjs185 src/HelloJS.cpp
$ ./bin/HelloJS
</pre>
    <p>4. 看来以后有时间还是要学习javascript</p>
</section>