# 已经存在的 UpSource YouTrack 与新安装的 Hub 集成
在管理界面中选择Hub Integration，填入Hub的Url之后（例如http://hub.skight.com:2000/hub）确定
系统会进行一系列的合并操作，然后自动重启Youtrack UpSource服务。

成功后后会提示冲突项目，如果没有异议选择合并并且确认即可。

# 已经存在的 TeamCity 与新安装的 Hub 集成
先安装插件 TeamCity Hub Plugin [https://confluence.jetbrains.com/display/TW/TeamCity+Hub+Plugin](https://confluence.jetbrains.com/display/TW/TeamCity+Hub+Plugin "TeamCity Hub Plugin")
重启TeamCity服务之后，进入Administration->Hub Settings 填入Hub的Url之后（例如http://hub.skight.com:2000/hub）确定

到Synchronization标签中根据需求（一般如果确认集成到Hub则全部勾选）勾选相应的选项，然后点击Save，点击Synchronize now完成同步（可能会有冲突错误，基本可以忽略）
