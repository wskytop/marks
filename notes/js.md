##### javascript改变数组自身的方法（七个）:

> pop()，push()，shift()，unshift()，splice()，sort()，reverse()

当arr为基本数据类型时，map方法才不会改变原始数组，arr为引用类型时，还是会改变原数组



##### JavaScript 创建或填充任意长度数组：

```javascript
const data = '' // 填充的内容
const len = 2 // 创建的数组长度
const arr = new Array(len).fill(data)
```



##### 字符串数组转化为数字数组：

```javascript
var a = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
a.map(Number);  //结果：[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

##### 



##### 函数防抖（debounce）

------

解释：当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。
 案例：持续触发scroll事件时，并不立即执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发一次handle函数

```javascript
function debounce(fn, wait) {
  let timeout
  return function() {
    clearTimeout(timeout)     
    timeout = setTimeout(fn, wait);
  }
}
function handle() {   
  console.log(Math.random())
}
window.addEventListener('scroll', debounce(handle, 1000))

```

##### 函数节流（throttle）

------

解释：当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。
案例：持续触发scroll事件时，并不立即执行handle函数，每隔1000毫秒才会执行一次handle函数。

```
function throttle(fn, delay) { 
  var prev = 0        
  return function() {               
    var now = Date.now()
    var args = arguments
    if (now - prev > delay) {                   
      fn.apply(this,args)                
      prev = now          
    }         
  }       
}       
function handle() {           
  console.log(Math.random())      
}
window.addEventListener('scroll', throttle(handle, 1000))

```

> 防抖和节流都可以用于 mousemove、scroll、resize、input等事件，他们的区别在于防抖只会在连续的事件周期结束时执行一次，而节流会在事件周期内按间隔时间有规律的执行多次。



