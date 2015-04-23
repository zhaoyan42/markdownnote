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
![](http://i.imgur.com/zyBZjZF.png)

### 拟物的世界
#### 3D世界
拟物的世界是3D世界，每个物体都有X, Y, Z三个方向的坐标。其中，Z是垂直于屏幕的轴，每一层在Z方向上都有标准的1dp厚度。 


#### 光和影
拟物的世界还引入了虚拟光源，而实际上我们是看不到这个光源的，我们看到是这个光源在物体上留下的影子。
拟物世界仅仅引入了两种光源，所有的物体的影子都是由这两种光源照射的结果。
##### 主光
主光源在物体上留下的是单方向的影子。

![](http://i.imgur.com/0qUyFGx.png)
##### 散光
散光源在物体上留下的是多方向均匀而一致的模糊影子。

![](http://i.imgur.com/JGyx8MV.png)

##### 两种光源同时照射

![](http://i.imgur.com/WudJu9N.png)

### 物质的特性
物质一些内在的特性和行为，理解这些特性可以帮助我们更好理解拟物设计。

#### 物理特性
* 我们的物质可以有不同的长度和宽度(X轴和Y轴的度量),但是厚度是统一的(1dp),而且厚度永远不为0。
* 物质的阴影总是来源于它的相对(其它元素)高度 (Z轴的度量）
* 显示在物质上的内容不受物质本身的限制，可以是任何形状，任何颜色。
* 内容的行为与物质的行为是解耦的，但是物质的边界仍然能够限制内容的显示。
* 物质是实体，任何操作时间不能透过最上层物质应用到被挡住的下一层去。
* 多个物质元素不能在空间中占据同一个点，他们是互斥的。
* 一个物质元素不能穿过其他物质元素。

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

## 风格 
### 风格服务 - $mdTheming

### 风格标签 - mdTheme和mdThemable

## 手势模型
> iPhone的出现让手势操作大为流行，也使得手势编程成为开发人员的挑战。 拟物设计也把手势编程纳入在内，大概也想制定一个在交互模型标准。现阶段因为MD还在预发布阶段，因此还只实现了单点手势（一个指头），可是已经有足够的东西值得学习，无论对我们应用还是自己设计手势编程都是大有裨益。


MD有两个手划控件`mdSwipeLeft`和`mdSwipeRight`,然而真正的代码支持却不在这两个控件的定义中，而是在核心代码中，文件位置`src\core\services\gesture\gesture.js`。
### 基本屏幕事件
做过界面的人都熟悉`mousedown, mouseup, mousemove`等事件，很多后台函数多与这些事件绑定，从而能够与用户交互。但是这些事件都有些单薄而僵硬，手势事件却更友好和人性化，这也是其大受欢迎的根本原因。
手势事件不是空中楼阁，它们本身是需要这些基本事件的支持，这些基本屏幕事件也就成为了手势模型的一个组成部分，成为最底的一层。
		
这些事件首先被划分为三类，说是三类，理解成三个事件更为恰当，它们与手指与屏幕的交互一一对应：开始事件就是手指按下屏幕；移动事件就是手指在屏幕移动；结束事件就是手指离开屏幕。非常简单而直观。
从下面MD对这三类事件的定义，我们也可以看到每类事件中的变体大都与设备的不同有关而不是真正的不同事件，如鼠标的按下，和手指的按下。这也是我上面说的把它们理解为三个事件更为恰当。
* START_EVENTS =>'mousedown touchstart pointerdown';
* MOVE_EVENTS  => 'mousemove touchmove pointermove';
* END_EVENTS => 'mouseup mouseleave touchend touchcancel pointerup pointercancel';

### 手势归纳
基本事件都是瞬间事件，不存在延时和逻辑判断，按下就是按下，松开就是松开；这也是称之为基本事件的原因。
而手势却恰恰相反，
* 手势是综合事件，如滑动手势，直观的感觉就是手指按下快速向左（右）滑动，并同时松开手指，这整个过程完成才是一个滑动手势。
* 手势还有逻辑判断，还是滑动手势，不仅仅要在以上的全过程之后才激发，手指的还要超过一定的速度才能算是滑动手势。

因此，可以把手势看作在基本事件之上的一个封装，在MD的实现也是用GestureHandler的函数还侦听基本事件然后作出综合处理。

#### 侦听
这里是MD绑定基本事件的代码：
```js
angular.element(document)
  .on(START_EVENTS, gestureStart)
  .on(MOVE_EVENTS, gestureMove)
  .on(END_EVENTS, gestureEnd)
```

MD移动事件的侦听处理函数：
```js
function gestureMove(ev) {
  if (!pointer || !typesMatch(ev, pointer)) return;
  updatePointerState(ev, pointer);
  runHandlers('move', ev);
}
```
其它两个（开始和结束事件）都与此类似，只不过有更多的处理过程。这个因为简单，可以用来好好分析关键过程。我们可以看到，这个侦听函数的关键一步就是调用处理器(`runHandler`)。这个函数内部并不复杂，只是简单的遍历预存处理器，然后调用该处理器定义的对应的基本事件处理器。这个处理器就是手势处理器，它会分析归纳基本事件当条件满足时触发手势事件。

#### 手势处理器`$$MdGestureHandler`
MD用工厂(`factory`)的方式定义了手势处理器的模板(或者可以理解为基类帮助理解),这个factory名称就是$$MdGestureHandler，为了便于理解，我们把它分解成三部分来看。

##### 基本屏幕事件处理
第一部分：4个方法，分别与三类基本屏幕事件对应(cancel是辅助方法),也是用来分别处理三类屏幕事件的，上面的`runHandler`就是调用的源头。
```js
start: function(ev, pointer) {
	if (this.state.isRunning) return;
	var parentTarget = this.getNearestParent(ev.target);
	var parentTargetOptions = parentTarget && parentTarget.$mdGesture[this.name] || {};

	this.state = {
	isRunning: true,
	options: angular.extend({}, this.options, parentTargetOptions),
	registeredParent: parentTarget
	};
	this.onStart(ev, pointer);
	},
move: function(ev, pointer) {
	if (!this.state.isRunning) return;
	this.onMove(ev, pointer);
	},
end: function(ev, pointer) {
	if (!this.state.isRunning) return;
	this.onEnd(ev, pointer);
	this.state.isRunning = false;
	},
cancel: function(ev, pointer) {
	this.onCancel(ev, pointer);
	this.state = {};
},
```
##### 优化的屏幕事件
第二部分：4个内部事件，也是基本与以上4个方法对应，并在4个方法中适当的时机触发，可以看作是对原始基本事件的梳理之后的重新抛出。 你如果创建自己的手势处理器，要做的也就是重载这4个事件。从以下代码我们也可以看到，MD为每一个事件给出了空实现(`angular.noop')，目的就是为了让自定义处理器自己重载实现。
```js
onStart: angular.noop,
onMove: angular.noop,
onEnd: angular.noop,
onCancel: angular.noop,
```

##### 手势的触发
第三部分：也是最后最关键的一个方法，手势事件的触发`dispatchEvent`。自定义的手势处理器最终都是要调用这个方法来触发手势事件。大部分触发时机都在`onEnd`中，当是不是必须的，要根据你具体的手势的含义来定。
dispatchEvent的实现：
```js
dispatchEvent: dispatchEvent,
...
/*
* NOTE: dispatchEvent is very performance sensitive. 
*/
function dispatchEvent(srcEvent, eventType, eventPointer, /*original DOMEvent */ev) {
	eventPointer = eventPointer || pointer;
	var eventObj;
	
	if (eventType === 'click') {
	  eventObj = document.createEvent('MouseEvents');
	  eventObj.initMouseEvent(
	    'click', true, true, window, ev.detail,
	    ev.screenX, ev.screenY, ev.clientX, ev.clientY, 
	    ev.ctrlKey, ev.altKey, ev.shiftKey, ev.metaKey,
	    ev.button, ev.relatedTarget || null
	  );
	
	} else {
	  eventObj = document.createEvent('CustomEvent');
	  eventObj.initCustomEvent(eventType, true, true, {});
	}
	eventObj.$material = true;
	eventObj.pointer = eventPointer;
	eventObj.srcEvent = srcEvent;
	eventPointer.target.dispatchEvent(eventObj);
}

```

#### 手势实例解析
手势内部实现过程虽然较为复杂，以上的流程解析也是为了更好的理解从而有个直观的感觉。到了每一个手势的实现时，真正用到的却不算多，主要就是那4个优化的事件`onStart, onMove, onEnd, onCancel`和一个触发的方法'dispatchEvent`。我们来看看一些手势实例，亲身感受一下，良好建模以后的手势实现。

##### 滑动手势 - Swipe
| 屏幕事件	| 触发条件			| 触发事件		|
| --------- | -----------------	| -------------	|
| [无]		|	 	 			|				|
| 按下		|	  				|				|
| 移动		|	  				|				|
| 移动		|	  				|				|
| 移动		|	  				|				|
| 移动		|	  				|				|
| 松开		| 超过最低速度和位移	|$md.swiperight	|
| [无]		|	  				|				|


##### 拖动手势 - Drag
| 屏幕事件	|  触发条件				| 	触发事件		|
| --------- | ---------------------	| -------------	|
| [无]		|	 	 				|				|
| 按下		|	  					|				|
| 移动		|	  					|				|
| 移动		|当前触点与起点位移超过阀值	|$md.dragstart	|
| 移动		|	  					|$md.drag		|
| 移动		|	  					|$md.drag		|
| 松开		| 						|$md.dragend	|
| [无]		|	  					|				|

## 手势事件的应用

### 开关控件 - switch
> MD本身的控件switch就有对拖动手势的使用，代码位置： src\components\switch\switch.js
> ngSwitch是对CheckBox的视觉化扩展，背后的Model还是一样bool数值，但是视觉效果不再是一个可选框，而是一个可以左右拖动的滑条。

**特别注意： md-switch不是ng-switch,它有着和复选框同样功能，但是呈现开关的外观。其动态效果就需要用到了拖动手势。**

#### 手势服务$mdGesture
前面手势实现的代码介绍了一大堆，都是内部实现原理，真正通过$mdGesture服务暴露出来的只有两个方法：

##### 元素登记 - $mdGesture.register
`$mdGesture.register` 用来把DOM元素注册到手势处理器中，从而可以侦听该手势事件。如ngSwitch就是如此初始化的：

**为元素switchContainer登记拖动drag手势**
```js
$mdGesture.register(switchContainer, 'drag');
```
**侦听手势事件**
```js
switchContainer
	.on('$md.dragstart', onDragStart)
    .on('$md.drag', onDrag)
    .on('$md.dragend', onDragEnd);
```

> 注意： 元素switchContainer就是ngSwitch控件的最外围的容器`'<div class="md-container">...</div>

##### 自定义手势 - $mdGensture.handler
$mdGensture暴露了另外一个方法`handler`,可以添加自定义的手势处理器,这是高级应用，需要了解上面手势的内部实现机制。
这个手势处理器可以分别对三个事件侦听：
```js
onStart: function(ev){}
onMove: function(ev, pointer) {}
onEnd: function(ev, pointer) {}
```
然后在适当的时候，触发自定义的手势事件： 
```js
this.dispatchEvent(ev, 'eventName', this.state.dragPointer);
```

#### 手势事件的处理
回到ngSwitch，看看它对三个事件的侦听后的处理，
##### 首先DragStart事件
我把一些处理和效果代码暂时屏蔽了， 剩下的就是一行代码，保存原始宽度到对象drag中，为后面的真正拖动做准备。
```js
function onDragStart(ev) {
    ...
    drag = {
      width: thumbContainer.prop('offsetWidth')
    };
    ...
  }
```
#####  Drag事件
同样，屏蔽了一些非关键代码，主要代码如下：
```js
function onDrag(ev) {
    if (!drag) return;
	...
    var percent = ev.pointer.distanceX / drag.width;

    //if checked, start from right. else, start from left
    var translate = ngModel.$viewValue ?  1 + percent : percent;
    // Make sure the switch stays inside its bounds, 0-1%
    translate = Math.max(0, Math.min(1, translate));

    thumbContainer.css($mdConstant.CSS.TRANSFORM, 'translate3d(' + (100*translate) + '%,0,0)');
    drag.translate = translate;
  }
```
0. 首先如果没有drag对象时，就完全跳出流程。这是防错语句，因为该变量在onDragStart中必须设置的。
0. 然后，计算拖拽点相对原始宽度的百分比。
0. 调整百分比并赋给translate变量
	1. 因为从右往左拖动时ev.pointer.distanceX是负数，而图标的也是从右往左（100%到0%）。所以用`1+percent`计算图标相对于左端点的相对百分比位置。
	2. 限制百分比在0~100%之间。
0. 用CSS的Transform命令，把 thumb在X轴移动对应的百分比
0. 保存已经移动的百分比到对象drag中

在Drag事件持续激发，指示图标就会持续移动到鼠标或手指触点的当前位置，从而呈现拖动的效果。

##### DragEnd
拖动结束事件的处理：
```js
function onDragEnd(ev) {
	
	thumbContainer.css($mdConstant.CSS.TRANSFORM, '');
	
	// We changed if there is no distance (this is a click a click),
	// or if the drag distance is >50% of the total.
	var isChanged = ngModel.$viewValue ? drag.translate < 0.5 : drag.translate > 0.5;
	if (isChanged) {
	  applyModelValue(!ngModel.$viewValue);
	}
	drag = null;
	}
function applyModelValue(newValue) {
    scope.$apply(function() {
      ngModel.$setViewValue(newValue);
      ngModel.$render();
    });
  }
```
0. 清理CSS的Transform`thumbContainer.css($mdConstant.CSS.TRANSFORM, '');`
1. 判断是否完成开关转换：如果拖拽位置超过一半，就认定为有效`isChanged`
2. 如果是有效的拖动，就直接设置后台值`ngModel`，从而完成整个过程。




### 模块Tabs
因为Tabs不是一个简单控件，定义标签太多，它不只有一个js文件，而是好几个集中在一个文件夹中：src/components/tabs/js/ ,而在其根目录放了一个启动文件 src/components/tabs/tabs.js。这个文件只是简单的定义了模块`tabs`,所以可以看做是一个启动代码：
```js
angular.module('material.components.tabs', [
  'material.core'
]);
```
#### 标签mdTabs
显然，第一个标签就是`mdTabs`,定义它的文件是： src/components/tabs/js/tabDirective.js
从名称很容易猜到，这个标签是最外层的大容器，用来包容单个`mdTab`项。
##### mdTabs使用
典型用法如下,并不复杂：
```html
<md-tabs>
	<md-tab label="Tab #1"></md-tab>
	<md-tab label="Tab #2"></md-tab>
	<md-tab label="Tab #3"></md-tab>
</md-tabs>
```
#### mdTabs标签
当Angular编译遇到<mdTabs>,它替换为两部分:Header和content
```html
<section class="md-header">
...
</section>
<section class="md-tabs-content"></section>
```
Header部分用的不多，不去研究，大部分的变化还在内容部分，那些是在标签mdTab中实现的。mdTabs的后台处理并不多，只是监测`selectedIndex`的变化。当监测到客户端或别的来源导致`selectedIndex`有变动时，调用Controller切换界面的当前(可视）tab。
```js
scope.$watch('selectedIndex', function watchSelectedIndex(newIndex, oldIndex) {
	...
	var newTab = tabsCtrl.itemAt(newIndex);
	...
	tabsCtrl.select(newTab, rightToLeft);
}
```

#### mdTab标签
mdTab嵌套在mdTabs之内，来定义每一个Tab。每个Tab由两部分组成：label和content。
label有三种方式来定义：
0. 用属性label来定义
1. 用标签`<md-tab-label>`
2. 如果上面两个都没有，mdTab会把content自动设为label

Content
任何非`<md-tab-label>`的部分，自动转化为内容，并用`<div class="md-tabs-content">`封装起来。

不像其他控件,mdTab没有直接替换的HTML模板，而是全部用在compile中用javascript生成。



[谷歌Material Design原文](http://www.google.com/design/spec/material-design/introduction.html)

[AngularJS的实现] (https://material.angularjs.org )