 # 规则引擎(Rule Engin)浅析和C#实现
> 几乎每一个项目中都会使用的到规则，业务知识都不同程度可以用规则的方式来表示。比如很多系统中都有某个人是否符合申请要求，或某项申请是否仍然有效，这些无不透露着规则的影子。

> 规则引擎作为一个规则解决方案，理论已经是比较成熟和完善。但是谈及实现细节却尚无统一的标准。这里基于C#平台，根据个人在好几个系统的实际运用，归纳一下实践细节和总结理论体系。

## 规则 - Rule
规则是最基本的构成单元，但是很多实现系统中有点混淆不同层面的概念，如何Validator或RuleChecker混淆在一起，导致这个基本单元的定义和使用的混乱。这里，我为这个概念定义为一个接口。
```cs
public interface Rule
{
    string Name { get; }
    bool is_satisfy(object obj);
}
```
再加上一个泛型的接口
```cs
public interface Rule<T>:Rule
{
    bool is_satisfy(T obj);
}
```

> 这里需要注意：
1. 其实这里直接用抽象类代替接口定义也是一个较好的方案。
2. 很多系统（包括我自己的系统）把（错误）消息生成也纳入到这个定义中，这样的责任太多了。
3. Name在这里只是一个友好信息的保存，并没有业务逻辑，因此规则真正的内容就一个`bool is_satisfy()`, 因此规则也可以用一个delegate来完整表达。

Rule的delegate定义如下：
```cs
public delegate bool RuleMethod<T>(T item);
```
这样，我们可以很容易清晰的定义大量公用规则
```cs
public static class StringIs
{
	public static RuleMethod<string> NotEmpty()
	{
		return str=>string.IsNullOrEmpty(str)
	}
}

public static class Is
{
    public static RuleMethod<T> InRange<T>(
		T min,
		T max)
        where T : IComparable<T>
    {
        return item => 
			item.CompareTo(min) < 0 
			|| item.CompareTo(max) > 0 ;                 
    }
}
```

这个代理也很容易用一个简单类封装成为`Rule`
```cs
public class MethodRule<T> : Rule<T>
{
    public string Name { get; private set; }
    private RuleMethod<T> rule_method;

    public MethodRule(
		string name, 
		RuleMethod<T>  rule_method)
    {
        Name = name;
        this.rule_method = rule_method;
    }

    public bool is_satisfy(T obj)
	{
		return rule_method(obj);
	}
}
```
> 总结：
Rule<T> == bool is_satisfy<T>(T item) == delegate bool RuleMethod<T>(T item)

## 规则的组成元素
> 表面上已经很简单的规则定义，却还能继续息分成三部分：检测对象、检测逻辑和指定对象。这三部分不仅仅是来源不同，数值不同，最主要的是生命周期大不相同。对它们的深入理解，有利于规则引擎的设计和理解。

###  检测对象 - CheckingData
这个检测对象就是`is_satisfy<T>(T obj)`中的obj, 是这个规则要检查的对象（值）。也是规则引擎的第一公民，我们经常说“合不合格”，“通不通过”，省掉的主语就是这个检测对象。然而，在规则引擎系统中，它的生命周期却是最短的，出现时间是最晚的。它是一个“动态”数据，规则引擎系统甚至完全不保存它。

为了强调这个数据在引擎系统中的角色，我建议把`Rule`定义改为：
```cs
public interface Rule<CheckingDataType> :Rule
{
	bool is_satisfy(CheckingDataType checking_data);
}
```

### 检测逻辑 


### 指定对象
