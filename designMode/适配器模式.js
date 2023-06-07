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
