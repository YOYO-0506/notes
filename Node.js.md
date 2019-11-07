# 引入 required 模块
>可以使用 require 指令来载入 Node.js 模块
```js
const test = require("./test.js") // 等同于 可以省略后缀

const test = require("./test")// 导入自定义的模块（js文件时） 一定要记得添加目录（使用相对路径）
```
# module.exports
```js
function test() {
    console.log('test')
} 
// 如果想要在另一个js（模块）文件中使用这个方法
// 必须在这里导出方法
// 在模块（module）里 通过exports成员来分享当前js文件里的变量和方法给其他模块使用
module.exports = {
    test: test;
}
```
# 核心模块
> Node.js官方提供的核心模块
## crypto - 加密
`crypto.createHash(algorithm[, options])`
```js
crypto.createHash("md5") .update("123456").digest("hex");
      //设置算法         // 要加密的字符串  // 生成加密字符串 
```
`crypto.createHmac(algorithm, key[, options])`
```js
crypto.createHmac("md5", "project2").update("123456").digest("hex")
```
`crypto.createCipher(algorithm, password[, options])`对称加密
## events -事件触发器
> 要是用events模块，需要先导入管理事件
### EventEmitter
1. `on`用于监听事件`on(eventName,eventHandler)`
   * eventName:事件名称，可以自定义
   * eventHandler :事件处理函数，可以接收参数
2. `emit`触发事件`emit(eventName,...args)`
   * eventName:要触发的事件名称
   * 可以传递多个参数
3. `off`删除事件`off(eventName,eventHandler)`
4. `removeAllListeners`清空事件监听`emitter.removeAllListeners()`
5. `once`监听事件（事件只会被触发一次）`once(eventName,eventHandler)`
6. `prependListener`向事件执行栈最前面添加事件`prependListener(eventName,eventHandler)`
7. `setMaxListeners(n)`默认会限制事件数量（10个）
8. `getMaxListeners()`获取当前事件的数量，返回数字

## http - HTTP
> 创建http协议的服务器
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
const http = require('http');
const url = require('url');
const server = http.createServer((request, response) => {
    // console.log(request.headers);
    // console.log(request.url);
    // console.log(request.method);
    //如果是GET请求

    if (request.method === "GET") {
        // 把客户端请求过来的地址，处理成url对象
        const urlObj = url.parse(request.url);
        // 从url对象中取出pathname
        let filePath = path.join(publicDir, urlObj.pathname);
        if (!path.extname(urlObj.pathname)) {
            filePath = path.join(filePath,"index.html")
        }
        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.statusCode = 404;
                response.end();
            } else {
                const extname = path.extname(filePath); //获取文件后缀名称，用于设置mime类型
                if (/\.(jpg|jpeg)$/.test(extname)) {
                    response.setHeader("Content-Type", "image/jpeg"); //通过响应的Header告诉浏览器，当前响应的文件是什么类型
                } else if (/\.png$/.test(extname)) {
                    response.setHeader("Content-Type", "image/jpeg");
                } else if (/\.gif$/.test(extname)) {
                    response.setHeader("Content-Type", "image/gif");
                } else if (/\.(html|htm|xhtml)$/.test(extname)) {
                    response.setHeader("Content-Type", "text/html;charset=utf-8");
                } else if (/\.css$/.test(extname)) {
                    response.setHeader("Content-Type", "text/css;charset=utf-8");
                } else if (/\.js$/.test(extname)) {
                    response.setHeader("Content-Type", "text/js;charset=utf-8");
                }
                response.statusCode = 200;   //设置状态码
                response.statusMessage = "OKOKOK"  //设置状态消息   Status Code:200 OKOKOK
                response.end(data)
            }
        });
    } else {
        response.statusCode = 404; 
        response.end();
    }
});
server.listen("3000", () => {
    // 服务器监听成功的回调函数
    console.log("启动服务");
})
```
```js
//客户端请求进来的信息对象
request => IncomingMessage
request.headers;   // 客户端请求的header头
request.url;      // 请求的路径
request.method;    // 客户端用的请求方法
//服务器用于给客户端响应数据的对象
response => ServerResponse
request.end(); // 结束响应
```
```js
在浏览器里访问服务器
1. 本机ip地址 :  + 端口号 （ 192.168.1.102:3000）
2. localhost :  + 端口号 （localhost:3000）
3. 127.0.0.1 : + 端口号 （127.0.0.1:3000）
4. 0.0.0.0 :   + 端口号 (0.0.0.0:3000)  *mac
```

## Stream（流）
### 可读流(createReadStream)
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
//创建一个可读流
const crs = fs.createReadStream(path.join(publicDir, "super.txt"))
crs.on("data", (data) => {
    console.log(data);
})
```
### 可写流(createWriteStream)
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

