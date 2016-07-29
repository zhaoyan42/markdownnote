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