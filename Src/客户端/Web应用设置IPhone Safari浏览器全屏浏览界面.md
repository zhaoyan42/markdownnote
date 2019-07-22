# 第一种方法：#
添加viewport meta标签，使界面全屏显示。 

    　　<!--iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览-->
    　　<meta name="apple-mobile-web-app-capable" content="yes" />
　　但是这种方法个人在i4s上面测试，如果是直接打开safari浏览网页是木有任何效果的... 需要通过将网页添加到主屏幕中成为一个快捷方式，通过快捷方式进入才会有全屏的效果。

　　有种方法可以判断用户是从浏览器直接打开站点还是通过快捷方式进入，就是下面这个：

　　　　window.navigator.standalone

　　当从浏览器直接进入站点时该值为false，由快捷方式进入时则为true。

　　通过这个也可以做出 当用户通过浏览器打开web应用时可以弹出提示，提醒用户将网页添加到主屏将会获得更好的体验，由此引导客户。

 
# 第二种方法： #

　　使用js的window.scrollTop事件，加上计时器实时将顶部url栏去除。

     setInterval(function(){
     window.scrollTo(0,0);
    },500); 
　　使用该方法有个条件就是body的高度必须大于iphone屏幕的高度，否则没有效果。


# 以下方法可能对安卓有效，需测试 #
	
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
	<meta name="MobileOptimized" content="320" />


还有更多

	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="format-detection"content="telephone=no, email=no" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- 删除苹果默认的工具栏和菜单栏 -->
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<!-- 设置苹果工具栏颜色 -->
	<meta name="format-detection" content="telphone=no, email=no" />
	<!-- 忽略页面中的数字识别为电话，忽略email识别 -->
	<!-- 启用360浏览器的极速模式(webkit) -->
	<meta name="renderer" content="webkit">
	<!-- 避免IE使用兼容模式 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
	<meta name="HandheldFriendly" content="true">
	<!-- 微软的老式浏览器 -->
	<meta name="MobileOptimized" content="320">
	<!-- uc强制竖屏 -->
	<meta name="screen-orientation" content="portrait">
	<!-- QQ强制竖屏 -->
	<meta name="x5-orientation" content="portrait">
	<!-- UC强制全屏 -->
	<meta name="full-screen" content="yes">
	<!-- QQ强制全屏 -->
	<meta name="x5-fullscreen" content="true">
	<!-- UC应用模式 -->
	<meta name="browsermode" content="application">
	<!-- QQ应用模式 -->
	<meta name="x5-page-mode" content="app">
	<!-- windows phone 点击无高光 -->
	<meta name="msapplication-tap-highlight" content="no">
	<!-- 适应移动端end -->