---
layout: default
category: Gtk
title: "Gtk+"
description: "Gtk+学习笔记"
navigation: [安装]
---

<section id="1">
    <div class="page-header">
        <h1>一、安装 <small>基于ubuntu 12.10 c++</small></h1>
    </div>
<pre>
$ sudo apt-get install libgtkmm-3.0-dev
</pre>
</section>

<section id="2">
    <div class="page-header">
        <h1>二、Hello World! <small>基于ubuntu 12.10 c++</small></h1>
    </div>
    <p>@$ vim demo.cpp@</p>

<pre class="">
#include <gtkmm.h>

int main(int argc, char * argv[])
{
    Glib::RefPtr<Gtk::Application> app = Gtk::Application::create(argc, argv, "com.linguofeng.gtk");

    Gtk::ApplicationWindow window;

    return app->run(window);
}
</pre>

    <p>@$ g++ demo.cpp -o demo `pkg-config gtkmm-3.0 --cflags --libs`@</p>
    <p>@$ ./demo@</p>
</section>
