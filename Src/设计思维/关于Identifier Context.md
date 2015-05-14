## 概念
- Identifier 标识，用于唯一标识一个对象
- Context 上下文、语境，表现形式为键值对，例如“Person/123456”、或者多个值的组合“Exam/02^99^2015-05-14”
- Composite 复合，表明该对象由若干个部分组成
- Component 组件，用于组成复合对象的部分

## 使用
BusinessIdentifier定义：



- 用Composite标记复合Identifier
- 用Component标记组件字段
- 每个Identifier定义都需要加上CodeName标记，用于标识名称
>

	[Composite()]
    [CodeName("Exam")]
    public struct ExamIdentifier : BusinessIdentifier
    {//省略若干实现细节
		
		[Component]
        public DistrictIdentifier District
        {...}
        
        [Component]
        public ExamDefIdentifier ExamDef
        {...}
        
        [Component]
        public Date Date
        {...}
	}

----------

    [CodeName("District")]
    public struct DistrictIdentifier : BusinessIdentifier
    {
	}

----------

    [CodeName("ExamDef")]
    public struct ExamDefIdentifier : BusinessIdentifier
    {
	}

----------

    [CodeName("Date")]
    public class Date 
    {
	}

定义BusinessContextKey：

    public static BusinessContextDataKey<ExamIdentifier> Exam = Create<ExamIdentifier>();

定义Context

    [Context(typeof(ExamIdentifier))]
    public class ExamDetailGet : DiscreteWebRequestCommand
    {
	}

## 实现原理
1. Context解析键的时候，会使用CodeName的值来做键，这里摒弃了原来Keys.UPPERCASE的用法
2. Context中添加键值对的时候，会先添加Composite的值，然后根据Component来解析组件，依次添加所有组件。这是一个递归过程，也就是说如果组件仍然是一个Composite，那么会继续深入解析。