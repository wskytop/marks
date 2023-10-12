#### vue

###### 动态组件：

```vue
<component :is='组件名'></component>
```



#### vue3

###### *defineProps*:

​		defineProps在<script setup>中自动可用，无需导入

```vue
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
</template>
<script setup>
  // defineProps在<script setup>中自动可用，无需导入
  // 声明props(自定义值)
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  }) 
  // 在script中不可省略props
  console.log(props.name)
</script>
```

###### *emit*子传父

```vue
<script setup>
  // defineEmits和defineProps在<script setup>中自动可用，无需导入
  // 声明事件
  const emit = defineEmits(['updateName'])
  const changeName = () => {
    // 执行
    emit('updateName', 'Tom')
  }
</script>
```

###### *defineExpose*

​	在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的，但在 <script setup> 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

​	如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。

```vue
<template>
  <span>{{state.name}}</span>
</template>
<script setup>
  import { reactive} from 'vue'
  // 声明state
  const state = reactive({
    name: 'Jerry'
  }) 
  // 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
  defineExpose({
    state
  })
</script>
```

###### *v-model*

​	vue3的v-model是v-model:modelValue的简写，支持绑定多个v-model，例如v-model:name

> 父组件

```vue
<template>
  // v-model:modelValue简写为v-model
  // 可绑定多个v-model
  <child
    v-model="state.name"
    v-model:age="state.age"
  />
</template>
<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'
  const state = reactive({
    name: 'Jerry',
    age: 20
  })
</script>
```

> 子组件

```vue
<template>
  <span>我叫{{ modelValue }}，今年{{ age }}岁</span>
</template>
<script setup>
  defineProps({
    modelValue: String,
    age: Number
  })
</script>
```

原理：

```vue
<!-- 父组件 -->
<template>
	<my-component v-model="msg"></my-component>
	<!-- 等同于 -->
	<my-component :modelValue="msg" @update:modelValue="msg = $event"></my-component>
</template>
```

子组件的值改变了，通知父组件去修改改值

###### 封装子组件

> useModel.js

```javascript
export function useModel(props,propName,emit){
    return computed({
        get(){
            new Proxy(props[propName],{
                set(obj,name,val){
                    emit('update:' + propName,{
                        ...obj,
                        [name]: val
                    })
                    return true
                }
        	})
        },
        set(val){
        emit('update:' + propName,val)
		}
    })
}
```

> 子组件中使用

```javascript
const emit = defineEmits(['update:modelValue'])
const model = useModel(props,'modelValue',emit)
```



###### 路由导航守卫

```vue
<script setup>
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
  // 添加一个导航守卫，在当前组件将要离开时触发。
  onBeforeRouteLeave((to, from, next) => {
    next()
  })
  // 添加一个导航守卫，在当前组件更新时触发。
  // 在当前路由改变，但是该组件被复用时调用。
  onBeforeRouteUpdate((to, from, next) => {
    next()
  })
</script>
```

###### 原型绑定与组件内使用

> main.js

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 获取原型
const prototype = app.config.globalProperties
// 绑定参数
prototype.name = 'Jerry'
```

> 组件内使用

```vue
<script setup>
  import { getCurrentInstance } from 'vue'
  // 获取原型
  const { proxy } = getCurrentInstance()
  // 输出
  console.log(proxy.name)
</script>
```

###### v-bind（）实现css变量注入

```vue
<template>
  <span>Jerry</span>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  // prop接收样式
  const props = defineProps({
    border: {
      type: String,
      default: '1px solid yellow'
    }
  })
  // 常量声明样式
  const background = 'red' 
  // 响应式数据声明样式
  const color = ref('blue')
  const style = reactive({
    opacity: '0.8'
  })
</script>
<style lang="scss" scoped>
  span {
    // 使用常量声明的样式
    background: v-bind(background);
    // 使用响应式数据声明的样式
    color: v-bind(color);
    opacity: v-bind('style.opacity');
    // 使用prop接收的样式
    border: v-bind('props.border');
  }
</style>
```

###### provide和inject

> 父组件

```vue
<template>
  <child/>
</template>
<script setup>
  import { ref, provide } from 'vue'
  import child from './child.vue'
  let name = ref('Jerry')
  // 声明provide
  provide('provideState', {
    name,
  })
</script>
```

> 子组件

```vue
<script setup>
  import { inject } from 'vue'
  // 注入，第二个参数为默认值
  const provideState = inject('provideState', {})
</script>
```

###### 对await的支持

vue3不必再配合async就可以直接在<script setup>中直接使用await，组件的setup会自动变成async setup



###### v-if显示错位问题

若v-if切换的是逻辑复杂的控件时，切换时不重新渲染极易出问题
需要给要重新渲染的控件添加一个key属性，来唯一标识该控件，被key标识后会重新渲染。实例如下

```vue
<template v-if="type=== 'username'" key="1"> 
	<label>用户名</label> 
	<input placeholder="输入用户名"> 
</template> 
<template v-else key="2"> 
	<label>邮箱</label> 
	<input placeholder="输入邮箱"> 
</template>
```

###### vue3获取this

而 Vue3 组合式 API 中没有 this，如果想要类似的用法，有两种，一是获取当前组件实例，二是获取全局实例

```vue
<script setup>
import { getCurrentInstance } from 'vue'

// proxy 就是当前组件实例，可以理解为组件级别的 this，没有全局的、路由、状态管理之类的
const { proxy, appContext } = getCurrentInstance()

// 这个 global 就是全局实例
const global = appContext.config.globalProperties
</script>
```

###### vue3全局注册

Vue2 中我们要往全局上挂载东西通常就是如下，然后在所有组件里都可以通过 `this.xxx` 获取到了

```vue
Vue.prototype.xxx = xxx
```

而 Vue3 中不能这么写了，换成了一个能被所有组件访问到的全局对象，就是上面说的全局实例的那个对象，比如在 `main.js` 中做全局注册

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 添加全局属性
app.config.globalProperties.name = '33'
```

在其他组件中调用

```vue
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

const global = appContext.config.globalProperties
console.log(global.name) // 沐华
</script>
```

