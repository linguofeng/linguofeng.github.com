---
layout: "post"
title: "Hello TensorFlow"
date: "2016-12-19 10:51"
---

- 启动Docker

```bash
$ docker-machine start default
$ eval "$(docker-machine env default)"
```

- 下载TensorFlow容器

```bash
$ docker pull gcr.io/tensorflow/tensorflow
```

- 启动TensorFlow容器并进入python

```bash
$ docker run --rm -it gcr.io/tensorflow/tensorflow python
```

- Hello World

```bash
>>> import tensorflow as tf
>>> hello = tf.constant('Hello, TensorFlow!')
>>> sess = tf.Session()
>>> print(sess.run(hello))
Hello, TensorFlow!
>>> a = tf.constant(10)
>>> b = tf.constant(32)
>>> print(sess.run(a + b))
42
```
