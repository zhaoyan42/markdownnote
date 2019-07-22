# WebStorm编译lodash.d.ts出错的解决方案

## 原因：
WebStorm设置中，Language & Frameworks下面的TypeScript中，会默认编译器的“Node interpreter”为已安装的node.exe

而下面有个Compiler version设置中，我装的Node为4.5.0，内建编译器版本为1.4

这个版本不支持lodash中的一些语法，导致编译报错

## 解决方案：
先npm安装typescript（国内考虑用cnpm，<a>https://npm.taobao.org/</a>）

npm install typescript -g

然后在设置中吧上面提到的Compiler version设置改为Custom Directory，并且填入

C:\Users\[你的用户名啊啊啊]\AppData\Roaming\npm\node_modules\.typescript_npminstall\node_modules\.1.8.10@typescript\lib

完