# 安装
```shell
npm i koa
```

# 阅读文档
[Koa文档](https://github.com/demopark/koa-docs-Zh-CN)

# 创建项目
```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'Koa'
    next();
})

app.listen(3000, () => {
    console.log('http://localhost:3000');

})
```
# 中间件
## 日志中间件
```shell
npm i koa-logger
```
## 静态文件夹
```shell
npm i koa-static
```
## 处理body提交
```shell
npm i koa-bodyparser
```
## 添加路由
```shell
npm i koa-router
```
### 整理分批路由
```js
//controller-user.js
function userLogin(ctx, next) {
    ctx.body = 'userLogin'
    next()
}

function userRegister(ctx, next) {
    ctx.body = 'userRegister'
    next()
}
//导出到index.js
module.exports = {
    userLogin,
    userRegister,
}
```
```js
// router-index.js
const Router = require('koa-router');

const router = new Router();

const {userLogin,userRegister} = require('./controller/user')

router.get('/users/login',userLogin )

router.get('/users/register',userRegister)

module.exports = router
```
```js
// app.js
const router = require('./router')
app
    .use(router.routes())
    .use(router.allowedMethods())
```
## session2
```shell
npm i koa-session2
```
## redis
```shell
npm i ioredis
```
##  @koa/multer
```shell
npm i @koa/multer
npm i multer
```
```js
const multer = require('@koa/multer')

const upload = multer()

router.post("/avatar", upload.single('avatar'), (ctx, next) => {
    ctx.body = 'avatar'
})
```
## mongodb
```shell
npm i mongodb
```
```js
const Router = require('koa-router');

const router = new Router();

const mongodb = require('mongodb')
const {
    MongoClient
} = mongodb
router.get('/users/test', async (ctx, next) => {

    const url = 'mongodb://localhost:27017'
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const data = await client.db('lemon').collection('users').find({}).toArray()
    ctx.body = data


})
module.exports = router
```
