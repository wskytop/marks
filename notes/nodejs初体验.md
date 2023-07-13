### 概念——什么是nodejs

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。

Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript 的速度非常快，性能非常好。

### 创建第一个应用

使用 Node.js 时，我们不仅仅 在实现一个应用，同时还实现了整个 HTTP 服务器。

事实上，我们的 Web 应用以及对应的 Web 服务器基本上是一样的。

在我们创建 Node.js 第一个 "Hello, World!" 应用前，让我们先了解下 Node.js 应用是由哪几部分组成的：

1. **require 指令**：在 Node.js 中，使用 require 指令来加载和引入模块，引入的模块可以是内置模块，也可以是第三方模块或自定义模块。
2. **创建服务器：**服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3. **接收请求与响应请求** 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

------

#### 步骤一、使用require指令来加载和引入模块

语法格式如下：

```javascript
const module = require('module-name')
```

其中，module-name 可以是一个文件路径（相对或绝对路径），也可以是一个模块名称，如果是一个模块名称，Node.js 会自动从 node_modules 目录中查找该模块。

require 指令会返回被加载的模块的导出对象，可以通过该对象来访问模块中定义的属性和方法，如果模块中有多个导出对象，则可以使用解构赋值的方式来获取它们。

#### 步骤二、创建服务器

接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据，代码如下：

```javascript
var http = require('http');

http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

以上代码我们完成了一个可以工作的 HTTP 服务器，使用node命令在执行以上代码，在浏览器中访问http://127.0.0.1:8888/，结果如下:

![](https://image.dahuangf.com/dahuangf/image/2023/7/4/15022764a3c403532c4--5f7cd78608eab46c879d227085da244.png)

### 回调函数

Node.js 异步编程的直接体现就是回调。

异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。

回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

回调函数一般作为函数的最后一个参数出现：

```javascript
function foo1(name, age, callback) { }
```

------

#### 阻塞代码示例

创建一个文件 input.txt ，内容如下：

```txt
醉里挑灯看剑，梦回吹角连营
```

创建main.js文件用于读取input.txt内容：

```javascript
const fs = require("fs");
const txt = fs.readFileSync('input.txt');
console.log(txt.toString());
console.log("程序执行结束！")
```

以上代码执行结果如下：

```javascript
醉里挑灯看剑，梦回吹角连营
程序执行结束！
```

#### 使用回调函数实现非阻塞代码：

```javascript
const fs = require("fs");
fs.readFile('input.txt',function( err, data) {
    if(err) return console.err(err)
    console.log(data.toStrig())
});
console.log("程序执行结束！")
```

以上代码执行结果如下：

```javascript
程序执行结束！
醉里挑灯看剑，梦回吹角连营
```

以上两个实例我们了解了阻塞与非阻塞调用的不同。第一个实例在文件读取完后才执行程序。 第二个实例我们不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。

因此，阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。

### 事件循环

Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

Node.js 几乎每一个 API 都是支持回调函数的。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

------

#### 事件驱动程序

Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为 webserver 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

![](https://image.dahuangf.com/dahuangf/image/2023/7/7/11264864a785f81c1de--f2e258791d2267acb900ff07a47ad56.png)

整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);

// 触发事件
eventEmitter.emit('eventName');
```

### EventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列，Node.js 里面的许多对象都会分发事件，所有这些产生事件的对象都是 events.EventEmitter 的实例。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

你可以通过require("events");来访问该模块.

EventEmitter 提供了多个属性，如 **on** 和 **emit**。**on** 函数用于绑定事件函数，**emit** 属性用于触发一个事件，每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。代码如下

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

代码执行结果如下：

```
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

### process.nextTick()

当我们将一个函数传递给 `process.nextTick()` 时，它将在当前事件循环结束、下一次事件循环开始之前调用该函数

事件顺序执行的实例：

```js
console.log('Hello => number 1');

setImmediate(() => {
  console.log('Running before the timeout => number 3');
});

setTimeout(() => {
  console.log('The timeout running last => number 4');
}, 0);

process.nextTick(() => {
  console.log('Running at next tick => number 2');
});
```

输出结果如下:

```js
Hello => number 1
Running at next tick => number 2
Running before the timeout => number 3
The timeout running last => number 4
```

### Stream

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

Node.js，Stream 有四种流类型：

- **Readable** - 可读操作。
- **Writable** - 可写操作。
- **Duplex** - 可读可写操作.
- **Transform** - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- **data** - 当有数据可读时触发。
- **end** - 没有更多的数据可读时触发。
- **error** - 在接收和写入过程中发生错误时触发。
- **finish** - 所有数据已被写入到底层系统时触发。

------

创建input.txt，内容如下：

```
醉后不知天在水，满船清梦压星河
```

创建output.txt，内容如下：

```
昔人已乘黄鹤去，此地空余黄鹤楼
```



#### 从流中读取数据

创建 main.js 文件, 代码如下：

```js
const fs = require('fs');
let data = '';

