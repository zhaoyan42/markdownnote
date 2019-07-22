# 反向代理与TeamCity 80端口的配置
> 反向代理就是Http请求转发

所以微软把这个代理的路由模块称为应用请求路由 (Application Request Routing)。这个模块是微软为IIS７发布的。

这个模块能根据各种情况自动将请求转发（routes）至内容服务器，例如HTTP头、服务器端变量或者服务器健康程度等负载均衡所考虑的状况。管理员能够在六种负载均衡算法中选择其一，并且调整检查特定服务器健康状况的条件。如果客户端能接受cookie，或者通过主机名，就能在客户端级别上建立与内容服务器的紧密关系。

下载地址：http://www.iis.net/downloads/microsoft/application-request-routing

## 安装ARR模块
Application Request Routing不是IIS默认的安装组建，必须另外安装。可以到IIS网站下载：http://www.iis.net/downloads/microsoft/application-request-routing 。也可以Web安装平台(http://www.microsoft.com/zh-cn/download/details.aspx?id=6164)来安装。 而且直接下载的ARR最后也是通过Web安装平台安装的。

## 创建和配置Server Farm (反向代理)
> 在上一步安装完成以后，IIS的管理器在网站的节点下面出现一个新的“Server Farms”的节点。

0. 右键点击<Server Farms>的节点, 选择Create Server Farm
1. 在出现的窗口里输入任意的名称，如我配置的Teamcity 
2. 点击<下一步>,进入目标服务器: 这是真正的内容提供者，如，teamcity.skight.com:88的配置如下
	1. 服务器地址：127.0.0.1 （有的服务没有绑定到127，比如GitBilt, 我就配的124.232.143.215 ）
	2. (高级设置）httpPort: 88
3. 点击<完成>会提示是否要Url Rewrite，选择<Yes>
4. 回到主节点（<Server Farms>的上一级）， 打开<Url重写>功能
5. 双击刚创建的ARR_Teamcity_LoadBalance从而打开<编辑入站规则>界面
6. 在<条件>下点击<添加>
7. 在<添加条件>对话框
	1. 条件输入： {HTTP_HOST}
	2. 模式：teamcity.skight.com (对外显示的域名）

> 好像不配置条件，也可以工作。

## ARR就是Web Farm
从以上IIS的节点名称，可以看到ARR其实是一个Web Farm或者说负载均衡的模块。这里的127.0.0.1:86只是可配置的其中一个内容服务器，我们还可以在一个Server Farm中配置更多的内容服务器，这就成了负载均衡服务，而且配置的内容服务器应该不限定本机。


参考网站：
https://blogs.endjin.com/2010/11/a-step-by-step-guide-to-hosting-teamcity-in-iis-7/
http://www.cnblogs.com/WizardWu/archive/2009/05/16/1458108.html
http://www.cnblogs.com/shanyou/archive/2009/11/15/1603245.html
