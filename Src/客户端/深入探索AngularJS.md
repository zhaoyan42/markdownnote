#深入探索AngularJS

[TOC]

## 作用域Scope是DOM和Directives交互的抽象
### Scope是POJO对象
AngularJS只是往Scope中添加了很多“内部"属性，大部分以\$开头，还有些以\$$开头，两个\$开头的属性一般不要使用。
### Scope是上下文
应该看作是一个容器，保存着当前的上下文和上下文敏感的变量数据等
### Scope继承树
* Scope总是和一个DOM元素联系起来
*  Controller会创建一个新的Scope
*  Directive有时候会创建一个新的Scope
* 其他情况会直接使用父级的Scope
* 如果不在ng-app内，没有任何相关的Scope

### Scope附加功能
AngularJS往Scope中添加了一些属性
#### 遍历功能
*  $id
Scope的唯一id号
*  $root
*  $parent
*  \$$childHead
*  \$$childTail
*  \$$prevSibling
*  \$$nextSibling

## 正交功能
### Element和Attribute
Directive可以定义为Element(标识)也可以定义为标识的属性。 更为强大的架构就是综合应用这两种功能，用属性定义来改变或增强原Element的功能。

## 模块模式 - Module Pattern


> 模块模式是一个设计模式，它能够消除大量重复的 `this` 和`prototype`使用。 Angular Material就使用这个模式开发模块代码 [Angular Material Coding Conventions and Guidelines](https://github.com/angular/material/blob/master/docs/guides/CODING.md)
> 参考： http://toddmotto.com/mastering-the-module-pattern/

### 创建模块
```js
(function(){
	//code
})();
```

这里申明了一个函数，然后马上调用它自己，这也被称作立即执行函数表达式 ([Immediately-Invoked Function Expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/))。这个函数就创建了一个新的作用域(Scope)，从而模拟了类似私有域的效果, 把大部分代码从全局作用域(Gloable Scope)中隔离出来。


创建新的作用域之后，我们需要把代码赋于命名空间。
```js
var Module = ( function () {
	//code
})();
```
这样，我们就在全局作用域中申明了 `Module`，这样我们就可以任意调用它，甚至把它传给另外一个模块。



---

[原文](http://www.smashingmagazine.com/2015/01/22/angularjs-internals-in-depth/)