---
title: js手撕代码
date: 2022-02-15 17:20:00
tags: js
cover_picture:
---
#### 数组的扁平化

------

1. ##### 全部展开

   ```javascript
   function flatten(arr) {
       return arr.reduce((result, item) => {
           return result.concat(Array.isArray(item) ? flatten(item) : item)
       }, [])
   }
   ```

2. ##### 展开n层

   ```javascript
   function myFlat(arr, num = 1) {
       return num > 0 ? arr.reduce((res, item) => {
           return res.concat(Array.isArray(item) ? myFlat(item, num - 1) : item)
       }, []) : arr
   }
   ```

#### new的实现

------

首先我们得知道new的原理：

- 创建一个空对象
- 继承构造函数的原型
- this指向该对象，并调用构造函数
- 返回对象

下面是代码实现:

```javascript
function myNew(fn,...args){
	const obj = {}
	obj.__proto__ = fn.prototype
	fn.apply(obj,args)
	return obj
}
```

#### instanceOf的实现：

------

```javascript
function myInstanceOf(father, child) {
    if (typeof(child) !== 'object'  || !child) 
        return false;
    const fp = father.prototype
    let cp = child.__proto__
    while (cp) {
        if (cp === fp) 
            return true
        cp = cp.__proto__
    }
    return false
}
```

#### 函数柯里化：

------

##### 什么是柯里化（curry）:

------

柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

这段解释看着还是挺懵逼的，不如举个栗子：

```
// 普通的add函数
function add(x, y) {
    return x + y
}
// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}
add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

##### 柯里化的原理：

------

1. 参数复用
2. 提前确认
3. 延迟运行

#### 数组去重：

------

##### 普通数组去重：

```
let arr = [1, 1, 2, 4, 5, 6, 3, 4, 3]
console.log([...new Set(arr)]);
```

##### 对象数组去重：

```
function quchong(arr,name ){
    const res = new Map()
    return arr.filter(item => !res.has(item[name]) && res.set(item[name],1))
}
```

#### 浅拷贝与深拷贝：

------

浅拷贝：浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**

深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**

##### 浅拷贝的实现：

------

1.Object.assign()

Object.assign() 方法可以把任意多个的源对象自身的**可枚举属性**拷贝给目标对象，然后返回目标对象。

```
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

```

2.展开运算符...

展开运算符是一个 es6 / es2015特性，它提供了一种非常方便的方式来执行浅拷贝，这与 Object.assign ()的功能相同

```
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}
obj1.address.x = 200;
obj1.name = 'wade'
console.log('obj2',obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }
```

3.手写浅拷贝：

```
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        // 忽略掉那些从原型链上继承到的属性
    	if (target.hasOwnProperty(key)){
        	cloneTarget[key] = target[key];
    	}
    }
    return cloneTarget;
};
```

##### 深拷贝的实现：

------

1.JSON.parse(JSON.stringify())

```
let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
```

这也是利用JSON.stringify将对象转成JSON字符串，再用JSON.parse把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

这种方法虽然可以实现数组或对象深拷贝,但**不能处理函数和正则**，因为这两者基于JSON.stringify和JSON.parse处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）了

2.手写深拷贝

```
function deepClone(obj) {
      if (!obj || typeof obj !== "object") return;
      let newObj = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
        }
      }
      return newObj;
}
```

