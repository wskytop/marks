---
title: Promise的理解和手撕代码
date: 2021-11-27 
tags: js
cover_picture:
---

### 一、什么是Promise？我们用Promise来解决什么问题?

------

**Promise** 是es6提供的异步编程的一种解决方案：

- 从语法上讲，promise是一个对象，从它可以获取异步操作的消息；
- 从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。

##### Promise 对象的特点:

1、对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：

- `pending`: 初始状态，等待态。
- `fulfilled`: 意味着操作成功完成。
- `rejected`: 意味着操作失败。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

2、一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise` 对象的状态改变，只有两种可能：从 `Pending` 变为 `Resolved` 和从 `Pending` 变为 `Rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（`Event`）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

##### Promise 优缺点

优点：有了 `Promise` 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise` 对象提供统一的接口，使得控制异步操作更加容易。

**支持链式调用，可以解决回调地狱的问题**

- 回调地狱：回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件
- promise可以支持多个并发的请求，获取并发请求中的数据
- 这个promise可以解决异步的问题，本身不能说promise是异步的

缺点：`Promise` 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 二、es6 promise用法大全

------

Promise是一个构造函数，自己身上有all、reject、resolve这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法。

```
let p = new Promise((resolve, reject) => {
    //做一些异步操作
    setTimeout(() => {
        console.log('执行完成');
        resolve('我是成功！！');
    }, 2000);
});
```

Promise的构造函数接收一个参数：函数，并且这个函数需要传入两个参数：

- resolve ：异步操作执行成功后的回调函数
- reject：异步操作执行失败后的回调函数

#### then 链式操作的用法

------

所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的：

```
p.then((data) => {
    console.log(data);
})
.then((data) => {
    console.log(data);
})
.then((data) => {
    console.log(data);
});
```

#### reject的用法 

------

把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调：

```
let p = new Promise((resolve, reject) => {
	//做一些异步操作
    setTimeout(function(){
        //生成1-10的随机数
    	var num = Math.ceil(Math.random()*10); 
    	if(num<=5){
   	 		resolve(num);
		}
        else{
            reject('数字太大了');
         }
   	}, 2000);
});
p.then((data) => {
    console.log('resolved',data);
    },(err) => {
    console.log('rejected',err);
    }
); 

```

then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果:

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16377e1df3ec16ee~tplv-t2oaga2asx-watermark.awebp)或者    ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16377e4fd8619228~tplv-t2oaga2asx-watermark.awebp)

#### catch的用法

------

我们知道Promise对象除了then方法，还有一个catch方法，它是做什么用的呢？其实它和then的第二个参数一样，用来指定reject的回调。用法是这样：

```
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});
```

效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。请看下面的代码：

```
p.then((data) => {
    console.log('resolved',data);
    console.log(somedata); //此处的somedata未定义
})
.catch((err) => {
    console.log('rejected',err);
});
```

在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/1637880bdb32bee3~tplv-t2oaga2asx-watermark.awebp)

也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能

#### all的用法

------

> 谁跑的慢，以谁为准执行回调。all接收一个数组参数，里面的值最终都算返回Promise对象

Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调：

```
let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功  
}, function(){
  // 只要有失败，则失败 
})
```

有了all，你就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据，是不是很酷？*有一个场景是很适合用这个的，一些游戏类的素材比较多的应用，打开网页时，预先加载需要用到的各种资源如图片、flash以及各种静态文件。所有的都加载完后，我们再进行页面的初始化。*

#### race的用法：谁跑的快，以谁为准执行回调

------

race的使用场景：比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作，代码如下

```
 //请求某个图片资源
    function requestImg(){
        var p = new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = function(){
                resolve(img);
            }
            img.src = '图片的路径';
        });
        return p;
    }
    //延时函数，用于给请求计时
    function timeout(){
        var p = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('图片请求超时');
            }, 5000);
        });
        return p;
    }
    Promise.race([requestImg(), timeout()]).then((data) =>{
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });
```

requestImg函数会异步请求一张图片，我把地址写为"图片的路径"，所以肯定是无法成功请求到的。timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息。运行结果如下

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/16376a95ffa3b13c~tplv-t2oaga2asx-watermark.awebp)

### 三、手写一个自己的promise

------

#### 步骤一：实现成功和失败的回调方法

------

要实现上面代码中的功能，也是promise最基本的功能。首先，需要创建一个构造函数promise，创建一个promise类，在使用的时候传入了一个执行器executor，executor会传入两个参数：成功(resolve)和失败(reject)。之前说过，只要成功，就不会失败，只要失败就不会成功。所以，默认状态下，在调用成功时，就返回成功态，调用失败时，返回失败态。代码如下

```
class Promise {
    constructor (executor){
        //默认状态是等待状态
        this.PromiseState = 'pending';
   		this.PromiseResult = null;
        //存放成功的回调
        this.callbacks = [];
        //resolve 函数
   let resolve = (data) => {
     //判断状态
     if (this.PromiseState !== 'pending') return;
     //1. 修改对象的状态 (promiseState)
     this.PromiseState = 'fulfilled'; // resolved
     //2. 设置对象结果值 (promiseResult)
     this.PromiseResult = data;
     //调用成功的回调函数
     setTimeout(() => {
       this.callbacks.forEach(item => {
         item.onResolved(data);
       });
     });
   }
   //reject 函数
   let reject = (reason) => {
     //判断状态
     if (this.PromiseState !== 'pending') return;
     //1. 修改对象的状态 (promiseState)
     this.PromiseState = 'rejected'; // 
     //2. 设置对象结果值 (promiseResult)
     this.PromiseResult = reason;
     //执行失败的回调
     setTimeout(() => {
       this.callbacks.forEach(item => {
         item.onRejected(reason);
       });
     });
   }
        try{//执行时可能会发生异常
            executor(resolve,reject);
        }catch (e){
            reject(e);//promise失败了
        }
      } 
    }
