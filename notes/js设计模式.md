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

> 工厂模式是一种根据参数的不同创建不同对象的模式，在前端开发中，常用于创建不同类型的组件、插件等。工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性

```javascript

// 模拟抽象类
class Animals {
  speak() {
    throw new Error('请重写speak方法');
  }
}

class Cat extends Animals {
  speak() {
    return '喵喵喵~';
  }
}

class Dog extends Animals {
  speak() {
    return '汪汪汪~';
  }
}

// 工厂类
class Productor {
  createAnimal(name) {
    switch (name) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        break;
    }
  }
}

const animal = new Productor();
// 使用工厂创建对应对象
const dog = animal.createAnimal('dog');
const cat = animal.createAnimal('cat');
console.log(dog.speak(), cat.speak()); // 汪汪汪~ 喵喵喵~

```

