# WebBIOS设置
## RAID配置
1. 主界面选择Configuration Wizard
2. 选择Add Configuration（Clear和New都会清除已有的配置！慎选！）
3. 选择Custom Configuration。
4. 配置磁盘组：
	- 左侧窗口显示物理驱动器（Physical Drivers）列表，可以按下<CTRL>键同时选中两个或多个处于Ready状态的物理驱动器用来创建磁盘组（Disk Group）
	- 点击右侧窗口下的Accept DG选项，将选中的物理硬盘移动至右侧磁盘组（Disk Groups）。如果需要撤销以上操作，可以点击Reclaim按钮。
	- 当磁盘组（Disk Group）的物理硬盘选定之后，点击Next按钮。会进入配置虚拟驱动器（Virtual Disk）的画面
5. 虚拟驱动器（Virtual Disk）配置
	- 一般来说只需要选择RAID Level（根据需要选择，服务器上两块硬盘一般选择RAID 1“镜像”）
	- 注意，如果有多块硬盘Select Size可能会在降低RAID Level的时候保留高级别RAID Level的值（较小，可能是可用量的一半），如果希望磁盘得到最大利用，请在下一步之前检查这个设置。（最大可用值一般右边的浏览框可以看到）
6. Next之后会有预览界面，左边是物理磁盘，右边是虚拟磁盘。点击Accept完成设置