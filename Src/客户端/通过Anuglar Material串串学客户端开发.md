# 通过Anuglar Material串串学客户端开发
> [Angular Material](https://github.com/angular/material)不仅仅有本身框架的源代码，还有在这个框架上实现的一个应用[docs](https://github.com/angular/material/tree/master/docs)。更为强大的是，这个应用是真正的产品网站：就是它的[官网](https://material.angularjs.org/latest/#/)。我有理由相信，这个网站是从源代码直接发布的，从网址的最后那个`/latest`,我们可以看出端倪。

> 从这个产品本身入手不失为学习的捷径。

## 入口gulpfile.js
C/C#命令行的应用，我们会寻找`Main()`方法；C#的Web应用我们会找`Global.asax`；那么一个NodeJS应用我们就要找`gulpfile.js`。
> 注意：以前的很多项目都是用gruntjs，而近期趋势是转向gulpjs,我自己的感觉也是gulpjs很好理解，性能也不错。

和前两个不同的是，gulp.js其实不是应用运行的入口，而是项目编译的入口。gulp就相当于微软的MSBuild用来定义编译任务。

### Javascript也有编译
编译，JS文件还要编译？是的，如果你对客户端应用的印象还停留在html文件中直接引用你写的JS文件，那就已经大大落伍了。至少，很多的javascript的框架项目，如jQuery, AngularJS等等，都有编译的过程。虽然，这个编译和我们编译型语言（如C，C#等）的编译技术有些不同，但是角色是一样的：由于编译过程的存在，使得我们的开发环境和产品环境隔离，这种隔离也是一种解耦。

### 编译即解耦
解耦带来的价值就是，我们可以自由安排开发时的文件结构，而不要过多考虑产品文件结构的需求。比如：开发时我们更希望根据模块和责任的划分，分别对应不同的文件（文件越多越好），而产品阶段，则希望内容集中（文件越少越好）。对应这个情况，javascript就有一个编译步骤concatenate(合并文件)。从实现技术上看，这没有什么神奇的东西，但是这完全体现了编译的本质。

### 两个gulpfile.js文件
然而，编译不是Gulp的关键词，Gulp的关键词是任务（task），更多时候我把它和Ant/nAnt对等来看。

回到[Angular Material](https://github.com/angular/material)的源代码来。我发现它居然有两个Gulp.js文件。一个在根目录，另外一个`docs/gulpfile.js`。从这我在了解到，他其实是两个项目，一个是material框架，另外一个是它的官网。它两部分代码写到有一个代码库，而且因为它官网本身也使用了material框架，甚至有一部分内容都是从框架中自动生成的，也是为什么写到一个代码库的理由。

然而，两个编译文件暴露了它是两个项目的事实，至少是两个发布（发布和项目的区别？）。 两个发布就是两个产品，又一次印证了编译是开发和产品的解耦器！

### module.exports
然而，第二个编译文件`docs/gulpfile.js`中却看到了一个奇怪的东西`module.exports = function(gulp, IS_RELEASE_BUILD) {`。那么`module.exports`是什么东西呢？

一直以来，javascript最大的诟病就是全局变量，这也成为大型应用开发的最大阻碍。因此，很多人使用了很多方式来解决这个问题。如模块模式（Module Pattern), 而node.js这实现了模块装载系统，来解决组件实现的基本问题。

自从开始研究前端，我也几个相关的关键词在眼前晃荡， `require()` `exports`等等。当时，因为注意力在其他方面，一直也没下决心研究清楚。 就如下面[文章](http://www.sitepoint.com/understanding-module-exports-exports-node-js/) 中所讲：
> 作为开发人员常常面临这样的困境：当我们使用不熟悉的代码（库）时，我们究竟要花多少时间来研究它的原理和实现，这个研究又要有多深呢？经典答案就是，学习到足够可以开始写代码就可以了，等到时间容许在进一步深入研究。

那么现在就是深入研究 `module.exports`的时候了！

## Node.js如何定义和使用模块
### 传统js文件
这里是一个简单的js文件，`greeting.js`,它的功能一看就明白：
```js
//greetings.js
sayHelloInEnglish = function() {
	return "Hello";
};

sayHelloInSpanish = function() {
	return "Hola";
};
这里有两函数也就是两个功能。
```

### 用模块封装简单js文件
#### i> 想象该文件第一行有以下代码（是的，想象）
```js 
// var exports = module.exports ={};
```
#### ii> 把任何要重用（导出）的函数，赋值给exports
```js
exports.sayHelloInEnglish = function() {
	return "Hello";
};
exports.sayHelloInSpanish = function() {
	return "Hola";
};
```
#### iii> 以上的结果相当于做了以下的事情
```js 
module.exports = {
	sayHelloInEnglish = function() {
		return "Hello";
	};
	
	sayHelloInSpanish = function() {
		return "Hola";
	};
};
```

> 这个方式看上去有点怪异，之后可以做更进一步的解释。在这之前，可以透露一点小道消息。 Typescript定义模块的语法就感觉自然多了:
> ```js
> module namespace {
>   exports function sayHelloInEnglish = function() {
>		return "Hello";
>	};
>```
> 而用tsc转译以后，他就会变成上面的node.js语法。
> 什么是Typescript? OK,以后有时间再深入吧？ (听起来怎么这么耳熟？）

### 导入/使用模块
我们准备在main.js中导入和使用greetings.js中的所有函数。
#### i> 关键词require
`require`是nodejs用来导入模块的关键词。想象一下require的定义如下 （怎么又是想象?)
```js
var require =function(path){
	//....
	return module.exports;
};
```

#### ii> 导入greetings.js
```js 
//main.js
var greetings = require("./greetings");
``` 
**想象**一下以上代码等价于你的代码做了以下事情：
```js 
//main.js
var greetings = {
	sayHelloInEnglish = function() {
		return "Hello";
	};
	
	sayHelloInSpanish = function() {
		return "Hola";
	};
};
```
#### iii> 现在我么就可以重用greetings.js的功能了
```js
//"Hello"
greetings.sayHelloInEnglish();

// "Hola"
greetings.sayHelloInSpanish();
```
> **警告：**
> 正因为nodejs的这种模块机制，如果不小心给module.exports重新赋给了一个全新的对象，会导致不可预期的问题。
> 如：
> ```js
> //greetings.js
> //var exports=module.exports = {};
> exports.sayHelloInEnglish = ...
> exports.sayHelloInSpanish = ...
> /*  
>   重新赋值module.exports
> */
> module.exports= "Bonjour";
> ```
> 这时候，在main.js中我们在调用`greetings.sayHelloInEnglish()'就会出错。

## Node.js模块加载机制Require（）
> 不要把这里的Require（）和RequireJS混为一谈。不过有意思的是，Typescript的模块定义，甚至同时支持这两种模块机制。

### require()
导入和使用外部模块，只是简单的一句`require()`,看看angular/material/docs下的编译文件gulpfile.js的代码片段。对模块导入和使用有个直观的感觉。

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');

... 

//对模块gulp的使用
gulp.task('demos', function() { ...  

//对模块gulp-concat的使用
gulp.src([
    'node_modules/angularytics/dist/angularytics.js',
    'dist/docs/js/**/*.js'
  ])
    .pipe(concat('docs.js'))

//对模块fs的使用
fs.writeFileSync(dest + '/demo-data.js', file);
```

`gulp.task` 用于定义了一个任务；`cancat`用于合并文件；fs是一个对磁盘文件操作的模块。可以看出，有模块的引入，代码更为清晰而明确，这些常用模块相当于对基本语言功能的扩展。

这里，关键词require()把一切联系在一起。那么这句简单的语句背后发生了什么事情呢？
> 1. require其实不是一个语言的关键词，在文章后面的研究，我们就可以看到。
> 2. 还没有使用过require()或者对它实现机制不感兴趣的开发人员，可以略个这一部分。确实，后面实现机制不太影响使用。

以下大部分内容都来自原文： [How require() Actually Works](http://thenodeway.io/posts/how-require-actually-works/?utm_source=fredkschott.com&utm_medium=referral)

因为NodeJS是开源的，我们可以追溯`require()`到node的核心代码中去。但是，我们找到的不是一个简单的函数，而是一个文件module.js。这个文件实现了node的整个模块加载系统。涵盖的过程有加载、编译和缓存。而我们使用的`require()`只是其冰上一角。

### module.js
```js
function Module(id, parent) {
	this.id = id;
	this.exports = {};
	this.parent = parent;
	//...
```
我们可以看到module.js首先定义了一个类型（函数）Module。这个类型有两个功能。一个，它是所有模块的基类，之后每个模块都是这个Module的一个实例。这也是我们前面探讨的`module.exports`最终来源。
这个Module的第二个功能就是完成Node模块的加载过程。我们使用的`require()`最终就是调用module.require方法，而这个方法又调用了另外一个内部方法Module._load。最终的这个load方法才是真正加载模块文件的地方，也就是我么将要分析研究的。

### Module._load
```js
Module._load = function(request, parent, isMain) {
	//1. Check Module._cache for the cached module.
	//2. Create a new module instance if cache empty
	//3. Save it to the cache
	//4. Call module.load() with your the given filename, this will call module.compile() after reading the file contents.
	//5. If there was error loading /parsing the file, delete the bad module from cache.
	//6. return module.exports
};



