# Angular事件机制揭秘
## 前言 
和其他任何Javascript框架一样， 浏览器在构建DOM之后就载入了AngularJS库。

当浏览器触发DOMContentLoaded事件时，Angular就开始工作了。

第一件事就是找到ng-app，如果存在，Angular就会自动初始化运行环境，不然你就要手工运行Angular.bootstrap()来手工初始化运行环境。

然后，ng-app所赋给的值会用来配置$injector服务，当所有app全部载入以后，$injector会创建$compile服务和app的$rootScope(根上下文)。

这时，$compile会接过控制权，首先吧$rootScope链接上DOM，然后从ng-app标记的DOM根元素开始编译整个DOM树。

## 视图工作原理
当浏览器接收到HTML的内容时，开始把Html解析成DOM树。