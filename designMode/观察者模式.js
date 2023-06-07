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
    console.log('我被观察了' + data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify('你好黑暗森林'); //我被观察了你好黑暗森林 我被观察了你好黑暗森林
