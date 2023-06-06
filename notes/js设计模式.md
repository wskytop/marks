##### 单例模式

> 单例模式是一种只允许创建一个实例的模式。在前端开发中，常用于创建全局唯一的对象，例如全局的状态管理器、日志记录器等。单例模式可以保证全局只有一个实例，避免了重复创建和资源浪费的问题。

代码实现

```javascript
// 单例模式示例代码
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this.createInstance();
    }
    return Singleton.instance;
  }
  createInstance() {
    const object = { name: 'example' };
    return object;
  }
}

// 使用示例
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(Singleton.instance, instance1 === instance2); // { name: 'example' } true
```

##### 工厂模式

> 根据参数的不同创建不同的对象，用于批量创建对象