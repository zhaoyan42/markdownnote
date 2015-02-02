# Angular事件机制揭秘
## 前言 
和其他任何Javascript框架一样， 浏览器在构建DOM之后就载入了AngularJS库。

当浏览器触发DOMContentLoaded事件时，Angular就开始工作了。

第一件事就是找到ng-app，如果存在，Angular就会自动初始化运行环境，不然你就要手工运行`Angular.bootstrap()`来手工初始化运行环境。

然后，ng-app所赋给的值会用来配置$injector服务，当所有app全部载入以后，$injector会创建$compile服务和app的$rootScope(根上下文)。
	
这时，$compile会接过控制权，首先吧$rootScope链接上DOM，然后从ng-app标记的DOM根元素开始编译整个DOM树。

## 视图工作原理
当浏览器接收到HTML的内容时，开始把Html解析成DOM树。当浏览器扫描的脚本文件时(`<script>`元素)，它会暂停解析，知道脚本接收完成。当接受到Angular.js脚本，该脚本的运行会建立一个事件侦听器，侦听DOMContentLoaded事件。这个事件会在所有HTML内容被扫描和解析完成以后被触发。

当DOMContentLoaded事件触发Angular的侦听器时，Angular就启动初始化。先找到ng-app，然后创建一些必要的组件(如$injector, $scompile和$rootScope等)，最后开始解析DOM树。

## 编译过程
$compile服务遍历DOM树，收集所有的标识(Directives)，然后把所有标识的`linking`函数合并成一个linking函数。这个函数专用把编译完成的模板连接到$rootScope。标识(Directives)遍布DOM的所有地方，如属性，注释，类和元素。

```html
<span my-directive></span>
<span class="my-directive"></span>
<my-directive><my-directive>
<!--directive:my-directive-->
```

在遍历过程中，当$compile在某个元素上找到了一个或多个Directives时，它先更具它们的Priority(优先级)排序，然后用$injector服务找到该Directive的`compile`函数并执行它。

> Directive的`compile`函数主要功能是DOM转换货内嵌模板，因为它会产生一个模版的克隆。

在每个DOM节点都编译之后，$compile会调用`linking`函数。`linking`函数会把所有的Directive和其对应的Scope建立双向数据半丁，这个过程称为动态化视图。

当$compile完成其工作以后，Angular运行时开始启动。

#运行时 
浏览器的事件循环时刻在等待各种事件，如鼠标移动，点击或按键。当这些事件发生时，他们被存入浏览器事件队列中。如果有任何函数绑定到该事件时，这些函数会被调用，该事件作为调用传入的一个参数。

```javascript
ele.addEventListener('click', function(event{});
```	

事件循环在Angular中有点争议，因为Angular自己也有一个事件循环。Angular的事件循环被称为$digest循环，又有两个小循环组成：evalAsyn循环和$watch列表。




