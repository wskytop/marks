[react hooks](https://juejin.cn/post/7118937685653192735?searchId=2024052714495236CCD38FD097769E1053)

### 数据更新驱动

#### useState

---

使函数组件像类组件一样拥有 state，函数组件通过 useState 可以让组件重新渲染，更新视图。

```js
const [ ①state , ②dispatch ] = useState(③initData)
```

① state，目的提供给 UI ，作为渲染视图的数据源。

② dispatch 改变 state 的函数，可以理解为推动函数组件渲染的渲染函数。

③ initData 有两种情况，第一种情况是非函数，将作为 state 初始化的值。 第二种情况是函数，函数的返回值作为 useState 初始化的值。

```javascript
function Index() {
  const [number, setNumber] = React.useState(0);
  const handleClick = () =>
    setInterval(() => {
      // 此时 number 一直都是 0
      setNumber(number + 1);
    }, 1000);
  return <button onClick={handleClick}> 点击 {number}</button>;
}
```

##### 合并关联的 state

如果 state 变量是一个对象时，不能只更新其中的一个字段 而不显式复制其他字段。例如，initData 为{ x: 100，y: 50 }，不能写成 `setPosition({ x: 100 })`，因为它根本就没有 `y` 属性! 相反，如果想要仅设置 `x`，则可执行 `setPosition({ ...position, x: 100 })`，或将它们分成两个 state 变量，并执行 `setX(100)`。

##### 不要在 state 中镜像 props

```js
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

这里，一个 `color` state 变量被初始化为 `messageColor` 的 prop 值。这段代码的问题在于，**如果父组件稍后传递不同的 `messageColor` 值（例如，将其从 `'blue'` 更改为 `'red'`），则 `color`** state 变量**将不会更新！** state 仅在第一次渲染期间初始化。

这就是为什么在 state 变量中，“镜像”一些 prop 属性会导致混淆的原因。相反，你要在代码中直接使用 `messageColor` 属性。如果你想给它起一个更短的名称，请使用常量：

```js
function Message({ messageColor }) {

  const color = messageColor;
```

这种写法就不会与从父组件传递的属性失去同步。

只有当你 **想要** 忽略特定 props 属性的所有更新时，将 props “镜像”到 state 才有意义。按照惯例，prop 名称以 `initial` 或 `default` 开头，以阐明该 prop 的新值将被忽略：

```js
function Message({ initialColor }) {
  // 这个 `color` state 变量用于保存 `initialColor` 的 **初始值**。
  // 对于 `initialColor` 属性的进一步更改将被忽略。
  const [color, setColor] = useState(initialColor);
```

### 执行副作用

#### useEffect

---

可以在函数组件中执行副作用操作，可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合

useEffect 第一个参数 callback, 返回的 destory 函数 ， destory 函数作为下一次 callback 执行之前调用，用于清除上一次 callback 产生的副作用。

第二个参数作为依赖项，是一个数组，可以有多个依赖项，依赖项改变，执行上一次 callback 返回的 destory 函数 ，和执行新的 effect 第一个参数 callback 。

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

### 状态获取与传递

#### useRef

---

使函数组件可以获取 ref

```react
import React, { useState, useRef }from 'react'
const mytext = useRef(null)
<input type='text' ref={mytext}/>
```

#### useImperativeHandle

---

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

子组件向父组件暴露一个自定义的 ref 句柄，暴露出自己的命令式方法，通常配合 forwardRef 使用

在组件顶层通过调用 `useImperativeHandle` 来自定义 ref 暴露出来的句柄：

```tsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... 你的方法 ...
    };
  }, []);
```

#### useContext

---

> ```javascript
> const [state, dispatch] = useReducer(reducer, initialState);
> ```

用于获取从父组件传递过来的值

第一步就是使用 React Context API，在组件外部建立一个 Context。

> ```javascript
> const AppContext = React.createContext({});
> ```

组件封装代码如下。

> ```jsx
> <AppContext.Provider
>   value={{
>     username: 'superawesome',
>   }}
> >
>   <div className='App'>
>     <Navbar />
>   </div>
> </AppContext.Provider>
> ```

上面代码中，`AppContext.Provider`提供了一个 Context 对象，这个对象可以被子组件共享。

Navbar 组件的代码如下。

> ```javascript
> const Navbar = () => {
>   const { username } = useContext(AppContext);
>   return (
>     <div className='navbar'>
>       <p>AwesomeSite</p>
>       <p>{username}</p>
>     </div>
>   );
> };
> ```

上面代码中，`useContext()`钩子函数用来引入 Context 对象，从中获取`username`属性。

### 派生与保存

#### useMemo（计算属性）

---

useMemo 可以在函数组件 render 上下文中同步执行一个函数逻辑，这个函数的返回值可以作为一个新的状态缓存起来。

```js
const cacheSomething = useMemo(create, deps);
```

① create：第一个参数为一个函数，函数的返回值作为缓存值

② deps： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，如果有改变重新执行 create ，得到新的缓存值。

③ cacheSomething：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，返回的重新执行 create 产生的值，否则取上一次缓存值。

#### useCallback

useMemo 和 useCallback 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于 useMemo 返回的是函数运行的结果，useCallback 返回的是函数。父组件传递一个函数给子组件的时候，由于是无状态组件每一次都会重新生成新的 props 函数，这样就使得每一次传递给子组件的函数都发生了变化，这时候就会触发子组件的更新，这些更新是没有必要的，此时我们就可以通过 usecallback 来处理此函数，然后作为 props 传递给子组件。

```jsx
/* 用react.memo */
const DemoChildren = React.memo((props) => {
  /* 只有初始化的时候打印了 子组件更新 */
  console.log('子组件更新');
  useEffect(() => {
    props.getInfo('子组件');
  }, []);
  return <div>子组件</div>;
});

const DemoUseCallback = ({ id }) => {
  const [number, setNumber] = useState(1);
  /* 此时usecallback的第一参数 (sonName)=>{ console.log(sonName) }
     经过处理赋值给 getInfo */
  const getInfo = useCallback(
    (sonName) => {
      console.log(sonName);
    },
    [id]
  );
  return (
    <div>
      {/* 点击按钮触发父组件更新 ，但是子组件没有更新 */}
      <button onClick={() => setNumber(number + 1)}>增加</button>
      <DemoChildren getInfo={getInfo} />
    </div>
  );
};
```
