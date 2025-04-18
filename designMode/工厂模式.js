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
  // 静态方法
  static createAnimal(name) {
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

const dog = Productor.createAnimal('dog');
const cat = Productor.createAnimal('cat');
console.log(dog.speak(), cat.speak()); // 汪汪汪~ 喵喵喵~
