---
layout: default
title: "ExpandableListView"
---

<div id="charpter">

h3. Android 菜单

</div>

h1. {{ page.title }}

h3(#1). *标题* %(title)标题%

<pre class="brush: java">
ExpandableListView listHelpInfo;
// 数据是一一对应的
List<Map<String, String>> groups = new ArrayList<Map<String, String>>();

Map<String, String> group1 = new HashMap<String, String>();
group1.put("id", "1");
group1.put("title", "购物指南");
group1.put("detail_url", "http://");
Map<String, String> group2 = new HashMap<String, String>();
group2.put("id", "2");
group2.put("title", "配送方式");
group2.put("detail_url", "http://");
groups.add(group1);
groups.add(group2);

List<Map<String, String>> child1 = new ArrayList<Map<String, String>>();
Map<String, String> childdata1 = new HashMap<String, String>();
childdata1.put("title", "怎么购买？");
childdata1.put("content", "内容哈哈哈哈哈哈呮");
child1.add(childdata1);

List<Map<String, String>> child2 = new ArrayList<Map<String, String>>();
Map<String, String> childdata2 = new HashMap<String, String>();
childdata2.put("title", "怎么配送？");
childdata2.put("content", "内容哈哈哈哈哈哈呮");
child2.add(childdata2);

List<List<Map<String, String>>> childs = new ArrayList<List<Map<String, String>>>();
childs.add(child1);
childs.add(child2);

SimpleExpandableListAdapter adapter = new SimpleExpandableListAdapter(
        this, 
        groups, android.R.layout.simple_expandable_list_item_1, 
        new String[] { "title" },
        new int[] { android.R.id.text1 }, 
        childs, android.R.layout.simple_expandable_list_item_1,
        new String[] { "title" }, 
        new int[] { android.R.id.text1  });
listHelpInfo.setAdapter(adapter);

listHelpInfo.setOnGroupCollapseListener(new ExpandableListView.OnGroupCollapseListener() {
    public void onGroupCollapse(int groupPosition) {
        Log.i("abc", "收起来了" + groupPosition);
    }
});
listHelpInfo.setOnGroupExpandListener(new ExpandableListView.OnGroupExpandListener() {
    public void onGroupExpand(int groupPosition) {
        Log.i("abc", "展开了" + groupPosition);
    }
});
</pre>