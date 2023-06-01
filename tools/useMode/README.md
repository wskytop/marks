说明

> 用于封装子组件，改变props自动更新父组件内容

> 子组件中使用

```javascript
const emit = defineEmits(['update:modelValue'])
const model = useModel(props,'modelValue',emit)
```

