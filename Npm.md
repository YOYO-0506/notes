# npm-cli (npm 命令行)
1. init 创建项目
创建完成之后 会在项目的根目录下添加一个package.json文件
```shell
npm init
*  回车之后会进入到交互过程
Press ^C at any time to quit.
*  输入项目名称 （包名称）默认使用项目的文件夹名称 （千万不要使用中文的目录 否则报错）
package name: (01)
*  输入包版本号 1.0.0
version: (1.0.0)
*  输入项目的描述
description: 
*  包的入口js文件 （开始执行的第一个js文件 入口文件）
entry point: (index.js)
*  输入测试命令 可以不输入（回车跳过）
test command:
*  输入github仓库地址 可以不输入（回车跳过）
git repository:
*  关键词 可以不输入（回车跳过）用户上传到npm之后搜索用
keywords:
*  输入作者名称
author:
*  开源协议 （开源指代码任何人任何地方都可以使用）
license: (ISC)
*  确认信息
{
  "name": "my-first-app",
  "version": "0.0.1",
  "description": "我的第一个node项目",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "ranyunlong",
  "license": "MIT"
}

*  如果ok输入y不ok输入n
Is this OK? (yes)
```
> 快速创建项目包管理文件
```shell
npm init --yes
  # 创建完成之后 需要手动去完善package.json里的信息
```

# 安装第三方模块（依赖）
```shell
npm install <pkg>
```
* 例如安装jquery `npm install jquery`
* 缩写 install 可以缩写为 `npm i jquery`

安装完成之后再package.json 里面会多一个项目, 在项目目录里会多一个node_modules的文件夹
这个文件夹里包含了包的代码文件
```json
"dependencies": {
    "jquery": "^3.4.1"
}
```
> 加入子命令 开发依赖
```shell
# 安装开发依赖
npm i gulp -D
# 或者
npm i gulp --save-dev
```
安装完成之后 在package.json里会多一个选项 `devDependencies` 也就是开发依赖
开发依赖 当有人使用你的模块时 开发依赖不会被安装到他的node_modules里去
开发依赖只有当自己使用时才会被安装到node_modules里去
```json
"devDependencies": {
    "gulp": "^4.0.2"
}
```
加入子命令 全局安装 安装到nodejs的安装目录里去
`--global`  `-g`
*  nrm 用于切换npm的下载源
*  默认npm下载时在国外的服务器
*  可以切换到阿里的国内镜像服务器 每隔10分钟和npm的服务器同步一次
*  https://www.npmjs.com/package/nrm
npm i -g nrm
*  或者`npm i --global nrm`
*  nrm 可以用于解决下载速度慢的问题
*  接下来就可以使用 列出当前可用的下载源（镜像服务器）
nrm ls
*  前面带星号的是当前使用的服务器
* npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/

# 快速恢复不小心删除的node_modules
> npm 会根据package.json里的信息来恢复曾经安装过的模块
`npm i`
# 删除模块
```shell
npm uninstall <pkg>
*  例如 卸载模块 gulp
npm uninstall gulp
* 例如 卸载模块 jquery
npm uninstall jquery
``` 
# npm info
> 使用这个命令检查是否有这个模块 

`npm info jquery`

# npm publish
使用这个命令就可以发布模块
如果更新了代码 修改版本号之后 （package.json的版本号只能向上加）
`npm publish`
# 撤销模块
撤销发布必须是发布的24小时以内 没人使用的情况下可以撤销
如果有人使用 就撤销不了了（确实存在大的bug可以联系npm的管理员撤销）
```shell
// 使用下面命令来撤销发布
npm unpublish <pkg>@<version>
npm unpublish ranyunlong-02@1.0.1
```
撤销后的版本号 不能再次使用
不能把最低最后的一个版本撤销掉 如果把所有版本都撤销 这个名词以后都不能上传了（就会被废弃）
# npm i node-dev -g
> 修改代码后可以热启动
`npm i node-dev -g`

`node-dev app.js`运行
# npm i colors
```shell
const colors = require('colors')
console.log(`${req.method},${colors.green(req.url)},${colors.red(res.statusCode)}`);
```
# npm i multer
> 处理文件上传
```js
const express = require('express')
const router = new express.Router()
const multer = require('multer') //处理文件上传
const upload = multer({
    // 设置临时文件的缓存目录
    dest:'uploads'
}) //添加上传处理器


router.post('/upload/img', upload.array('file'), (req, res, next) => {
    // 等到客户端请求完毕
    // upload.array('file') 多个文件上传模式
    // upload.single('file') 单个文件
    console.log(req.files);
    res.end('upload')
    
})

// 导出创建好的路由
module.exports = router
```
# npm i cookie-parser
> 处理cookie
```js
app.use(cookieParser('yoyo'))
app.use((req, res, next) => {
    res.cookie('user', 'ziji',{
        httpOnly:true,  //只允许服务器来设置
        maxAge:1000,   //最大生命时间  秒
        signed:true,  //加密签名
    })
    next()
})
```
# npm i express-session
```js
const session = require('express-session')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
```
```js
// 添加session模块
const session = require("express-session");
// 注册session中间件
// session中间件会依赖cookie
// 必须添加到cookie中间件之后
app.use(session({
    secret: 'bjlemon',
    // resave: false,
    // saveUninitialized: true,
    // 只要是一直使用的状态 
    // rolling为true cookie会一直追加过期时间 当前时间 + maxAge 作为session的过期时间
    rolling: true,
    // 设置仓库 将session数据存入redis数据库中
    // redis是一个数据库 就算服务器重启 登录的状态信息还会继续保留
    store: new RedisStore({ client }),
    cookie: { 
        // secure: true, // 如果使用https协议设置为ture
        maxAge: 1000 * 60 * 60,  // 设置登录的过期时间
        // 只能通过服务器设置cookie
        // 不能通过客户端脚本的方式设置cookie
        httpOnly: true,
    }
}))
```
# npm i koa-router
# npm i koa-logger
# npm i koa-bodyparser
# npm i koa-session2
# npm i koa-ejs
> 模板引擎
# npm i koa-json
```js
//美化json格式
const Koa = require('koa')

const app = new Koa()

const json = require('koa-json')

app.use(json())
```
# npm i @koa/multer
# npm i ioredis
# npm i mongodb
# npm i connect-redis redis
# npm i bcrypt 
```js
//加密
password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        },
    }
//解密
const isPasswordVaild = require('bcrypt').compareSync(req.body.password, user.password)

```
# npm i jsonwebtoken
# npm i svg-captcha

