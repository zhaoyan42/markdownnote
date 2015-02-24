# LinFu 框架和高级编程 I - 动态代理
> 如同[LinFu](https://github.com/philiplaureano/LinFu)的作者一样,我也寻找良好的DynamicProxy很长时间了，最后是用的Castle的DynamicProxy。 选了这个是因为nHibernate的缘故，然而最近一次nHibernat的升级，我有机会又考察了一下nHiberante，惊奇地发现,它是用了一个叫LinFu的框架实现Proxy来支持Lazyload。
> 这如同给我打开了另一扇门，在研究LinFu的过程中，竟然发现它的文章早到2007年，可能是因为个人开发的，一直没有大面积的为人所知。
> 这里，我就一边研究学习一边发发所感所得。

## 高级编程
“高级编程”这个术语已经用的太多太滥，使得这里不能确切地表达这块技术的高端性。另外一些零散的技术名词可以给你一些不同的感觉：依赖注入，[契约设计](http://zh.wikipedia.org/wiki/%E5%A5%91%E7%BA%A6%E5%BC%8F%E8%AE%BE%E8%AE%A1)，动态代理。 如果这还有一些生僻的话，想想这个：多继承，延时绑定，Duck Tye (鸭子类型)。 

## 动态代理 - Dynamic Proxy