// 创建可读流
const readerStream = fs.createReadStream('input.txt');

// 设置编码为utf-8
readerStream.setEncoding('utf-8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
  data += chunk;
});

readerStream.on('end', function () {
  console.log(data);
});

readerStream.on('error', function (err) {
  console.log(err.stack);
});

console.log('程序执行完毕');
```

以上代码执行结果如下：

```
程序执行完毕
醉后不知天在水，满船清梦压星河
```

#### 写入流

创建 main.js 文件, 代码如下：

```js
const fs = require('fs');
const data = '云想衣裳花想容，春风不度玉花荣';

// 创建一个可以写入的流，写入到output.txt中
const writerStream = fs.createWriteStream('nodejs/output.txt');

// 使用utf-8编码写入数据
writerStream.write(data, 'utf-8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish,error
writerStream.on('finish', () => {
  console.log('写入完成');
});

writerStream.on('error', (err) => {
  console.log(err.stack);
});

console.log('程序执行完毕');
```

程序执行完毕，output.txt的内容会被替换为data的内容

#### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

创建main.js文件，代码如下：

```js
const fs = require('fs');

// 可读流
const readerStream = fs.createReadStream('nodejs/input.txt');

// 可写流
const writerStream = fs.createWriteStream('nodejs/output.txt');

// 管道读写操作
// 读取input.txt文件内容，并写入到output文件中
readerStream.pipe(writerStream);

console.log('程序执行完毕');
```

程序执行完毕，output.txt文件的内容被替换为input.txt的内容

#### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

压缩文件：

```js
const fs = require('fs');

const zlib = require('zlib');

// 压缩 input.txt 文件为input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

console.log('文件压缩完成');
```

解压文件：

```js
const fs = require('fs');

const zlib = require('zlib');

// 压缩 input.txt 文件为input.txt.gz
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input2.txt'));

console.log('文件解压完成。');
```

### 文件系统

#### 文件统计信息

每个文件都带有一组我们可以使用 Node.js 检查的详细信息。 特别是，使用 [`fs` 模块](https://nodejs.cn/api/fs.html)提供的 `stat()` 方法。

你调用它传递文件路径，一旦 Node.js 获取文件详细信息，它将调用你传递的回调函数，带有 2 个参数： 错误消息和文件统计信息：

```js
const fs = require('fs');
fs.stat('input.txt', (err, stats) => {
  if (err) console.log(err);
  console.log(stats);
});
```

Node.js 还提供了一个 sync 方法，它会阻塞线程直到文件统计信息：

```js
const fs = require('fs');

try {
  const stats = fs.statSync('input.txt');
} catch (err) {
  console.error(err);
}
```

文件信息包含在 stats 变量中，包括：

- 可以使用 `stats.isFile()` 和 `stats.isDirectory()`判断是目录还是文件
- 果fs.stats对象描述符号链接，使用 `stats.isSymbolicLink()` ，则返回true
- 使用 `stats.size` 获取以字节为单位的文件大小。

#### 文件路径

给定一条路径，可以使用`path`模块从中读取信息：

- `dirname`: 获取文件的父文件夹
- `basename`: 获取文件名部分
- `extname`: 获取文件扩展名

实例：

```js
const notes = '/users/hugh/notes.txt';

path.dirname(notes); // /users/hugh
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

为`basename` 指定第二个参数来获取不带扩展名的文件名：

```js
path.basename(notes, path.extname(notes)); // notes
```

使用 `path.join()` 连接路径的两个或多个部分：

```js
const name = 'hugh';
path.join('/', 'users', name, 'notes.txt'); // '/users/hugh/notes.txt'
```

你可以使用 `path.resolve()` 获取相对路径的绝对路径计算：

```js
path.resolve('notes.txt'); // '/Users/hugh/notes.txt' 
```

在这种情况下，Node.js 将简单地将 `/notes.txt` 附加到当前工作目录。 如果指定第二个参数文件夹，`resolve` 将使用第一个作为第二个的基础：

```js
path.resolve('tmp', 'notes.txt'); // '/Users/hugh/tmp/notes.txt'
```

如果第一个参数以斜杠开头，则表示它是绝对路径：

```js
path.resolve('/etc', 'notes.txt'); // '/etc/notes.txt'
```

**resolve不会检查路径是否存在**. 他只是根据得到的信息计算出一条路径。

#### 读取文件

读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()

```js
const fs = require('fs');

// 异步读取
fs.readFile('nodejs/stream/input.txt', (err, data) => {
  if (err) return console.log(err);
  console.log('异步读取：' + data.toString());
});

// 同步读取
const data = fs.readFileSync('nodejs/stream/input.txt');
console.log('同步读取：' + data.toString());
console.log('程序执行完毕');
```

以上代码执行结果如下：

```js
同步读取：
程序执行完毕
异步读取：
```

#### 写入文件

写入文件内容的函数有异步的 fs.writeFile() 和同步的 fs.writeFileSync()

```js
const fs = require('fs');

const txt = '知不可乎骤得，托遗响于悲风';

fs.writeFile('nodejs/stream/input.txt', txt, (err) => {
  if (err) return console.error(err);
  console.log('异步文件写入成功');
});

try {
  fs.writeFileSync('nodejs/stream/input.txt', txt);
  console.log('同步文件写入成功');
} catch (err) {
  console.error(err);
}
```

如果不想用新内容覆盖文件而是添加到文件时，可以使用`fs.appendFile()`（及其对应的 `fs.appendFileSync()`）：

```js
const fs = require('fs');

const content = 'Some content!';

fs.appendFile('input.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // done!
});
```

#### 使用文件夹

fs.access()方法用于测试给定文件或目录的权限。可以使用文件访问常量将要检查的权限指定为参数。也可以通过使用按位或运算符创建具有多个文件常量的掩码来检查多个文件权限。

**注意：**不建议在调用fs.open()，fs.readFile()或fs.writeFile()之前使用fs.access()方法检查文件的可访问性，因为它会引入竞争状态，因为文件状态可能会在之后被其他进程更改考试。

**用法:**

```
fs.access( path, mode, callback )
```

**参数：**此方法接受上述和以下所述的三个参数：

- **path:**它是一个字符串，缓冲区或URL，表示必须对其权限进行测试的文件或目录的路径。

- **mode:**它是一个整数值，表示要测试的许可。逻辑OR运算符可用于分隔多个权限。它可以具有值`fs.constants.F_OK`，`fs.constants.R_OK`，`fs.constants.W_OK`和`fs.constants.X_OK`。它是一个可选参数。默认值为`fs.constants.F_OK`。

- callback:

  该方法执行时将调用该函数。

  - **err:**如果方法失败，将抛出此错误。

使用示例如下：

```js
const fs = require('fs');

fs.access('nodejs', fs.constants.R_OK, (err) => {
  console.log(`${err ? 'does not exist' : 'exists'}`);
});
```

------

##### 读取目录内容

使用 `fs.readdir()` 或 `fs.readdirSync()` 或 `fsPromises.readdir()` 读取目录的内容。

这段代码读取文件夹的内容，包括文件和子文件夹，并返回它们的相对路径：

```js
const fs = require('fs');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);

// 过滤，仅返回文件，排除文件夹
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

// 获取完整的路径
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName);
}).filter(isFile);
```

------

##### 重命名文件夹

使用 `fs.rename()` 或 `fs.renameSync()`  重命名文件夹。 第一个参数是当前路径，第二个是新路径：

```js
const fs = require('fs');

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err);
  }
  // done
});
```

`fs.renameSync()` 是同步版本：

```js
const fs = require('fs');

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}
```

------

##### 删除文件夹

使用 `fs.rmdir()` 或 `fs.rmdirSync()`  删除文件夹。

```js
const fs = require('fs');

fs.rmdir(dir, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```

要删除包含内容的文件夹，请使用 `fs.rm()` 和选项 `{ recursive: true }` 递归删除内容。

`{ recursive: true, force: true }` 使得如果文件夹不存在，异常将被忽略。

```js
const fs = require('fs');

fs.rm(dir, { recursive: true, force: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir} is deleted!`);
});
```

### GET/POST请求

#### 获取GET请求内容

由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此可以使用url 模块中的 parse 函数手动解析后面的内容作为GET请求的参数：

```js
const http = require('http');
const url = require('url');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write('网站名：' + params.name);
    res.write('\n');
    res.write('网站 URL：' + params.url);
    res.end();
  })
  .listen(3000);
```

在浏览器中访问 http://localhost:3000/user?name=get请求&url=www.nodejs.com 然后查看返回结果:

![image-20230712143510805](https://gitee.com/wskytop/images/raw/master/img/image-20230712143510805.png)

------

#### 获取POST请求内容

