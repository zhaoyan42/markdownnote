# 通过Anuglar Material串串学客户端开发 - NodeJS模块机制之Module.Exports
> [Angular Material](https://github.com/angular/material)不仅仅有本身框架的源代码，还有在这个框架上实现的一个应用[docs](https://github.com/angular/material/tree/master/docs)。更为强大的是，这个应用是真正的产品网站：就是它的[官网](https://material.angularjs.org/latest/#/)。我有理由相信，这个网站是从源代码直接发布的，从网址的最后那个`/latest`,我们可以看出端倪。

> 从这个产品本身入手不失为学习的捷径。

## 入口gulpfile.js
C/C#命令行的应用，我们会寻找`Main()`方法；C#的Web应用我们会找`Global.asax`；那么一个NodeJS应用我们就要找`gulpfile.js`。
> 注意：以前的很多项目都是用gruntjs，而近期趋势是转向gulpjs,我自己的感觉也是gulpjs很好理解，性能也不错。

和前两个不同的是，gulp.js其实不是应用运行的入口，而是项目编译的入口。gulp就相当于微软的MSBuild用来定义编译任务。

## Javascript也有编译
编译，JS文件还要编译？是的，如果你对客户端应用的印象还停留在html文件中直接引用你写的JS文件，那就已经大大落伍了。至少，很多的javascript的框架项目，如jQuery, AngularJS等等，都有编译的过程。虽然，这个编译和我们编译型语言（如C，C#等）的编译技术有些不同，但是角色是一样的：由于编译过程的存在，使得我们的开发环境和产品环境隔离，这种隔离也是一种解耦。

## 编译即解耦
解耦带来的价值就是，我们可以自由安排开发时的文件结构，而不要过多考虑产品文件结构的需求。比如：开发时我们更希望根据模块和责任的划分，分别对应不同的文件（文件越多越好），而产品阶段，则希望内容集中（文件越少越好）。对应这个情况，javascript就有一个编译步骤concatenate(合并文件)。从实现技术上看，这没有什么神奇的东西，但是这完全体现了编译的本质。

## 两个gulpfile.js文件
然而，编译不是Gulp的关键词，Gulp的关键词是任务（task），更多时候我把它和Ant/nAnt对等来看。

回到[Angular Material](https://github.com/angular/material)的源代码来。我发现它居然有两个Gulp.js文件。一个在根目录，另外一个`docs/gulpfile.js`。从这我在了解到，他其实是两个项目，一个是material框架，另外一个是它的官网。它两部分代码写到有一个代码库，而且因为它官网本身也使用了material框架，甚至有一部分内容都是从框架中自动生成的，也是为什么写到一个代码库的理由。

然而，两个编译文件暴露了它是两个项目的事实，至少是两个发布（发布和项目的区别？）。 两个发布就是两个产品，又一次印证了编译是开发和产品的解耦器！

## module.exports
然而，第二个编译文件`docs/gulpfile.js`中却看到了一个奇怪的东西`module.exports = function(gulp, IS_RELEASE_BUILD) {`。

`module.exports`是什么东西呢？