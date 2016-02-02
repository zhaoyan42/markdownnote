把NhibernateProfile中的HibernatingRhinos.Profiler.Appender.dll
放到Web.UI的bin文件夹中（可能需要引用）

到Global.asax中反注释
    HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
如果没有则添加

到Profile中运行NHProf.exe