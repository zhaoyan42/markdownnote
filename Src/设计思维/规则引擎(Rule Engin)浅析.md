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
