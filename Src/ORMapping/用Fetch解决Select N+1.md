#用Fetch解决Select N+1

## 多层次结构ComponentCode
ComponentCode 是一个自指向的多层次类，伪代码定义如下：
```cs
class ComponentCode
{
	ComponentCode Parent;
	IEnumerabl<ComponentCode> Children;
}
```

## 灵活设计带来的副作用
我们用到的ComponentCode多达4层，而且很多时候是要全部取出来。直接依靠他本身的映射，就会出现Select N+1 的问题，我的案例就有1600次到数据库的读取。
部分影射代码如下：
```cs
class ComponentCodeMap: ClassMap<ComponentCode>
{
	public ComponentCodeMap()
        {
            Id(x => x.Id);           
            References(x => x.Parent);
            HasMany(x => x.Children).Cascade.All();
        }
}
```

## QueryOver中的Fetch
幸运的是， nHibernate的QueryOver有一个方法 `fetch`可以在一个查询中通过`join`把子对象同时查询出来。
```cs
QueryOver.Of<ComponentCode>()
    .Where(x=>...)
    .Fetch(x=>x.Children).Eager
```

## Fetch的级联
但是，我们有4级，可以持续使用`Fetch`,不过有点小技巧：
```cs
QueryOver.Of<ComponentCode>()
	.Where(x=>...)
	.Fetch(x=>x.Children).Eager
	.Fetch(x=>x.Children.First().Children).Eager
	.Fetch(x=>x.Children.First().Children.First().Children).Eager
```