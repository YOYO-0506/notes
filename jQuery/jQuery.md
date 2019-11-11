# jQuery

## JavaScript库
JavaScript库，即library，是一个封装好的特定的集合（方法和函数）。从封装一大堆函数的角度理解库，就是这个库中，封装了很多预先定义好的函数在里面，比如动画animate，hide，show，获取元素等

## jQuery的入口函数
```js
  // 等待页面DOM加载完毕再去执行代码
    $(function () {
      $('div').hide()
    })
```

## jQuery对象和DOM对象
1. 用原生JS获取来的对象就是DOM对象
2. jQuery方法获取的元素就是jQuery对象
3. jQuery对象本质是：利用$对DOM对象包装后产生的对象（伪数组形式存储）
4. jQuery对象只能用jQuery方法，DOM对象则使用原生的JavaScript属性和方法

### DOM对象与jQuery对象之间是可以相互转换的
1. DOM对象转换为jQuery对象：`$(DOM对象)`
```js
let myVideo = document.querySelectorAll('video')
$(myVideo)
```

2. jQuery对象转换为DOM对象（两种方式）

* `$('video')[index]` index是索引号
* `$('video').get(index)` index是索引号

```js
$('video')[0].play()
$('video').get(0).play()
```



## jQuery基础选择器

名称 | 用法 | 描述 | 
- | :-: | :-: | 
ID选择器 | `$("#id")` | 获取指定ID的元素 | 
全选选择器 | `$("*")`| 匹配所有元素 | 
类选择器 | `$(".class")` | 获取同一类class的元素 | 
标签选择器 | `$("div")`| 获取同一类标签的所有元素 | 
并集选择器 | `$("div,p,li")` | 选取多个元素 | 
交集选择器 | `$("li.current")`| 交集元素 | 

## jQuery层级选择器
名称 | 用法 | 描述 | 
- | :-: | :-: | 
子代选择器 | `$("ul>li")` | 使用`>`号，获取亲儿子层级的元素；注意：并不会获取孙子层级的元素 | 
后代选择器 | `$("ul li")`| 使用空格，代表后代选择器，获取ul下所有的li元素，包括孙子等 | 

## 隐式迭代
遍历内部DOM元素（伪数组形式存储）的过程就叫做**隐式迭代**

简单理解：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，简化我们的操作，方便我们调用

## jQuery筛选选择器


名称 | 用法 | 描述 | 
- | :-: | :-: | 
:first | `$("li:first")` | 获取第一个li元素 | 
:last | `$("li:last")`| 获取最后一个li元素 | 
:eq(index) | `$("li:eq(2)")` | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始 | 
:odd | `$("li:odd")`| 获取到的li元素中，选择索引号为**奇数**的元素 | 
:even | `$("li:even")` | 获取到的li元素中，选择索引号为**偶数**的元素  | 

## jQuery筛选方法（重点）
名称 | 用法 | 描述 | 
- | :-: | :-: | 
`parent()` | `$("li").parent()` |查找父级  | 
`children(selector)` | `$("ul").children("li")`|相当于`$("ul>li")`，最近一级（亲儿子） | 
`find(selector)` | `$("ul").find("li")` | 相当于`$("ul li")`，后代选择器 | 
`siblings(selector)` | `$(".first").siblings("li")`|查找兄弟节点，不包括自己本身  | 
`nextAll([expr])` | `$(".first").nextAll()` |查找当前元素之后所有的同辈元素  | 
`prevAll([expr])` | `$("last").prevAll()` |查找当前元素之前所有的同辈元素  | 
`hasClass(class)` | `$("div").hasClass("protected")`|检查当前的元素是否含有某个特定的类，如果有，则返回`true`  | 
`eq(index)` | `$("li").eq(2)` |相当于`$("li:eq(2)")`，index从0开始  | 

## 链式编程
链式编程是为了节省代码量，看起来更优雅
```js
$(this).css('color','red').siblings(this).css('color','blue')
```

## 操作css方法
jQuery可以使用css方法来修改简单元素样式，也可以操作类，修改多个样式

1. 参数只写属性名，则是返回属性值
```js
$(this).css("color")
```
2. 参数**属性名，属性值，逗号分隔**，是设置一组样式，属性必须加引号， 值如果是数字可以不用跟单位和引号
```js
$(this).css("color","red")
```
3. 参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开，属性可以不用加引号
```js
$(this).css({
  "color":"red",
  "fontSize":"20px"
})
```

## 设置类样式方法
1. 添加类
```js
$("div").addClass("current")
```
2. 删除类
```js
$("div").removeClass("current")
```
3. 切换类
```js
$("div").toggleClass("current")
```
### 类操作和className区别
原生JS中className会覆盖元素原先里面的类名

jQuery里面类操作只是对指定类进行操作，不影响原先的类名

## 显示隐藏效果
1. 显示效果
```js
$(function(){
  $('button').eq(0).click(function(){
    $('div').show()
  })
})
```

2. 隐藏效果

```js
$(function(){
  $('button').eq(1).click(function(){
    $('div').hide()
  })
})
```

3. 切换效果
```js
$(function(){
  $('button').eq(2).click(function(){
    $('div').toggle()
  })
})
```