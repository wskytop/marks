#### useState

> 使函数组件像类组件一样拥有 state，函数组件通过 useState 可以让组件重新渲染，更新视图。

`const [ ①state , ②dispatch ] = useState(③initData)`

① state，目的提供给 UI ，作为渲染视图的数据源。

② dispatchAction 改变 state 的函数，可以理解为推动函数组件渲染的渲染函数。

③ initData 有两种情况，第一种情况是非函数，将作为 state 初始化的值。 第二种情况是函数，函数的返回值作为 useState 初始化的值。

```javascript
function Index(){
    const [ number, setNumber ] = React.useState(0)
    const handleClick = () => setInterval(()=>{
        // 此时 number 一直都是 0
        setNumber(number + 1 ) 
    },1000)
    return <button onClick={ handleClick } > 点击 { number }</button>
}
```

#### useEffect

> 可以在函数组件中执行副作用操作，可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合
>
> useEffect 第一个参数 callback, 返回的 destory函数 ， destory 函数作为下一次callback执行之前调用，用于清除上一次 callback 产生的副作用。
>
> 第二个参数作为依赖项，是一个数组，可以有多个依赖项，依赖项改变，执行上一次callback 返回的 destory函数 ，和执行新的 effect 第一个参数 callback 。

```react
import React, { useEffect, useState } from 'react';
function FriendStatus(props) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // 无需清除副作用
 
    // 清除副作用的函数
    return function cleanup() {
    // do something
    };
  },[isOpen]);
  return (<div>{}</div>);
}
```

#### useRef

> 使函数组件可以获取ref

```react
import React, { useState, useRef }from 'react'
const mytext = useRef(null)
<input type='text' ref={mytext}/>
```

#### useMemo

> useMemo 可以在函数组件 render 上下文中同步执行一个函数逻辑，这个函数的返回值可以作为一个新的状态缓存起来。

```js
const cacheSomething = useMemo(create,deps)
```

① create：第一个参数为一个函数，函数的返回值作为缓存值，如上 demo 中把 Children 对应的 element 对象，缓存起来。

② deps： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，如果有改变重新执行 create ，得到新的缓存值。

③ cacheSomething：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，返回的重新执行 create 产生的值，否则取上一次缓存值。