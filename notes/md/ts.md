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
    name?: 'Tom',
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

有些时候，函数返回值的类型与参数类型是相关的。

```javascript
function getFirst(arr) {
  return arr[0];
}
```

上面示例中，函数`getFirst()`总是返回参数数组的第一个成员。参数数组是什么类型，返回值就是什么类型。

这个函数的类型声明只能写成下面这样。

```typescript
function f(arr: any[]): any {
  return arr[0];
}
```

上面的类型声明，就反映不出参数与返回值之间的类型关系。

为了解决这个问题，TypeScript 就引入了“泛型”（generics）。泛型的特点就是带有“类型参数”（type parameter）。

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```

上面示例中，函数`getFirst()`的函数名后面尖括号的部分`<T>`，就是类型参数，参数要放在一对尖括号（`<>`）里面。本例只有一个类型参数`T`，可以将其理解为类型声明需要的变量，需要在调用时传入具体的参数类型。

上例的函数`getFirst()`的参数类型是`T[]`，返回值类型是`T`，就清楚地表示了两者之间的关系。比如，输入的参数类型是`number[]`，那么 T 的值就是`number`，因此返回值类型也是`number`。

函数调用时，需要提供类型参数。

```typescript
getFirst<number>([1, 2, 3]);
```

上面示例中，调用函数`getFirst()`时，需要在函数名后面使用尖括号，给出类型参数`T`的值，本例是`<number>`。

不过为了方便，函数调用时，往往省略不写类型参数的值，让 TypeScript 自己推断。

```typescript
getFirst([1, 2, 3]);
```

上面示例中，TypeScript 会从实际参数`[1, 2, 3]`，推断出类型参数 T 的值为`number`。

#### 8.包装对象

------

JavaScript 的 8 种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```js
"hello".charAt(1); // 'e'
```

上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`
- `String()`
- `Number()`

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```js
const s = new String("hello");
typeof s; // 'object'
s.charAt(1); // 'e'
```

上面示例中，`s`就是字符串`hello`的包装对象，`typeof`运算符返回`object`，不是`string`，但是本质上它还是字符串，可以使用所有的字符串方法。

注意，`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

##### 包装对象类型与字面量类型

由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

```js
"hello"; // 字面量
new String("hello"); // 包装对象
```

上面示例中，第一行是字面量，第二行是包装对象，它们都是字符串。

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```ts
const s1: String = "hello"; // 正确
const s2: String = new String("hello"); // 正确

const s3: string = "hello"; // 正确
const s4: string = new String("hello"); // 报错
```

上面示例中，`String`类型可以赋值为字符串的字面量，也可以赋值为包装对象。但是，`string`类型只能赋值为字面量，赋值为包装对象就会报错。

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```ts
const n1: number = 1;
const n2: Number = 1;

Math.abs(n1); // 1
Math.abs(n2); // 报错
```

上面示例中，`Math.abs()`方法的参数类型被定义成小写的`number`，传入大写的`Number`类型就会报错。

##### Object 类型

大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。

```ts
let obj: Object;

obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
```

上面示例中，原始类型值、对象、数组、函数都是合法的`Object`类型。

事实上，除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。

##### object 类型

小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

注意，无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```ts
const o1: Object = { foo: 0 };
const o2: object = { foo: 0 };

o1.toString(); // 正确
o1.foo; // 报错

o2.toString(); // 正确
o2.foo; // 报错
```

上面示例中，`toString()`是对象的原生方法，可以正确访问。`foo`是自定义属性，访问就会报错

#### 9.类型工具

##### `Omit<Type, Keys>`

`Omit<Type, Keys>`用来从对象类型`Type`中，删除指定的属性`Keys`，组成一个新的对象类型返回。

```ts
interface A {
  x: number;
  y: number;
}

type T1 = Omit<A, "x">; // { y: number }
type T2 = Omit<A, "y">; // { x: number }
type T3 = Omit<A, "x" | "y">; // { }
```

##### `Pick<Type, Keys>`

`Pick<Type, Keys>`返回一个新的对象类型，第一个参数`Type`是一个对象类型，第二个参数`Keys`是`Type`里面被选定的键名。

```ts
interface A {
  x: number;
  y: number;
}

type T1 = Pick<A, "x">; // { x: number }
type T2 = Pick<A, "y">; // { y: number }
type T3 = Pick<A, "x" | "y">; // { x: number; y: number }
```