const crs = fs.createReadStream(path.join(publicDir, "super.txt")); //创建一个可读流
const cws = fs.createWriteStream(path.join(publicDir, "super(2).txt")); // 创建一个可写流
//cws.close()  关闭流，停止传输数据
crs.on("data", (data) => {
    cws.write(data)
})
```
### pipe()
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

const crs = fs.createReadStream(path.join(publicDir, "super.txt")); //创建一个可读流
const cws = fs.createWriteStream(path.join(publicDir, "super(2).txt")); // 创建一个可写流
crs.pipe(cws) //通过管道传递
```
## querystring -（查询字符串）
```js
// 查询字符串解析模块
const qs = require("querystring");
// qs模块解析成对象
const query = qs.parse(uriObject.query)
```
## path - 路径
### path.basename(path)
> 获取文件名称
```js
 const path = require('path')
 const basename = path.basename(__filename); 
 console.log(basename); //demo.js
```
### path.dirname(path)
> 获取文件目录名称
```js
 const path = require('path')

 const dirname = path.dirname(__filename); 

 console.log(dirname); //D:\Project\demo
```
### path.extname(path)
> 获取文件后缀名，没有后缀显示空字符
```js
 const path = require('path')

 const extname = path.extname(__filename); 

 console.log(extname); //.js
```
### path.format(pathObject)
> 可以把一个路径对象处理成 ‘字符串路径’；可以修改base和name；但是要同步修改;组合路径时，用dir + name + ext
```js
const path = require('path')

 const parse = path.parse(__filename);

 const format = path.format({
     root: 'D:\\',
     dir: 'D:\\Project\\demo',
     base: 'demo.js',
     ext: '.js',
     name: 'demo'
 })
 console.log(format);
//输出： D:\Project\demo\demo.js
```
### path.parse(path)
>返回一个路径对象
```js
 const path = require('path')

 const parse = path.parse(__filename);
 console.log(parse);
//输出：
{ root: 'D:\\',
  dir: 'D:\\Project\\demo',
  base: 'demo.js',
  ext: '.js',
  name: 'demo' }

//1. root：磁盘目录
//2. dir：目录名称
//3. 文件名称（包含后缀名称）
//4. ext：后缀名称
//5. name：文件名称（不包含后缀名称）
```
### path.isAbsolute(path)
> 检查当前路径字符串是否为绝对路径
```js
const path = require('path')

const isAbsolute = path.isAbsolute('D:\\Project\\demo');
console.log(isAbsolute);
//输出：true
```
### path.relative(form,to)
> 生成一个相对路径，计算相对关系
```js
const path = require('path')
const relative = path.relative("a/b/c", "a/b/c/1.txt");
console.log(relative);
//输出：1.txt
```
### path.normalize(path)
> 把路径初始化称当前系统所支持的路径
```js
const path = require('path')
const str = "D:/Project/demo"
const normalize = path.normalize(str);
console.log(normalize);
//输出：D:\Project\demo
```
### path.join([...paths])  
> 组合路径
```js
const path = require('path')
const join = path.join(__dirname, "newfile");
console.log(join);
//输出：D:\Project\demo\newfile
```
### path.resolve([...paths])
> 默认拼接上工作目录
```js
const path = require('path')
const resolve = path.resolve("new", "new2")
console.log(resolve);
//输出：D:\Project\demo\new\new2
```
## global - 全局变量
1. 类似web里window对象，是node.js的顶层对象
2. 模块与模块之间可以共享global
```js
const two = require('./2.js');

console.log(global.a); //输出100；

//2.js:
global.a = 100;

```
### __dirname
> 当前执行js文件的目录名
### __filename
> 当前执行的js文件的绝对路径
### process
> 进程对象，只要程序不停止，进程就不会结束
#### process.exit()
> 退出进程
```js
let index = 1;
setInterval(() => {
    index++;
    console.log(index);
    if (index > 5) {
        process.exit();
    }
}, 1000);
```
#### process.argv
> 获取当前进程启动的数据
```js
console.log(process.argv);
```
#### process.env
>返回包含用户环境的对象
```js
console.log(process.env);
```
## url - URL
### new URL(input[, base])
```js
const url = require('url');
const { URL} = url;
const u = new URL("http://www.qq.com")
console.log(u);
//输出：
URL {
  href: 'http://www.qq.com/',
  origin: 'http://www.qq.com',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.qq.com',
  hostname: 'www.qq.com',
  port: '',
  pathname: '/',
  search: '',
  searchParams: URLSearchParams {},
  hash: '' }
//1. href：地址
//2. origin：原始地址
//3. protocol：协议
//4. username：账号
//5. password：密码
//6. host：主机
//7. hostname：主机名称
//8. port：端口号
//9. pathname：路径
//10. search：查询字符串 （？号后面的）
//11. searchParams：查询字符串的参数 （对象）
//12. hash：hash值（#号后面的）
```
### url.parse()
> 把路径字符串处理成url对象
```js
const url = require('url');
// const {  URL} = url;

const parse = url.parse("http://www.qq.com")
console.log(parse);
//输出：
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.qq.com',
  port: null,
  hostname: 'www.qq.com',
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: 'http://www.qq.com/' }
```
### url.format()
> 把url对象串处理成字符串
```js
const url = require('url');
const format = url.format({
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.qq.com',
    port: null,
    hostname: 'www.qq.com',
    hash: null,
    search: null,
    query: null,
    pathname: '/',
    path: '/',
    href: 'http://www.qq.com/'
})
console.log(format);
//输出：http://www.qq.com/
```
# fs - 文件系统
**fs模块（核心模块：file system）**
1. 异步文件操作:异步方法需要一个回调函数来接收结果
2. 同步文件操作:同步方法直接返回结果

