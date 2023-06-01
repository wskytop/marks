---
title: 函数防抖和节流
date: 2021-11-25 19:39:00
tags: js
categories: notes 
cover_picture:
---



### 函数防抖（debounce）

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

### 函数节流（throttle）

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

