## 概念
- Identifier 标识，用于唯一标识一个对象
- Context 上下文、语境，表现形式为键值对，例如“Person/123456”、或者多个值的组合“Exam/02^99^2015-05-14”
－ Web应用的上下文全部体现在Url 
－ 可阅读的Url

## 业务唯一标识 BusinessIdentifier

### 来源于业务，贯穿于系统的始终 (取代 GUID和DBID) 
- 用户容易理解，容易识别
- 有利于系统扩展性
- 分布系统的根基
- 系统性能终极解决之道
- 永远不用Guid
- DBId是技术层面，对业务来说应该是透明不可见的
- DBId应用于聚合内部对象之间的联系，特别是在ORM的帮助下，表现为对象之间的引用

### 应用于聚合的根
和DDD聚合根的概念非常吻合
聚合根是系统功能的起点，这个起点落实在业务标识

### 业务标识的结构设计
#### 业务标识本身是值对象 （Value Object） 
- Immutable Object (恒值对象)
- C# struct 实现（技术上的契合度，不一定要用struct来实现）
- 对string的封装，看作强类型的string (用FullCode表示)
	-	FullCode为 “001” 的老师(TeacherIdentifier)和FullCode为“001”学生(StudentIdentifier)是完全不同的 

#### 业务标识的组合
- 业务的复杂性，业务标识不总是单一的
- 业务标识可以是其他业务标识的组合
- 组合业务标识与关系类有关联，但有不完全相同
- 这个组合可以是多层（递归）
- 组合的递归似乎让业务标识变得很复杂，但是Value object和Immutable简化了设计
- Value Object定义的FullCode把标识平面化
- Immutable把标识逻辑和运行流程简化 
 

## 使用
BusinessIdentifier定义：



- 用Composite标记复合Identifier
- 用Component标记组件字段
- 每个Identifier定义都需要加上CodeName标记，用于标识名称

----------

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