## fs.readFile(path[, options], callback)
```js
const fs = require("fs");
fs.readFile("./file1.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})
// 如果不加入字符编码，那就输出的是一个Buffer文件
// 可以在结果后面加入.toString()转换字符串

fs.readFile("./file1.txt", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})
//输出：
// 111111111111111111111111111
// <Buffer 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31>
```
## fs.readFileSync(path[, options])
```js
const fs = require('fs');
const file = fs.readFileSync('./1.txt', 'utf8');
console.log(file);
```
## fs.writeFile(file, data[, options], callback)
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
const buf = Buffer.from("第三次写入", "utf8");

fs.writeFile(path.join(publicDir, '2.txt'), buf, (err) => {
    if (err) {
        console.log(err);
    }
})
```
## fs.writeFileSync(file, data[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
const buf = Buffer.from("第三次写入", "utf8");

try {
    fs.writeFileSync(path.join(publicDir, '3.txt'), "同步方法")
} catch (error) {
    console.log(error);
}
```
## fs.appendFile(path, data[, options], callback)
> 追加文件，不会覆盖文件内容
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
setInterval(() => {
    fs.appendFile(path.join(publicDir, '3.txt'), new Date().toLocaleTimeString() + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
}, 1000);
```
## fs.appendFileSync(path, data[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.appendFileSync(path.join(publicDir, '3.txt'), 'sync')
```
## fs.rename(oldPath, newPath, callback)
> 重命名
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.rename(path.join(publicDir, '1.txt'), path.join(publicDir, 'change.txt'), (err) => {
    if (err) {
        console.log(err);
    }
})
```
## fs.renameSync(oldPath, newPath)
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.renameSync(path.join(publicDir, 'change.txt'), path.join(publicDir, '1.txt'))
```
## fs.unlink(path, callback)
> 删除文件
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.unlink(path.join(publicDir, '1.txt'), (err) => {
    if (err) {
        console.log(err);
    }
})
```
## fs.unlinkSync(path)
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.unlinkSync(path.join(publicDir, '2.txt'));
```
## fs.copyFile(src, dest[, flags], callback)
> 复制文件
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.copyFile(path.join(publicDir, '3.txt'), path.join(publicDir, 'copy3.txt'), (err) => {
    if (err) {
        console.log(err);
    }
})
```
## fs.copyFileSync(src, dest[, flags])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.copyFileSync(path.join(publicDir, '3.txt'), path.join(publicDir, 'copy3(1).txt'))
```
## fs.existsSync(path)
> 检查文件是否存在
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

if (fs.existsSync(path.join(publicDir, '3.txt'))) {
    console.log('文件3存在');

}
```
## fs.stat(path[, options], callback)
> 返回文件的状态信息
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.stat(path.join(publicDir, '3.txt'), (err, stats) => {
    if (err) {
        console.log(err);

    } else {
        console.log(stats);

    }
})
//输出：
Stats {
  dev: 2695689164,   //包含该文件的设备的数字标识符。
  mode: 33206,    //描述文件类型和模式的位字段。
  nlink: 1,    //文件存在的硬链接数。
  uid: 0,    //拥有该文件（POSIX）的用户的数字型用户标识符。
  gid: 0,   //拥有该文件（POSIX）的群组的数字型群组标识符。
  rdev: 0,   //如果文件被视为特殊文件，则此值为数字型设备标识符。
  blksize: undefined,   //用于 I/O 操作的文件系统块的大小。
  ino: 844424930151858,   //文件系统特定的文件索引节点编号。
  size: 4,   //文件的大小（以字节为单位）。
  blocks: undefined,   //为此文件分配的块数。
  atimeMs: 1569820112992.221,       //表明上次访问此文件的时间戳，以 POSIX 纪元以来的毫秒数表示。
  mtimeMs: 1569819250635.386,       //表明上次修改此文件的时间戳，以 POSIX 纪元以来的毫秒数表示。
  ctimeMs: 1569819250635.386,      //表明上次更改文件状态的时间戳，以 POSIX 纪元以来的毫秒数表示。
  birthtimeMs: 1569818196690.8147,  //表明此文件的创建时间的时间戳，以 POSIX 纪元以来的毫秒数表示。
  atime: 2019-09-30T05:08:32.992Z,   //表明上次访问此文件的时间戳。
  mtime: 2019-09-30T04:54:10.635Z,    //表明上次修改此文件的时间戳。
  ctime: 2019-09-30T04:54:10.635Z,  //表明上次更改文件状态的时间戳。
  birthtime: 2019-09-30T04:36:36.691Z }  //表示此文件的创建时间的时间戳。
```
## fs.statSync(path[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

const stats = fs.statSync(path.join(publicDir, '3.txt'));
console.log(stats);
```
## fs.watch(filename[, options], listener)
> 监听文件的变化（可以是目录）
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.watch(publicDir, (event, file) => {
    console.log(event);
    console.log(file);
})
```
## fs.watchFile(filename[, options], listener)
> 监听文件的变化
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.watchFile(path.join(publicDir, "3.txt"), {
    interval: 5007
}, (cur, prev) => {
    console.log(cur);
})
```
## fs.mkdir(path[, options], callback)
> 创建目录
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');

fs.mkdir(path.join(publicDir, "new"), (err) => {
    if (err) {
        console.log(err);

    }
})
```
## fs.mkdirSync(path[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
fs.mkdirSync(path.join(publicDir, "new"))
```
## fs.rmdir(path[, options], callback)
> 删除目录，必须是空文件夹
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
fs.rmdir(path.resolve(publicDir, "new"), (err) => {
    if (err) {
        console.log(err);
    }
})
```
## fs.rmdirSync(path[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
fs.rmdirSync(path.resolve(publicDir, "new"))
```
## fs.readdir(path[, options], callback)
> 读取目录的内容
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
fs.readdir(path.resolve(publicDir, "new"), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
})
```
## fs.readdirSync(path[, options])
```js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve('Public');
const files = fs.readdirSync(path.resolve(publicDir, "new"))
console.log(files);
```

