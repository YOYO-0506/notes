# const 常量
```js
//常量声明时必须赋值;
//常量一旦定义就无法修改;

const str = 123;

//全大写命名，多个单词用下划线链接;
const MODE = "mode";
const USER_NAME = "zhangsan";
```
# 块作用域变量
```js
for (let i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log(i);
	}, 1);
}

//循环是同步的,循环10次
//异步打印 i 
//输出10;
```
```js
//let声明的变量作用域在块中;
//每次循环都会在新的代码块中生成一个新的变量
for (let i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log(i);
	}, 1);
}
//输出0,1,2,3,4,5,6,7,8,9
```
> 声明变量使用let声明，不用var声明；
> 声明常量用const声明
> 全局变量可以用var声明

# 箭头函数
[Babel-ES6语法转换](https://babeljs.io/)
>箭头函数是一个匿名函数
```js
//ES6箭头函数
const run = (name) => {
	return name + 'runing';
}

//ES5箭头函数
var run = function (name) {
	return name + 'running';
}
```
```js
// 1.单个参数的箭头函数，可以省略括号
const run = name => {
	return name + 'running';
}

// 2.箭头函数直接返回返回值；如果不带花括号，是把箭头后面的内容直接返回
const run = name => name + 'running';

//等同如下代码：

const run = name=>{
	return name+'running';
}

//  3.如果返回的是对象、数组
const person = (name, age) => {
	return {
		name,
		age
	}
}

//等同如下代码：

const person = (name, age) => ({
	name,
	age
})
//把return换成括号包裹对象或者数组
```
## 箭头函数和普通函数的区别
### 普通函数
> 可以通过arguments获取到参数和参数的数量
```js
function test() {
	console.log(arguments.length);
	console.log(arguments);
}
```
### 箭头函数
> 默认模块当中的所有语句都被包裹在模块函数中
> 不能使用arguments获取参数，因为arguments是祖先普通函数的
```js
function run() {
	const test = () => {
		console.log(arguments);
	}
	test();
}
run(1, 2, 3, 4, 5);
```
> 箭头函数可以使用 ...values 取所有参数
```js
const test = (arg1,arg2,...args) => {
	//...args 取剩余参数（去除arg1，arg2）
	//会把所有的参数收集到args里生成一个数组
	console.log(args)
}
```
* 在node.js的模块中，this指向的是模块函数里的第一个参数
* 箭头函数默认使用父作用域里的this指向
* 在Web中，普通函数的this指向window
* 在node中，普通函数的this指向global全局
* 如果是普通函数，需要用call、apply 来改变函数的this指向
* 如果是箭头函数，直接调用
* 在网页里，setTimeout里的this指向的是window
* 在node里，setTimeout里的this指向的是Timeout对象
# 类
## constructor
```js
class Test {
	// 构造函数
	constructor(age, name) {
		this.name = name;
		this.age = age;
	}
	// 方法
	run() {
		console.log('running');
	}
}
const test = new Test(12, 'zhangsan');
console.log(test);
```
## extends
```js
class Test {
	// 构造函数
	constructor(age, name) {
		this.name = name;
		this.age = age;
	}
	// 方法
	run() {
		console.log('running');
	}
}
//Test是基类，TestPlus继承Test基类
//会继承Test的构造函数以及成员（方法和变量）
class TestPlus extends Test{
	
}

const testPlus = new TestPlus(30,'laowang');
```
## super()
>重写构造函数，默认使用基类的构造函数

>默认子类的方法会覆盖父类的方法

>如果要使用父类的方法，可以用super来访问，例如：`super.function()`
```js
class TestPlus extends Test {
	constructor(name, age, sex) {
		//super就是基类的构造函数；
		//如果是继承，必须先调用基类的构造函数  => super() ;
		super(name, age);
		this.sex = sex;
	}
}

const testPlus = new TestPlus(30, 'laowang', "male");
```
## static 
> 静态方法不能使用this
```js
class TestPlus1 extends Test {
	constructor(name, age, sex) {
		super(name, age);
		this.sex = sex;
	}
	static run() {
		console.log('TestPlus1 => running ');
	}
}
//直接调用TestPlus1里的run方法;
TestPlus1.run();
```
# 字符串模板
* 可以拼接字符串，不用`+`号拼接
* 保留编写格式
```js
//ES6换行
const str1 = `
可
以
换
行`
//ES5中要 \n 处理换行
const str2 = '换\n行'
console.log(str1);
console.log(str2);
```
## ${}
```js
const div = "<div></div>"


//${}可以在模板字符串里使用变量;

const str = `${div}前面加入div`

console.log(str);
//输出结果：<div></div>前面加入div
```
# Promise
```js
const fs = require('fs');
const p = new Promise((resolve, reject) => {
	//resolve:当处理逻辑成功时再调用;
	//reject:当处理逻辑错误时再调用;
	fs.readFile('./readme.md', (err, data) => {
		if (err) {
			//当错误时，使用reject函数返回错误
			reject(err);
		} else {
			//当成功时，使用resolve函数返回结果
			resolve(data.toString());
		}
	});
})
//成功用then方法；
//失败用catch方法；
p.then(function (res) {
	console.log(res);
}).catch(function (err) {
	console.log(err);
})
//可以多次订阅
```
## Promise.all()
**同时取出多个异步结果**
```js
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(100);
	}, 100);
});
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(200);
	}, 200);
});

Promise.all([p1, p2]).then(res => {
	console.log(res);
})
```
## Promise.race()

**取出执行最快的结果**
```js
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(100);
	}, 100);
});
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(200);
	}, 200);
});
Promise.race([p1, p2]).then(res=>{
	console.log(res);
})
```
# async、await
* async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
* await 用于等待一个Promise执行完成；必须使用在async函数体内（同步运行）
```js
async function helloAsync() {
	return "helloAsync";
}

console.log(helloAsync()) // Promise {<resolved>: "helloAsync"}

helloAsync().then(res => {
	console.log(res); // helloAsync
})
```
```js
function testAwait() {
	return new Promise((resolve) => {
		setTimeout(function () {
			console.log("testAwait");
			resolve();
		}, 1000);
	});
}

async function helloAsync() {
	await testAwait();
	console.log("helloAsync");
}

helloAsync();
//testAwait
//helloAsync
```
# 对象的结构和赋值
```js
const obj = {
	name: "zhangsan",
	age: 20
}
//可以设置默认值；当obj里面的sex不存在时，使用"male"作为变量的默认值
const{ name,age,sex = "male" } = obj;


//等同于

// const age = obj.age;
// const name = obj.name;
console.log(name);

console.log(age);
```
## 取对象的剩余参数
> 取对象的剩余参数（...more）；返回的是一个新对象
```js
const obj = {name: "zhangsan",age: 20,sex: "女"}

const {	name,...more} = obj;
console.log(more);
```
## 扩展对象
> 把一个对象里的成员扩展到目标对象中去
```js
const obj = {
	name: "zhangsan",
	age: 20,
	sex: "male"
}


const {
	name,
	age,
	sex
} = obj;


const person = {
	...obj,
	type: "CEO"

}
console.log(person);
//{ name: 'zhangsan', age: 20, sex: 'male', type: 'CEO' }
```
## 数组
> 参考对象中的 ... 语法 ，取出数组剩余参数和扩展新数组
```js
const arr = ["张三", "老王", "小明"];

//也可以加入默认值

const [a, b, c,d = "新来的"] = arr;

//相等于以下语法：
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
```
