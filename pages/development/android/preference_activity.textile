---
layout: default
title: Android - PreferenceActivity
---

h1. {{ page.title }}

* *一、继承PreferenceActivity*

<pre class="brush: java">
public class SettingActivity extends PreferenceActivity{
    public void onCreate(...){
        addPreferencesFromResource(R.xml.preference);
    }
}
</pre>

* *二、资源文件preference.xml*

<pre class="brush: xml">
<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
    <PreferenceCategory android:title="分组1">
        <CheckBoxPreference
                android:key="唯一标识（MAP中的KEY）"
                android:title="标题"
                android:summary="概要" />
    </PreferenceCategory>
</PreferenceScreen>
</pre>

* *三、在其它Activity使用该配置信息*

<pre class="brush: java">
SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(this);
sp.getString("key1", "默认值");
sp.getInt("key2", 0);
</pre>

p. 更多参数访问 "http://developer.android.com/reference/android/preference/PreferenceActivity.html":http://developer.android.com/reference/android/preference/PreferenceActivity.html