```

#### 步骤二：then方法链式调用

------

then方法是promise的最基本的方法，返回的是两个回调，一个成功的回调，一个失败的回调，实现过程如下

```
then(onResolved, onRejected) {
    const self = this
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }
    if (typeof onResolved !== 'function') {
        onResolved = val => val
    }
    return new Promise((resolve, reject) => {
        function callback(type) {
            try {
                let result = type(self.PromiseResult)
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(result)
                }
            } catch (e) {
                reject(e)
            }
        }
        if (this.PromiseStatue === 'resolved') {
            setTimeout(() => {
                callback(onResolved)
            })
        }
        if (this.PromiseStatue === 'rejected') {
            setTimeout(() => {
                callback(onRejected)
            })
        }
        if (this.PromiseStatue === 'pending') {
            // 保存回调函数
            this.callbacks.push({
                onResolved() {
                    callback(onResolved)
                },
                onRejected() {
                    callback(onRejected)
                }
            })
        }
    })
}
```

> Promise A+规范中规定then方法可以链式调用

在promise中，要实现链式调用返回的结果是返回一个新的promise，第一次then中返回的结果，无论是成功或失败，都将返回到下一次then中的成功态中，但在第一次then中如果抛出异常错误，则将返回到下一次then中的失败态中

#### 步骤三：catch方法

```
//catch 方法
 catch (onRejected) {
   return this.then(undefined, onRejected);
 }
```

最后给大家附上全部源码，供大家仔细品读

```
class Promise {
 //构造方法
 constructor(executor) {
   //添加属性
   this.PromiseState = 'pending';
   this.PromiseResult = null;
   //声明属性
   this.callbacks = [];
   //保存实例对象的 this 的值
   //resolve 函数
   let resolve = (data) => {
     //判断状态
     if (this.PromiseState !== 'pending') return;
     //1. 修改对象的状态 (promiseState)
     this.PromiseState = 'fulfilled'; // resolved
     //2. 设置对象结果值 (promiseResult)
     this.PromiseResult = data;
     //调用成功的回调函数
     setTimeout(() => {
       this.callbacks.forEach(item => {
         item.onResolved(data);
       });
     });
   }
   //reject 函数
   let reject = (data) => {
     //判断状态
     if (this.PromiseState !== 'pending') return;
     //1. 修改对象的状态 (promiseState)
     this.PromiseState = 'rejected'; // 
     //2. 设置对象结果值 (promiseResult)
     this.PromiseResult = data;
     //执行失败的回调
     setTimeout(() => {
       this.callbacks.forEach(item => {
         item.onRejected(data);
       });
     });
   }
   try {
     //同步调用『执行器函数』
     executor(resolve, reject);
   } catch (e) {
     //修改 promise 对象状态为『失败』
     reject(e);
   }
 }

 //then 方法封装
 then(onResolved, onRejected) {
   //判断回调函数参数
   if (typeof onRejected !== 'function') {
     onRejected = reason => {
       throw reason;
     }
   }
   if (typeof onResolved !== 'function') {
     onResolved = value => value;
     //value => { return value};
   }
   return new Promise((resolve, reject) => {
     //封装函数
     let callback = (type) => {
       try {
         //获取回调函数的执行结果
         let result = type(this.PromiseResult);
         //判断
         if (result instanceof Promise) {
           //如果是 Promise 类型的对象
           result.then(v => {
             resolve(v);
           }, r => {
             reject(r);
           })
         } else {
           //结果的对象状态为『成功』
           resolve(result);
         }
       } catch (e) {
         reject(e);
       }
     }
     //调用回调函数  PromiseState
     if (this.PromiseState === 'fulfilled') {
       setTimeout(() => {
         callback(onResolved);
       });
     }
     if (this.PromiseState === 'rejected') {
       setTimeout(() => {
         callback(onRejected);
       });
     }
     //判断 pending 状态
     if (this.PromiseState === 'pending') {
       //保存回调函数
       this.callbacks.push({
         onResolved: function () {
           callback(onResolved);
         },
         onRejected: function () {
           callback(onRejected);
         }
       });
     }
   })
 }

 //catch 方法
 catch (onRejected) {
   return this.then(undefined, onRejected);
 }

 //添加 resolve 方法
 static resolve(value) {
   //返回promise对象
   return new Promise((resolve, reject) => {
     if (value instanceof Promise) {
       value.then(v => {
         resolve(v);
       }, r => {
         reject(r);
       })
     } else {
       //状态设置为成功
       resolve(value);
     }
   });
 }

 //添加 reject 方法
 static reject(reason) {
   return new Promise((resolve, reject) => {
     reject(reason);
   });
 }

 //添加 all 方法
 static all(promises) {
   //返回结果为promise对象
   return new Promise((resolve, reject) => {
     //声明变量
     let count = 0;
     let arr = [];
     //遍历
     for (let i = 0; i < promises.length; i++) {
       //
       promises[i].then(v => {
         //得知对象的状态是成功
         //每个promise对象 都成功
         count++;
         //将当前promise对象成功的结果 存入到数组中
         arr[i] = v;
         //判断
         if (count === promises.length) {
           //修改状态
           resolve(arr);
         }
       }, r => {
         reject(r);
       });
     }
   });
 }

 //添加 race 方法
 static race(promises) {
   return new Promise((resolve, reject) => {
     for (let i = 0; i < promises.length; i++) {
       promises[i].then(v => {
         //修改返回对象的状态为 『成功』
         resolve(v);
       }, r => {
         //修改返回对象的状态为 『失败』
         reject(r);
       })
     }
   });
 }
}

```



