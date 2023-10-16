#### 1.基础类型

```
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```

> - 默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给其他类型
> - 虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。

#### 2.复杂类型

##### 联合类型

> 但对于一个变量的类型可能是几种类型的时候我们可以使用 `any` ，但是 `any` 的范围是不是有点大了，不到**万不得已**不使用，如果知道是其中的哪几种类型的话，我们就可以使用 **联合类型** 用 `|` 分隔

##### Array

对数组类型的定义有两种方式：

```tsx
let arr:string[] = ["1","2"];
let arr2:Array<string> = ["1","2"]；
```

定义联合类型数组:

```tsx
let arr:(number | string)[];
let arr:Array<string|number>;
```

##### 函数

###### 函数声明

```tsx
function sum(x: number, y: number): number {
    return x + y;
}
```

###### 函数表达式

```tsx
let mySum = (x: number, y: number): number => {
    return x + y;
};
```

###### 可选参数

```tsx
function fun(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = fun('Tom', 'Cat');
let tom = fun('Tom');
```

`注意点：可选参数后面不允许再出现必需参数`

##### 元组

> 限制`数组元素的个数和类型`

```tsx
let x: [string, number]; // 类型必须匹配且个数必须为2

x = ['hello', 10]; // OK 
x = ['hello', 10,10]; // Error 
x = [10, 'hello']; // Error
```

###### 可选元素

> 可以通过 `?` 号来声明元组类型的可选元素

举个栗子，在三维坐标轴中，一个坐标点可以使用 `(x, y, z)` 的形式来表示，对于二维坐标轴来说，坐标点可以使用 `(x, y)` 的形式来表示，而对于一维坐标轴来说，只要使用 `(x)` 的形式来表示即可。

```tsx
type Point = [number, number?, number?];

const x: Point = [10]; // 一维坐标点
const xy: Point = [10, 20]; // 二维坐标点
const xyz: Point = [10, 20, 10]; // 三维坐标点

console.log(x.length); // 1
console.log(xy.length); // 2
console.log(xyz.length); // 3
```

#### 3.类型别名

> 类型别名用来给一个类型起个新名字。类型别名常用于联合类型。

```tsx
type Message = string | string[];
```

#### 4.接口

> 它能很方便的帮我们定义 `Ojbect` 类型，它是非常的灵活可以描述对象的各种类型

```tsx
interface Person {
  readonly name: string;
  age?: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

`定义的变量比接口少一些和多一些属性都是不允许的`

###### 可选属性

> 在 `interface` 属性中添加 `？`表示该属性可以**省略**

```tsx
let tom: Person = {
    name: 'Tom',
};
```

###### 只读属性

> `readonly` 表示该属性在定义完后就不能修改

###### 任意属性

> 有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

```tsx
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

`注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集`

```tsx
interface Person {
    name: string;
    age?: number; // 这里真实的类型应该为：number | undefined
    [propName: string]: string | number | undefined;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

#### 5.绕开额外属性检查的方式

##### 鸭式辨型法

> 所谓的**鸭式辨型法**就是`像鸭子一样走路并且嘎嘎叫的就叫鸭子`，即具有鸭子特征的认为它就是鸭子，也就是通过制定规则来判定对象是否实现这个接口。

```tsx
interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };

printLabel(myObj); // OK
printLabel({ size: 10, label: "Size 10 Object" }); // Error
```

上面代码，在参数里写对象就相当于是直接给`labeledObj`赋值，这个对象有严格的类型定义，所以不能多参或少参。而当你在外面将该对象用另一个变量`myObj`接收，`myObj`不会经过额外属性检查，但会根据类型推论为`let myObj: { size: number; label: string } = { size: 10, label: "Size 10 Object" };`，然后将这个`myObj`再赋值给`labeledObj`，此时根据类型的兼容性，两种类型对象，参照**鸭式辨型法**，因为都具有`label`属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。

##### 类型断言(as)

> 类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。

```tsx
interface Props { 
  name: string; 
  age: number; 
  money?: number;
}

let p: Props = {
  name: "兔神",
  age: 25,
  money: -100000,
  girl: false
} as Props; // OK
```

##### 索引签名

#### 6.枚举（enum）

> 常量是在项目中经常使用，虽然 `const` 可以声明常量，但是有的常量取值是在一个范围里的，这里我们就需要使用 `enum` 来进行处理

##### 数字枚举

```tsx
enum Week {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Staurday,
    Sunday
}
console.log(Week.Monday,Week[0]) // 1  Monday
```

`可以修改枚举中的初始值,修改之后以此增加`

```tsx
enum Week {
    Monday = 4,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Staurday,
    Sunday
}
console.log(Week.Monday,Week.Tuesday) // 4 5
```

##### 字符串枚举

```tsx
enum Week {
    Monday = '周一',
    Tuesday = '周二',
    Wednesday = '周三',
    Thursday = '周四',
    Friday = '周五',
    Staurday = '周六',
    Sunday= '周日'
}
```

##### 常量枚举

> 在 `enum` 前面添加一个 `const` 即可，它提高了性能

#### 7.泛型

> 泛型就像一个占位符一个变量，在使用的时候我们可以将定义好的类型像参数一样传入，原封不动的输出