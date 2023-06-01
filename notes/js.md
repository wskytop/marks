javascript改变数组自身的方法（七个）:

> pop()，push()，shift()，unshift()，splice()，sort()，reverse()

当arr为基本数据类型时，map方法才不会改变原始数组，arr为引用类型时，还是会改变原数组



JavaScript 创建或填充任意长度数组：

```javascript
const data = '' // 填充的内容
const len = 2 // 创建的数组长度
const arr = new Array(len).fill(data)
```



字符串数组转化为数字数组

```javascript
var a = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
a.map(Number);  //结果：[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

