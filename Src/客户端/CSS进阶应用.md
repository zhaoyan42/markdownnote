# CSS进阶应用

> CSS本身有复杂重复和不同浏览器核心不同语法的问题。所以现在有一些扩展框架让CSS更容易，如SASS和LESS。 SASS是基于Ruby，而LESS基于Javascript。 据说SASS更为完备和成熟，但是需要学习一门新语言。因此，我们的重点还是放在LESS。
## LESS
LESS包含了一套自定义的语法和解析器， 用户根据语法定义样式规则，解析器把这些规则编译成常规CSS文件。 LESS并没有更改CSS，也不是取代CSS，而只是在现有CSS语法基础上，为CSS加入了程序语言的特性。

## 变量
LESS增加变量的概念，作为程序语言的一个最基本元素，变量可以极大概算样式定义的灵活性。
```css
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}
```
生成CSS文件
```css
a,
.link {
  color: #428bca;
}
.widget {
  color: #fff;
  background: #428bca;
}
```

##混入器 (Mixin)  
Mixin是很多动态语言的特性，是实现多重继承的一种方式。
Mixin是LESS一个很重要的语法扩充，LESS的混入是一个Class中引入另外一个Class，是想在当前Class增加属性的功能。
```css
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```
生成CSS文件
```css
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```

##带参数的Mixin
一个Mixin的定义
```css
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```
对定义Mixin的使用
```css
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```
 
## LESS Element库
LESS只是一个基本的语法框架，还需要其他应用库的支持。 LESS Element就实现了15种Mixin的基本应用。

- .gradient
- .bw-gradient
- .bodered
- .drop-shadow
- .rounded
- .border-radius
- .opcity
- .transition-duration 
- .rotationgwen
- .scale
- .transition
- .inner-shdow
- .box-shadow
- .columns
- .translate
-  