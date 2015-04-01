# 拟物设计和Angular的实现 - Material Design

>  Material Design是Google最新发布的跨平台统一视觉设计语言。直接翻译是物质设计，但是我更倾向于使用"拟物设计"更为准确。

> 据谷歌介绍，Material Design基于“真实的触感，灵感源自对纸和墨水的研究，” 能够让用户 “理解那些用于替代真实世界的可视线索，”“而又不违背力学原理。”另外，光线、表面和移动的基本原理是表现对象如何移动、交互和相互关联地存在于空间中的关键。逼真的光影效果可以显示区块间的接缝、划分空间、以及标识移动的部件。

> Material Design在动画、风格和布局方面提出了一系列的原则，并且为大量的视觉组件，包括按钮、卡片、网格和对话框等，以及相关的动作和手势提供了建议，另外还包含了一些与可访问性有关的指引。

## 原理
### 拟物就隐喻
拟物是对空间和动作的一致整体的模拟。拟物系统的设计基于触摸感，得力于纸墨原理，借力高科技， 最终为我们打开了一道想象之门。

### 系统正交分解
* 组件 - UI Component (Directives, Services, ARIA)
* 布局 - Layout CSS (FlexBox, Attribute, Child Aligment) 
* 风格 - Theme (Color Palettes) 
![](https://cloud.githubusercontent.com/assets/210413/5077572/30dfc2f0-6e6a-11e4-9723-07c918128f4f.png)

### 拟物的世界
#### 3D世界
拟物的世界是3D世界，每个物体都有X, Y, Z三个方向的坐标。其中，Z是垂直于屏幕的轴，每一层在Z方向上都有标准的1dp厚度。 

![](http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7UXpQYWltVjNPWXc/whatismaterial_environment_3d.png)

#### 光和影
拟物的世界还引入了虚拟光源，而实际上我们是看不到这个光源的，我们看到是这个光源在物体上留下的影子。
拟物世界仅仅引入了两种光源，所有的物体的影子都是由这两种光源照射的结果。
##### 主光
主光源在物体上留下的是单方向的影子。

![](http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7aUEtMG1ielNEaEk/whatismaterial_environment_shadow1.png)
##### 散光
散光源在物体上留下的是多方向均匀而一致的模糊影子。

![](http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7ZlNXZTJFX245YUE/whatismaterial_environment_shadow2.png)

##### 两种光源同时照射

http://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7Z19QQzFJWXhYT0E/whatismaterial_environment_shadow3.png

## 布局
Angular Material的 响应式CSS布局是基于flexbox实现的。整个布局体系是用元素的属性来标示，而不用CSS类。这也是正交设计的一个体现：属性来定义布局，类定义风格。
例子：使用`layout`属性来定义内部元素的布局，横向排列(`layout="row"`)或者竖向排列 (`layout="column"`)
```html
<div layout="row">
  <div>I'm left.</div>
  <div>I'm right.</div>
</div>
<div layout="column">
  <div>I'm above.</div>
  <div>I'm below.</div>
</div>
```

[谷歌Material Design原文](http://www.google.com/design/spec/material-design/introduction.html)

[AngularJS的实现] (https://material.angularjs.org )