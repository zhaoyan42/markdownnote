# Angular的承诺(Promises) - 异步解决之道

> Angular的事件系统已经在不知不觉中为我们提供了Promise解决方案

## 什么是Promise

Promise是一种异步执行的解决方案。Promise是一个对象， 这个对象指向一个函数，这个函数最终会返回一个值或者抛出异常。Promise在操作远程对象是特别有用，我们也可以把它看作是远程对象的本地代理。

传统上Javascrip使用闭包和毁掉来处理那些不能同步返回的数据，比如页面加载之后的XHR请求。这样我们可以假设数据已经存在，来实现异步代码。回调的编程方式已经应用很久了，但是开发人员也饱受其折磨。回调不能提供一致而可靠的方法调用，特别是回调又嵌套另外的回调时，流程看起来显得特别混乱，也因此调试极为困难，而且每一步回调我们都要显式的处理异常。
和回调不同，Promise采取了不同的概念建模，它简单的返回一个Promise对象。
 
 