---
layout: default
title: "Android - ViewPager"
---

<div id="charpter">

h3. Android 菜单

</div>

h1. {{ page.title }}

h3(#1). *ViewPager* %(title)ViewPager%

* 布局文件
<hr />

<pre class="brush: xml">
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <android.support.v4.view.ViewPager
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >

        <android.support.v4.view.PagerTitleStrip
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="top"
            android:background="#666666" />
    </android.support.v4.view.ViewPager>

</LinearLayout>
</pre>

* Activity文件
<hr />

<pre class="brush:java">
public class MainPagerActivity extends Activity {
    private ViewPager mViewPager;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        mViewPager = (ViewPager) findViewById(R.id.viewpager);

        LayoutInflater mLi = LayoutInflater.from(this);
        View view1 = mLi.inflate(R.layout.layout1, null);
        View view2 = mLi.inflate(R.layout.layout2, null);
        View view3 = mLi.inflate(R.layout.layout3, null);

        // 将要分页显示的View装入数组中
        final ArrayList<View> views = new ArrayList<View>();
        views.add(view1);
        views.add(view2);
        views.add(view3);

        // 每个页面的Title数据
        final ArrayList<String> titles = new ArrayList<String>();
        titles.add("tab1");
        titles.add("tab2");
        titles.add("tab3");

        // 填充ViewPager的数据适配器
        PagerAdapter mPagerAdapter = new PagerAdapter() {

            @Override
            public boolean isViewFromObject(View arg0, Object arg1) {
                return arg0 == arg1;
            }

            @Override
            public int getCount() {
                return views.size();
            }

            @Override
            public void destroyItem(View container, int position, Object object) {
                ((ViewPager) container).removeView(views.get(position));
            }

            @Override
            public CharSequence getPageTitle(int position) {
                return titles.get(position);
            }

            @Override
            public Object instantiateItem(View container, int position) {
                ((ViewPager) container).addView(views.get(position));
                return views.get(position);
            }
        };

        mViewPager.setAdapter(mPagerAdapter);
        
        // 设置页面切换监听器
        mViewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            public void onPageSelected(int arg0) {
                System.out.println("onPageSelected : " + arg0);
            }

            public void onPageScrolled(int arg0, float arg1, int arg2) {

            }

            public void onPageScrollStateChanged(int status) {
                switch (status) {
                case 0:
                    System.out.println("滑动完成");
                    break;
                case 1:
                    System.out.println("开始滑动");
                    break;
                default:
                    System.out.println("滑动中");
                    break;
                }
            }
        });
    }
}
</pre>