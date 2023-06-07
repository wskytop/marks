#### 单例模式

单例模式是一种只允许创建一个实例的模式。在前端开发中，常用于创建全局唯一的对象，例如全局的状态管理器、日志记录器等。单例模式可以保证全局只有一个实例，避免了重复创建和资源浪费的问题。

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

以上代码是单例模式的一个示例，通过该模式可以保证全局只有一个实例，避免了重复创建和资源浪费的问题。在这个示例中，`Singleton` 类只能创建一个实例，如果多次创建，返回的都是同一个实例，因此 `instance1` 和 `instance2` 的值是相等的。单例模式常用于创建全局唯一的对象，例如全局的状态管理器、日志记录器等。

#### 工厂模式

工厂模式是一种根据参数的不同创建不同对象的模式，在前端开发中，常用于创建不同类型的组件、插件等。工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性

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

以上代码中，`Cat`、`Dog`类表示要创建的产品，`Productor`类实现了工厂模式，通过 `createAnimal`方法创建产品实例。在使用时，可以通过工厂类创建产品实例，而不需要直接调用产品类的构造函数。通过工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性。

#### 观察者模式

观察者模式是一种对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会自动更新。在前端开发中，常用于实现事件监听和消息订阅等。观察者模式可以降低对象间的耦合度，提高代码的可读性和可复用性。

```javascript
// 观察者
class Subject {
  constructor() {
    this.observers = [];
  }
  // 添加
  addObserver(observer) {
    this.observers.push(observer);
  }
  // 删除
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) this.observers.splice(index, 1);
  }
  // 通知
  notify(data) {
    this.observers.forEach((item) => item.update(data));
  }
}

class Observer {
  update(data) {
    console.log('我被观察了 ' + data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify('你好黑暗森林'); 
//我被观察了 你好黑暗森林 
//我被观察了 你好黑暗森林
```

以上代码中，`Subject` 类实现了观察者模式，通过 `addObserver` 方法添加观察者，通过 `notify` 方法通知观察者，触发其 `update` 方法。`Observer` 类实现了具体的观察者，通过 `update` 方法接收数据并进行处理。

#### 装饰器模式

装饰器模式是一种在不改变对象自身的基础上，动态地给对象增加新的功能的模式。在前端开发中，常用于实现组件的复用和功能的增强等。装饰器模式可以避免类的继承带来的复杂性和耦合度，提高代码的灵活性和可维护性。

```javascript
// 抽象组件类
class Component {
  action() {
    throw new Error('请重写抽象类的方法');
  }
}

// 具体组件类
class ConcreteComponent extends Component {
  action() {
    console.log('我是原初组件');
  }
}

// 装饰器抽象类
class Decorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }
  action() {
    this.component.action();
  }
}

// 装饰器A类
class DecoratorA extends Decorator {
  action() {
    super.action();
    console.log('我是装饰器A');
  }
}

// 装饰器B类
class DecoratorB extends Decorator {
  action() {
    super.action();
    console.log('我是装饰器B');
  }
}

// 被装饰的实例
const component = new ConcreteComponent();

const decorator1 = new DecoratorA(component);
const decorator2 = new DecoratorB(component);
decorator1.action(); // 我是原初组件 我是装饰器A
decorator2.action(); // 我是原初组件 我是装饰器B

```

在上述代码中， `Component`是 抽象组件类，`ConcreteComponent`是具体组件类。创建两个装饰器类 `ConcreteDecoratorA` 和 `ConcreteDecoratorB`，它们都继承自 `Decorator` 类，并且可以添加新的行为到被装饰的对象上。最后，实例化 `ConcreteComponent` 类,将其封装在 `DecoratorA` 和 `DecoratorB` 类中，最终组成一个具有多个操作的对象。

#### 代理模式

代理模式是一种通过一个代理对象控制对目标对象的访问的模式。在前端开发中，常用于实现图片懒加载、数据缓存等。代理模式可以保护目标对象，控制其访问和使用，提高代码的安全性和可读性。

```javascript
// 原始对象
const target = {
  methord() {
    console.log('target methord');
  },
};
// 代理对象
const proxy = new Proxy(target, {
  get(object, name, val) {
    console.log('proxy methord');
    return object[name];
  },
});

proxy.methord();
// proxy methord
// target methord
```

