代码中a[i]表示输入的数组

# 解法1

```

// 双重循环查找重复数据
// 优点: 简单粗暴, 逻辑简单, 代码不复杂
// 缺点: 时间复杂度过高, 另, 只能计算数组可存储范围内的
// 如N为2^64, 此法不可行

for(int i = 0; i < n; i ++)
	for(int j = i + 1; j < n; j ++)
		if(a[i] == a[j])
			return a[i];

```

# 解法2

```cpp

// 利用map查重, 优化空间
// 优点: 利用map, 节省数组开销并优化一定时间, 需了解STL相关基础
// 缺点: 同解法1, 当数据量过大, 内存开销过大(甚至大过解法1)

map <int, int> M;
for(int i = 0; i < N; i ++)
{
	if(M.find(a[i]) == M.end())
		M[a[i]] = 1;
	else 
		return a[i];
}

```

# 解法3

```cpp

// 利用异或(^)运算符的特性, 优化时间, 空间
// 优点: 可以处理大量数据情况, 只需在读入数据时直接计算两个sum即可, 无需存储
// 空间开销极大减少, 需对异或运算有一定的理解
// 缺点: 只能处理非零整数, 一旦出现零, 将无法识别(0^x = x)

int sum_of_range = 0;
int sum_of_all = 0;

for(int i = 1; i < N; i ++)
	sum_of_range ^= i

for(int i = 0; i < N; i ++)
	sum_of_all ^= a[i];

return sum_of_all ^ sum_of_range;

```