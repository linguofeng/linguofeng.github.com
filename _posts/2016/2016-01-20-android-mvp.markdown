---
layout: "post"
title: "Android MVP"
date: "2016-01-20 14:14"
---

已经两年没怎么关注Android开发了，Android的开发方式已经从MVC转向了MVP、MVVM了，之前也看过国外大牛写的 [Architecting Android…The clean way?](http://fernandocejas.com/2014/09/03/architecting-android-the-clean-way/)。[中文版](https://github.com/bboyfeiyu/android-tech-frontier/tree/master/androidweekly/%E4%B8%80%E7%A7%8D%E6%9B%B4%E6%B8%85%E6%99%B0%E7%9A%84Android%E6%9E%B6%E6%9E%84)

使用MVP其中一个好处是更好地支持可测试，渐渐发现Github上开源的大多数项目都写满了测试代码，这点很值得学习，Google官方也推出了一个教程，如何写测试代码 [Android Testing Codelabs](https://codelabs.developers.google.com/codelabs/android-testing/index.html)。

看了一下Google提供的例子，这款笔记应用，一共提供了四个界面(Activity)，其中一个是统计界面，另三个就使用了MVP的模式。

一个界面由Activity、Fragment、Presenter、Contract四个部分组成，其它Activity与Fragment就是MVP中的V，`Presenter`就是MVP中的P，`Contract`则是VP交互的接口定义，另外的M就是Model了。

`Contract`定义了两个子接口，一个是Presenter -> View可交互的方法，另一个则是View -> Presenter的交互方法。

```java
public interface NotesContract {
    interface View {
        void showNotes(List<Note> notes);
    }

    interface UserActionsListener {
        void loadNotes(boolean forceUpdate);
    }
}
```

> View中的事件（生命周期的方法或按钮）去调用Presenter的loadNotes方法去请求Model获取笔记数据，然后再调用View的showNotes去显示，完成一个交互过程。
