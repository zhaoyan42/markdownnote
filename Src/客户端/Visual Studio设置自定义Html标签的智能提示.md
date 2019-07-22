# Visual Studio设置自定义Html标签的智能提示
## 创建自定义的xsd文件

## 拷贝到系统目录
C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\CommonExtensions\Microsoft\Web\Schemas\1033\HTML
## 修改Reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\Packages\{1B437D20-F8FE-11D2-A6AE-00104BCC7269}\Schemas\http://schemas.microsoft.com/intellisense/ctrls]
"File"="html\\your_file.xsd"
"Friendly Name"="Your Name"
"IsBrowseable"=dword:00000001