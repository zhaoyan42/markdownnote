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

### 私有方法 - Private Method
> Javascript所有的函数定义默认下都是全局的，而且Javascript也没有命名空间的概念，这两个缺陷使得Javascript很容易产生名称冲突。 模块模式可以帮助解决这些问题。

Javascript 本身不能够定义私有方法，但是我们可以使用模块模式模拟出私有方法的效果。

> 私有方法本质上是：你不希望外部用户调用执行的某个作用域内部的任何东西。特别是那些从服务器读取或回写的操作。

通过模块模式，我们可以如下隐藏私有方法：
```js
var Module = (function(){
	var privateMethod = function(){
		//do something
	};
})();
```
在新作用域内部申明的方法`privateMethod`就很好的隐藏起来，任何外部试图调用`privateMethod`都会导致错误。

### 理解返回　- Return
景点模块模式可以用　`return`返回一个对象给模块，那些在该对象下声明的方法可以通过模块的命名空间来调用。
```js
var Module = (function(){
	return {
		publicMethod:function(){
			//code
		}
	};
})();
```
调用：　`Module.publicMethod();`
这和标准方式定义的对象没有任何区别：
```js
var myObj = {
	defaults: { name: 'Hao Wang'},
	publicMethod: function () {
		console.log(this.defaults);
	}
};

//调用
myObj.publicMethod();
```
当时标准方式的问题是，一些内部属性和方法都暴露出来了，不能隐藏(Javascript没有私有属性和方法)。　如上面例子中的`defaults`就有可能被外部用户修改，导致不期望的行为。

## Promise　- 异步的承诺
> Promise让异步调用看起来更像同步调用，从而很容易的取到返回值和捕获异常。

### 介绍
使用Promise我们可以在任何一个执行点捕获错误，然后忽略剩下的执行步骤。 这种流程控制来源于新的代码风格本身，无需额外的代码。 从而，我们可以很容易的组合多个函数功能并且异常以冒泡式的抛出，同时有维持异步运行的能力。

Promise自始自终都是异步运行，我们不用担心它会阻塞其它部分的代码运行。

### Promise in Angular 

Angular的事件循环(Event Loop)在$rootScope.$evalAsync阶段解析(Resolve)Promise，直到$digest运行循环结束。 我们和容易的把Promise的结果输出成视图，这能够直接把XHR调用的结果直接赋给$scope对象的一个属性。

### 使用Promise到后台取数据的一个实例
```html
<ul ng-controller="DashboardController"> 
	<li ng-repeat="pr in pullRequests">
		{{pr.title}}
	</li>
</ul>
```
当用服务返回一个promise, 我们可以用`.then()`方法与promise进行交互操作， 我们可在该方法中修改scope中的任何变量，从而改变视图。
```js
angular.module('myApp', [])
  .controller('DashboardController', ['$scope', 'GithubService', function($scope, GithubService){
    GithubService.getPullRequests(123)  //这里返回的是Promise
      .then(tunction(data){
        $scope.pullRequests = data.data;
      });
  }]);
```
### 创建一个Promise
内建服务`$q`可以用来创建你自己的Promise。我们可以通过调用`$q.defer()`方法来创建一个“延迟”对象: `var deferred = $q.defer();`
“延迟”对象有三个方法和一个promise属性，该属性返回一个Promise对象。
- `.resolve(value)` - 解析(返回结果)方法
- `.reject(reason)` - 拒绝方法；等同于解析出一个拒绝对象`.resolve($q.reject(reason));`
- `.notify(value)` - 返回执行的状态方法 

### Promise执行状态
如果我们有一个长时间运行的请求，可以调用`.notify()`来及时返回进程状态。 通常，我们会把这个长时间任务放在一个服务中：
```js
.factory('GithubService', funcion($q, $http){
  var getEventsFromRepo= function(){
    //task
  };
  var service = {
    makeMultipleRequests: function(repos){
      for (var i=0; i < repos.length; i++) {
        output.push(getEventsFromRepo(repos[i]));
        percentComplete = (i+1) / repos.length * 100;
        d.notify(percentComplete);
      }
      d.resolve(output);
      return d.promise;
    }
  }
  return service;
}); 
```
这里，每取一个repo, 我们就会收到一个进程状态的通知。下面是对这个Pomise的使用和状态通知的显示
```js
.controller('HomeController', function($scope, GithubService){
  GithubService.makeMultipleRequests（['auser/behavior','..'])
    .then(function(result){
      //Handle the result
    }, function(err){
      //Error occurred
    }, function(percentComplete) {
      $scope.progress=percentComplte;
  	});
});
```
---

[原文](http://www.smashingmagazine.com/2015/01/22/angularjs-internals-in-depth/)