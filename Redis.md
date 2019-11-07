# Redis
[Redis安装]( https://github.com/MSOpenTech/redis/releases )
# 安装session连接插件
`npm i connect-redis redis`
```js
const redis = require('redis') //导入redis数据库
const session = require('express-session') // 导入session模块
let RedisStore = require('connect-redis')(session) //导入redis仓库
let client = redis.createClient()//使用redis创建一个客户端对象
app.use(
  session({
    store: new RedisStore({ client }), //设置仓库将session数据存入redis数据库中
    secret: 'keyboard cat',
    resave: false,
  })
)
```
