# 通过Anuglar Material串串学客户端开发 - NodeJS模块机制之Module.Exports
> [Angular Material](https://github.com/angular/material)不仅仅有本身框架的源代码，还有在这个框架上实现的一个应用[docs](https://github.com/angular/material/tree/master/docs)。更为强大的是，这个应用是真正的产品网站：就是它的[官网](https://material.angularjs.org/latest/#/)。我有理由相信，这个网站是从源代码直接发布的，从网址的最后那个`/latest`,我们可以看出端倪。

> 从这个产品本身入手不失为学习的捷径。

## 终极入口Gulp.js
C/C#命令行的应用，我们会寻找`Main()`方法；C#的Web应用我们会找`Global.asax`；那么一个NodeJS应用我们就要找`Gulp.js`。
> 注意：以前的很多项目都是用gruntjs，而近期趋势是转向gulpjs,我自己的感觉也是gulpjs很好理解，性能也不错。

和前两个不同的是，gulp.js其实不是应用运行的入口，而是项目编译的入口。