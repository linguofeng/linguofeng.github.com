---
layout: post
title: Cocos2d-x之CCRenderTexture fix htc
description: 修复CCRenderTexture在某些HTC机器上画图出现残影的问题
categories: [archive]
tags: [cocos2d-x]
---

<section>
    <div class="page-header">
        <h3>一、CCRenderTexture.h</h3>
    </div>
<pre class="prettyprint">
    CCTexture2D         *m_pTexture;
+   CCTexture2D         *m_pTextureCopy;
    CCImage             *m_pUITextureImage;
</pre>
</section>

<section>
    <div class="page-header">
        <h3>一、CCRenderTexture.cpp</h3>
    </div>
<pre class="prettyprint">
    , m_pTexture(0)
+   , m_pTextureCopy(0)
    , m_pUITextureImage(NULL)

    bool bRet = false;
+   void *data = NULL;
    do

    unsigned int powW = ccNextPOT(w);
    unsigned int powH = ccNextPOT(h);
+   data = malloc((int)(powW * powH * 4));
    CC_BREAK_IF(! data);


    m_pTexture->initWithData(data, (CCTexture2DPixelFormat)m_ePixelFormat, powW, powH, CCSizeMake((float)w, (float)h));
-   free( data );

+   if (CCConfiguration::sharedConfiguration()->checkForGLExtension("GL_QCOM"))
+   {
+       m_pTextureCopy = new CCTexture2D();
+       CC_BREAK_IF(! m_pTextureCopy);
+       m_pTextureCopy->initWithData(data, (CCTexture2DPixelFormat)m_ePixelFormat, powW, powH, CCSizeMake((float)w, (float)h));
+   }

    } while (0);

+   CC_SAFE_FREE(data);
    return bRet;

    glGetIntegerv(CC_GL_FRAMEBUFFER_BINDING, &m_nOldFBO);
    ccglBindFramebuffer(CC_GL_FRAMEBUFFER, m_uFBO);//Will direct drawing to the frame buffer created above
+   if (CCConfiguration::sharedConfiguration()->checkForGLExtension("GL_QCOM"))
+   {
+       // -- bind a temporary texture so we can clear the render buffer without losing our texture
+       ccglFramebufferTexture2D(CC_GL_FRAMEBUFFER, CC_GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, m_pTextureCopy->getName(), 0);
+       //CHECK_GL_ERROR_DEBUG();
+       glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
+       ccglFramebufferTexture2D(CC_GL_FRAMEBUFFER, CC_GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, m_pTexture->getName(), 0);
+   }
</pre>
</section>

<p>详细参考：https://github.com/cocos2d/cocos2d-x/commit/b71d67c766d30390101e39d08cffd98c5b2a6571</p>

