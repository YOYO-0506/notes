# Express
```js
const express = require('express')
const path = require('path')
const app = express(); //创建服务器
// 添加插件：（中间件）
app.use(express.json()) //用来处理表单提交json数据的
app.use(express.urlencoded()) //用来解析post请求的主体数据
app.use(express.static(path.resolve('Public'))) // 静态文件服务器

app.get('/', (req, res, next) => {
    console.log(req.query); // 打印已经解析好的查询字符串
    res.type("json"); // 等同于 =>  res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.json({
        name: "zhangsan"
    })
})

app.post('/test', (req, res, next) => {
    console.log(req.query);
    console.log(req.body); //打印请求主体的数据（需要单独解析）

    res.end('this is /test');

})
app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    //通过请求获取到的账号和密码，拿到数据库去查询，如果能查询到，登录成功 否则失败
    if (username && password) {
        res.json({
            success: true,
            message: "loging"
        })
    } else {
        res.json({
            success: false,
            message: "not found"
        })
    }

})
app.listen(3000, () => {
    console.log("go:" + "http://localhost:3000");

})
```
# Express 应用程序生成器
```shell
1. npm install express-generator -g
2. express --view=pug myapp
3. npm i # 重新安装package-lock.json
```
# 中间件
```js
server.use((req, res, next) => {
    res.end('ok')
})
```
```js
//app.js内容：
const express = require('express')
const path = require('path')
const colors = require('colors')
const logger = require(path.resolve('middle', 'logger.js'))
const server = express()
const port = 3000
const host = 'http://localhost'
server.use(logger)

server.use(express.static(path.resolve('public')))
server.use(express.json())
server.use(express.urlencoded())

server.listen(3000, () => {
    console.log(`listening:${colors.green(host)}:${colors.green(port)}`);

})
```
```js
//logger.js内容：
const colors = require('colors')
module.exports = (req, res, next) => {
    res.on('finish', () => {
        let code = ""
        if (res.statusCode >= 200 && res.statusCode < 300) {
            code = colors.green(res.statusCode)
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            code = colors.yellow(res.statusCode)
        } else if (res.statusCode >= 400) {
            code = colors.red(res.statusCode)
        }
        console.log(`${req.method},${colors.green(req.url)},${(code)}`);

    })
    next()
}
```
## 一个输出日志的功能
```js
// looger.js
const colors = require('colors')
const fs = require('fs')
const path = require('path')

module.exports = (isWriteFileLog) => (req, res, next) => {
    res.on('finish', () => {
        let code = ""
        if (res.statusCode >= 200 && res.statusCode < 300) {
            code = colors.green(res.statusCode)
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            code = colors.yellow(res.statusCode)
        } else if (res.statusCode >= 400) {
            code = colors.red(res.statusCode)
        }
        const date = new Date()
        let filename = `${date.getFullYear()+"年"}${date.getMonth()+1+"月"}${date.getDate()+"日"}`
        const logPath = path.resolve('log', filename + '.txt')
        const logs = `${req.method},${colors.green(req.url)},${(code)}`
        fs.appendFile(logPath, `${req.method},${req.url},${res.statusCode},\n`, (err) => {
            if (err) {
                console.log(err);

            }
        })

        console.log(logs);


    })
    next()
}
```
```js
// app.js
const express = require('express')
const path = require('path')
const colors = require('colors')
const logger = require(path.resolve('middle', 'logger.js'))
const server = express()
const port = 3000
const host = 'http://localhost'
server.use(logger(true))

server.use(express.static(path.resolve('public')))
server.use(express.json())
server.use(express.urlencoded())

server.listen(3000, () => {
    console.log(`listening:${colors.green(host)}:${colors.green(port)}`);

})
```
# 路由
作用：是把客户端传递过来的地址和后台代码进行匹配

匹配到合适的路由地址，就进入到匹配的方法里处理请求
```js
//user.js
const express = require('express')
const router = new express.Router()

router.get('/', (req, res, next) => {
    res.json({
        success: true,
    })
    next()
})
router.get('/list', (req, res, next) => {
    res.json({
        success: true,
        data: {
            page: 1,
            total: 1,
            list: [{
                username: "zhangsan",
                age: 12,
            }]
        }
    })
    next()
})
// 导出创建好的路由
module.exports = router
```
```js
// app.js
const express = require('express')
const path = require('path')
const colors = require('colors')
const logger = require(path.resolve('middle', 'logger.js'))
const app = express()
// 导入路由
const user = require(path.resolve('router','user.js'))
const port = 3000
const host = 'http://localhost'
app.use(logger(true))

app.use(express.static(path.resolve('public')))
app.use(express.json())
app.use(express.urlencoded())
app.use('/user',user)   // http://localhost:3000/user/list

app.listen(3000, () => {
    console.log(`listening:${colors.green(host)}:${colors.green(port)}`);

})
```
## 动态路由
```js
// 动态路由  
// 路由的地址不固定的，按照客户端传递的参数进行匹配
router.get('/:date/:id.html', (req, res, next) => {
    console.log(req.params);
    // req.params  用来获取动态的地址参数
    res.end('ok get')
})
```

