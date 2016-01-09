---
layout: default
title: Android 菜单
---

<div id="charpter">
h3. Android 菜单
* "Option Menu":#1
* "Context Menu":#2
* "Sub Menu":#3
</div>

h1. {{ page.title }}

p. Android中菜单分三种： 
* "选项菜单":#1 （Option Menu）
* "上下文菜单":#2 （Context Menu）
* "子菜单":#3 （Sub Menu）

p(#1). *一、Option Menu*

p. 1、重写Activity.onCreateOptionsMenu(Menu menu)方法创建菜单：

<pre>
/**
 * 添加创建菜单
 */
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    // 方法一:通过代码生成
    /**
     * 参数1:菜单组编号<br>
     * 参数2:菜单编号(下标)<br>
     * 参数3:菜单排序<br>
     * 参数4:菜单名<br>
     */
    menu.add(GROUP_ID, Menu.NONE, ORDER, "新增").setIcon(android.R.drawable.ic_menu_add);// 设置图标
    menu.add(GROUP_ID, Menu.NONE + 1, ORDER + 1, "修改");
    menu.add(GROUP_ID, Menu.NONE + 2, ORDER + 2, R.string.query);
    menu.add(GROUP_ID, Menu.NONE + 3, ORDER + 3, R.string.del).setCheckable(true); // 增加一个√选项
    /*
     * 包含子菜单的
     */
    SubMenu sub1 = menu.addSubMenu("父菜单");
    sub1.setIcon(android.R.drawable.ic_menu_always_landscape_portrait);// 设置按钮图标
    sub1.setHeaderIcon(android.R.drawable.ic_menu_agenda);// 子菜单标题图标
    sub1.add(GROUP_ID, 11, 0, "菜单1");
    sub1.add(GROUP_ID, 12, 1, "菜单2");
    // 参数一:
    // 参数二:是否显示单选框
    // 参数三:
    sub1.setGroupCheckable(1, false, true);

    // 方法二:直接通过xml文件生成
    MenuInflater menuInflater = new MenuInflater(getApplicationContext());
    menuInflater.inflate(R.menu.menu_list, menu);
    /*
     * <?xml version="1.0" encoding="utf-8"?>
     * <menu xmlns:android="http://schemas.android.com/apk/res/android">
     *      <item android:id="@+id/item1" 
     *			  android:icon="@android:drawable/ic_menu_add" 
     *			  android:title="新增" />
     *      <item android:id="@+id/item1" 
     *			  android:icon="@android:drawable/ic_menu_add" 
     *			  android:title="其它">
     *          <menu>
     *              <item android:id="@+id/item2" 
     *			  android:icon="@android:drawable/ic_menu_add" 
     *			  android:title="新增2" />
     *          </menu>
     *      </item>
     * </menu>
     */
    return super.onCreateOptionsMenu(menu);
}
</pre>

p. 2、重写Activity.onOptionsItemSelected(MenuItem item)方法创建菜单点击事件

<pre>
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
    case Menu.NONE:
        Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
        break;
    case Menu.NONE + 1:
        Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
        break;
    case Menu.NONE + 2:
        Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
        break;
    case Menu.NONE + 3:
        Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
        break;
    }
    Toast.makeText(getApplicationContext(), item.getTitle(), Toast.LENGTH_SHORT).show();
    return super.onOptionsItemSelected(item);
}
</pre>

p(#2). *二、Context Menu*

p. 1、重写Activity.onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo)方法创建上下文菜单：

<pre>
@Override
public void onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {
	super.onCreateContextMenu(menu, v, menuInfo);
	// 代码与选项菜单的一样
}
</pre>

p. 2、重写Activity.onContextItemSelected(MenuItem item)方法创建上下文菜单点击事件：

<pre>
@Override
public boolean onContextItemSelected(MenuItem item) {
	// 代码与选项菜单一样
	return super.onContextItemSelected(item);
}
</pre>

p. 3、重要的一步：

<pre>
// 给某个控件注册上下文菜单，只有注册才有效
registerForContextMenu(View);
</pre>

p(#3). *三、Sub Menu*

p. 1、重写Activity.onCreateOptionsMenu(Menu menu)方法创建菜单：

<pre>
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    SubMenu sub1 = menu.addSubMenu("父菜单");
    sub1.setIcon(android.R.drawable.ic_menu_always_landscape_portrait);// 设置按钮图标
    sub1.setHeaderIcon(android.R.drawable.ic_menu_agenda);// 子菜单标题图标
    sub1.add(GROUP_ID, 11, 0, "菜单1");
    sub1.add(GROUP_ID, 12, 1, "菜单2");
    // 也可以通过XML加进来，参考选项菜单中的做法
    return super.onCreateOptionsMenu(menu);
}
</pre>

p. 2、重写Activity.onOptionsItemSelected(MenuItem item)方法创建菜单点击事件

<pre>
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    // 代码与选项菜单一样
    return super.onOptionsItemSelected(item);
}
</pre>