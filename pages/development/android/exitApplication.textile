---
layout: default
title: 完全退出程序
---

<div id="charpter">

h3. 完全退出程序

</div>

h1. {{ page.title }}

h3(#1). *方式一* %(title)方式一%
<hr />

* App.java
<hr />

<pre class="brush: java">
public class App extends Application {
	private Map<String, Activity> activityMap = new HashMap<String, Activity>(0);
	
	public void addActivity(Activity activity) {
		activityMap.put(activity.getClass().getSimpleName(), activity);
	}
	
	public void removeActivity(Activity activity) {
		activityMap.remove(activity.getClass().getSimpleName());
	}
	
	public void finish() {
		Set<Entry<String, Activity>> entrySet = activity.entrySet();
		for(Entry<String, Activity> entry : entrySet) {
			Activity activity = entry.getValue();
			if(activity != null) {
				activity.finish();
			}
		}
	}
}
</pre>

* BaseActivity.java
<hr />

<pre class="brush: java">
public void BaseActivity extends Activity {
	App app;
	public void onCreate(...) {
		...
		app = (App) getApplication();
		app.addActivity(this);
	}
	
	public onDestory() {
		...
		app.remove(this);
	}
	
	public void exit() {
		app.finish();
	}
}
</pre>