以上代码中，`target` 是原始对象，`proxy` 对象实现了代理功能，通过 `new Proxy()` 创建代理对象。代理对象通过 `get` 方法拦截对目标对象方法的访问。通过代理模式可以控制对目标对象的访问和使用，实现数据缓存、权限控制等功能，提高代码的可读性和可维护性。

#### 适配器模式

适配器模式是一种将不同接口转换成统一接口的模式。在前端开发中，常用于实现不同浏览器的兼容、不同数据格式的转换等。适配器模式可以降低系统间的耦合度，提高代码的复用性和可维护性。

```javascript
// 目标类
class Target {
  request() {
    console.log('目标类');
  }
}

// 需要适配的类
class Adaptee {
  specificRequest() {
    console.log('适配类');
  }
}

// 适配器
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }
  request() {
    if (this.adaptee) this.adaptee.specificRequest();
    else super.request();
  }
}

const adapter1 = new Adapter();
const adapter2 = new Adapter(new Adaptee());
adapter1.request(); //目标类
adapter2.request(); // 适配类
```

在上述代码中，我们有一个目标接口 `Target` 和一个需要适配的类 `Adaptee`。我们通过创建一个适配器类 `Adapter` 将 `Adaptee` 转换为 `Target`，并使用适配器调用 `request()` 方法，从而实现 `Adaptee` 的功能。

#### 发布订阅模式

在发布订阅模式中，事件的发生者（发布者）不需要直接调用事件的处理者（订阅者），而是通过一个「发布-订阅中心」来管理事件的发生和处理。具体来说，发布者将事件发布到「发布-订阅中心」中，订阅者可以向「发布-订阅中心」注册事件处理函数，当事件发生时，「发布-订阅中心」会将事件通知给所有注册了该事件处理函数的订阅者，订阅者就可以处理该事件了。

发布订阅模式的核心思想是解耦事件的发生和事件的处理，使得事件发生者和事件处理者之间不直接依赖，从而提高程序的灵活性和可维护性。使用发布订阅模式可以将事件的发生和处理分开，使得不同的订阅者可以独立处理事件，同时也可以动态地添加或删除订阅者，满足不同的业务需求。

##### 与观察者模式的区别

![](https://image.dahuangf.com/hornet_erp/3114cf0916f4ef533cc370c5e7bb099--1686122407981nv0lildqw3q.jpg)

##### 原理

JavaScript 发布订阅模式的基本原理是：有一个主题对象，该对象维护一个订阅者列表，当主题对象发生变化时，主题对象会遍历订阅者列表，调用每个订阅者的更新方法，通知订阅者进行相应的处理。

##### 代码实现

```javascript
// 发布订阅中心
class Observer {
  constructor() {
    this.message = {}; // 消息列表
  }

  /**
   * $emit 触发消息队列里的内容
   * @param {*} type 事件名 (事件类型)
   */
  $emit(type) {
    if (!this.message[type]) return;
    for (const item of this.message[type]) {
      item();
    }
  }

  /**
   * `$on` 向消息队列添加内容
   * @param {*} type 事件名 (事件类型)
   * @param {*} callback 回调函数
   */
  $on(type, callback) {
    // 判断消息列表有无该事件类型
    if (!this.message[type]) {
      this.message[type] = [];
    }
    this.message[type].push(callback);
  }

  /**
   * $off 删除消息队列里的内容
   * @param {*} type 事件名 (事件类型)
   * @param {*} callback 回调函数
   */
  $off(type, callback) {
    if (!this.message[type]) return;
    if (!callback) {
      delete this.message[type];
      return;
    } else {
      const index = this.message[type].indexOf(callback);
      if (index > -1) this.message[type].splice(index, 1);
    }
  }
}

// 创建实例
const observer = new Observer();
observer.$on('buy', () => {
  console.log('我是buy的回调函数');
});
observer.$on('run', () => {
  console.log('我是run的回调函数');
});
observer.$on('buy', () => {
  console.log('我是buy的回调函数2');
});
observer.$emit('buy'); //我是buy的回调函数 我是buy的回调函数2
observer.$emit('run'); //我是run的回调函数
observer.$off('buy');
observer.$emit('buy'); // 无返回
```

