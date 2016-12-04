---
layout: "post"
title: "React开发栈"
date: "2016-12-04 23:38"
---

时隔半年多没发表新博客了，最近一直在“前端”开发，主要是以JavaScript语言为主开发语言的前端开发，移动端使用Framework7 + React + Cordova实现iOS与Android的开发；最近移动端新版使用React Native“重构”，为啥是重构，得益于一开始选择使用React+Framework7开发，整个项目70%代码是可以直接在React Native上使用的。

下面就总结这半年多使用React用到的一些东西：

- `yarn` 如果现在还在使用npm就有点"out"了，Facebook开发的node package管理工具。

```bash
$ yarn init # 代替npm init初始化项目
$ yarn add react # 代替npm install --save添加依赖
$ yarn add --dev babel-cli # 代替npm install --save-dev添加开发依赖
$ yarn # 代替npm install
```

- `babel` 如果现在还在使用ES5语法开发就有点"out"了，能够把ES6、ES7转成ES5的工具；使用最新的JavaScript语言标准来开发，体验新标准带来的语法糖与便利。

```javascript
export default class Api {
  // 使用箭头函数
  fetchList = () => this.api.get('posts');
}

// 使用import代替require
import Api from './api';
```

- `webpack` 项目打包工具，可以结合babel实现ES6/7转码成ES5，还能实现代码热更新，SASS/LESS样式处理，图片资源处理等。

4. `eslint` 代码风格管理，统一团队代码风格很重要，使用eslint-config-airbnb。

5. `react` 当前最流行的WEB前端开发框架，由Facebook开源。

```javascript
function TodoItem({ itemData }) {
  return (
    <div>
      <p>{itemData.title}</p>
    </div>
  );
}

export default class TodoList extends Component {
  render() {
    return (
      <div>
        {this.props.todos.map(item => <TodoItem itemData={item} />)}
      </div>
    );
  }
}
```

- `redux` 结合react使用，通过Action改变Store，再由Store更新Component。

```javascript
this.props.dispatch(fetchList());
```

- `redux-saga` 结合redux使用，通过监听Action处理任务，能够实现流程化，是一个很强大的库。

- `axios` http请求库。

- `react-virtualized` 解决列表太长的库，能够把列表项控制在一个数，提高效率。
