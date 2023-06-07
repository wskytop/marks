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
