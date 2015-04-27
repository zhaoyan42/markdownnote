# Azur配置翻墙代理
## 创建虚拟机
0. 在Azure的管理界面（Portal),点击New
0. 依次选择 Computer =>Virtual Machine => From Gallary
0. 对话框<Choose an Image>: 选择UBUNTU => Featured下选择最新版本的Unbuntu Server xx.xx =>下一步
0. 配置虚拟机1
	1. 虚拟机名称< Virtual Machine Name>
	2. Tire：选Basic (不需要太强大
	3. 用户名(用于登陆你的虚拟机）
	4. 去掉使用SSL的勾选项<Upload compatible SSH key for authentication>，就会出现提供密码的勾选项<Provide a Password>
	5. 勾选提供密码项，然后输入密码
0. 配置虚拟机2
	1. 选择虚拟机依附的Cloud Service
	2. 如果选择创建新的Cloud Service,就需要配置以下内容
		1. Cloud Service DNS 名称
		2. 服务器所在的地区：美洲，亚洲等
	3. 存储的帐号（虚拟机和存贮设备是分开设置的），可以选用已有的或者自动创建一个新的
	4. 创建一个端口(注意：默认的SSH 22不要删除)：
		1. 名称 Squid (因为我们会用Squid服务做代理）
		2. 协议 TCP 
		3. 对外端口 20141 （linux最好端口号设置大于1024,不然需要管理权限sudo侦听1024以下的端口）
		4. 对内端口 20141
0. 最有一步：安装虚拟机，Azure需要一点时间完成安装。
0. 安装完成后，进入虚拟机的管理界面，可以找它的IP地址<Public Virtual IP (VIP) Address>。这个地址就是我们作代理的地址，只要虚拟机不关闭，这个地址就不会变。 

## 安装代理软件
0. 登录虚拟机 - Windows下我们可以使用免费软件Putty，这是一个SSH和telnet的客户端。连接的IP地址是上面虚拟机的IP地址端口22。
0. 连接上虚拟机以后，会提示要你分别输入用户名和密码，这些都是在创建虚拟机时你自己的配置。
0. 通过`apt-get`安装代理软件Squid: `sudo apt-get install squid`
0. 修改Squid配置文件

	```
	cd /etc/squids3
	sudo cp squid.conf squid.conf.bak
	sudo rm squid.conf 
	sudo touch squid.conf
	sudo vim squid.conf
	``` 

	在vim中，按“a"进入修改模式，把下面内容加入文件中。按ESC退回到命令模式，输入":wq"保存退出。

	```
	http_access allow all
	http_port 20141
	```
0. 最后启动Squid服务：

	```
	sudo service squid3 restart
	```
0. 测试代理端口：`telnet xxx.xxx.xxx.xxx 20141

## 客户端代理配置
### 浏览器设置
Chrome有一个行号的代理扩展 SwitchySharp,　或者直接用IE的代理配置， IP　xxx.xxx.xxx.xxx 端口 20141
### 检查你的IP 
设置代理以后，浏览网站 http://whatismyipaddress.com/ 可以看到你的IP已经显示为美国（或其他你虚拟机设置的地理位置）




	