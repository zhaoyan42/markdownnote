#深入探索AngularJS

[TOC]

## Scope是DOM和Directives交互的抽象
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

---

[原文](http://www.smashingmagazine.com/2015/01/22/angularjs-internals-in-depth/)