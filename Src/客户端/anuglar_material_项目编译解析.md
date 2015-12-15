# Anuglar Material 项目编译解析

## 利刃Gulp 
因为Material是较新的项目，它不再使用grunt而是改用gulp作为它的编译运行平台。因此，我们可以看到根目录有一个响亮的文件 `gulpfile.js`

## 编译任务的分解
我们打开文件， 看到的去不是以前看到的一大堆任务（Task）的定义，而是寥寥几行代码：

```js
fs.readdirSync('./gulp/tasks')
    .filter(function (filename) {
      return filename.match(/\.js$/i);
    })
    .map(function (filename) {
      return {
        name: filename.substr(0, filename.length - 3),
        contents: require('./gulp/tasks/' + filename)
      };
    })
    .forEach(function (file) {
      gulp.task(file.name, file.contents.dependencies, file.contents.task);
    });

```

任务哪去了，仔细看看，越来它是采取的动态加载，把各个任务分解到文件夹`gulp/tasks`了。到该文件我们能看到十几个任务定义，而文件名称就是任务名称。这样是不是很清晰了？