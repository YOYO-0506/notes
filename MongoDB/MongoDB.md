# MongoDB
`npm i mongodb`安装npm包
```js
const {
    MongoClient
} = require("mongodb");

function database(collectionName) {
    return MongoClient.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
        return client.db("db").collection(collectionName);
    })
}

module.exports = database;
```
1. `mongo`连接

2. `show dbs`查询当前有哪些数据库，或 ：` show databases`
```shell
show dbs
admin   0.000GB # 管理员数据库
config  0.000GB # 数据库的配置文件
local   0.000GB # 本地数据库
```
3.  `use <database name>`创建/切换数据库
4.  `db`查询当前所在的数据库
```shell
db
test # 第一次默认返回test
```
5. `show tables`查询当前数据库的所有集合 ，或： `show collections`
# MongoDB 创建集合
`db.createCollection(name, options)`

* name: 要创建的集合名称
* options: 可选参数, 指定有关内存大小及索引的选项

`db.createCollection('age',{capped:true,size:1,max:1})`
# MongoDB 插入文档
`db.COLLECTION_NAME.insert(document)`
```shell
db.age.insert({age:'1'})
```
# MongoDB 删除集合
`db.collection.drop()`
```shell
db.age.drop()
true
```
# MongoDB 删除数据库
`db.dropDatabase()`
```shell
db.dropDatabase()
{ "dropped" : "lemon", "ok" : 1 }
```
# CURD操作（增删改查）
## create = > 添加数据
```shell
db.users.insert({name:"张三"})
```
## update = > 修改数据
```shell
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明：

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别
```shell
db.users.update({sex:"nan"},{$set:{name:'小明'}}) # 根据sex选择，修改数据
db.users.update({_id:ObjectId("5da4072d5a850c60bb5a2258")},{$set:{sex:"男"}}) # 根据ObjectId选择，修改数据
db.users.update({name:"小芳"},{$set:{sex:"女"}},{upsert:true}) # 有则修改，无则添加
db.users.update({sex:"男"},{$set:{sex:"true"}},{multi:true}) # 匹配多行修改数据
```
## read = > 读取数据
## delete = > 删除数据
```shell
db.collection.remove(
   <query>,
   <justOne>
)
```
```shell
db.users.remove({})# 如果remove方法不带条件，即空对象，会删除所有数据
db.users.remove({name:"小芳",sex:"true"})# 必须满足name === '小芳'&& sex === 'true',才能进行删除
db.users.remove({$or:[{name:"张三"},{name:'小芳'}]}) # 删除name === '张三' 和name === '小芳'的数据
```
# 条件操作符
`$or` 匹配or条件

`$set` 更新数据

`$gt` (>) 大于

`$lt` (<) 小于

`$gte` (>=) 大于  

`$lte` (<= ) 小于等于

`$ne` 不等于
```shell
db.users.find({age:{$gte:15}})
```
# 美化查询结果
`db.users.find().pretty()`
# MongoDB Limit() 方法
```shell
db.COLLECTION_NAME.find().limit(NUMBER) # 限制查询数量
```
# MongoDB Skip() 方法
```shell
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER) # 跳过指定数量的数据
```
# MongoDB sort() 方法
`db.COLLECTION_NAME.find().sort({KEY:1})`
```shell
db.users.find().sort({name:-1})  # 1为升序 -1为降序
```
# aggregate() 方法
## $project
```shell
db.users.aggregate({$project:{name:1}}) # 1表示只保留name字段显示
{ "_id" : ObjectId("5da418e45a850c60bb5a225e"), "name" : "test1" } 
{ "_id" : ObjectId("5da418fb5a850c60bb5a225f"), "name" : "test2" } 
{ "_id" : ObjectId("5da418fe5a850c60bb5a2260"), "name" : "test3" } 
{ "_id" : ObjectId("5da419025a850c60bb5a2261"), "name" : "test4" } 
{ "_id" : ObjectId("5da419055a850c60bb5a2262"), "name" : "test5" } 
{ "_id" : ObjectId("5da419095a850c60bb5a2263"), "name" : "test6" } 
{ "_id" : ObjectId("5da4190c5a850c60bb5a2264"), "name" : "test7" } 
{ "_id" : ObjectId("5da4190f5a850c60bb5a2265"), "name" : "test8" } 
{ "_id" : ObjectId("5da419125a850c60bb5a2266"), "name" : "test9" } 
{ "_id" : ObjectId("5da419155a850c60bb5a2267"), "name" : "test10" }
```
```shell
db.users.aggregate({$project:{name:0}}) # 0表示去除name字段显示
{ "_id" : ObjectId("5da418e45a850c60bb5a225e"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da418fb5a850c60bb5a225f"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da418fe5a850c60bb5a2260"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da419025a850c60bb5a2261"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da419055a850c60bb5a2262"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da419095a850c60bb5a2263"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da4190c5a850c60bb5a2264"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da4190f5a850c60bb5a2265"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da419125a850c60bb5a2266"), "sex" : true, "age" : 20 }
{ "_id" : ObjectId("5da419155a850c60bb5a2267"), "sex" : true, "age" : 20 }
```
## $match
```shell
db.users.aggregate({$match:{name:'test4'}})  # 匹配查询条件
{ "_id" : ObjectId("5da419025a850c60bb5a2261"), "name" : "test4", "sex" : true, "age" : 20 }
```
## $group
```shell
db.class.find()
{ "_id" : ObjectId("5da423e960c7ae48e3e09d4f"), "name" : "t1", "type" : "chinese", "num" : 60 }
{ "_id" : ObjectId("5da4240a60c7ae48e3e09d50"), "name" : "t2", "type" : "english", "num" : 50 }
{ "_id" : ObjectId("5da4243460c7ae48e3e09d51"), "name" : "t3", "type" : "math", "num" : 80 }
{ "_id" : ObjectId("5da4244560c7ae48e3e09d52"), "name" : "t4", "type" : "other", "num" : 20 }
{ "_id" : ObjectId("5da4256a60c7ae48e3e09d53"), "name" : "t5", "type" : "chinese", "num" : 60 }
---
db.class.aggregate({$group:{_id:'$type'}})  #分组查询
{ "_id" : "english" }
{ "_id" : "math" }
{ "_id" : "other" }
{ "_id" : "chinese" }
---
db.class.aggregate({$group:{_id:'$type',this:{$sum:1}}}) # 分组查询有多少组
{ "_id" : "english", "this" : 1 }
{ "_id" : "math", "this" : 1 }
{ "_id" : "other", "this" : 1 }
{ "_id" : "chinese", "this" : 2 }
---
db.class.aggregate({$group:{_id:'$type',this:{$sum:1},avgs:{$avg:'$num'}}}) # avg查询平均值
{ "_id" : "english", "this" : 1, "avgs" : 50 }
{ "_id" : "math", "this" : 1, "avgs" : 80 }
{ "_id" : "other", "this" : 1, "avgs" : 20 }
{ "_id" : "chinese", "this" : 2, "avgs" : 60 }
```


