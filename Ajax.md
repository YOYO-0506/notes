# AJAX
> AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
# 向服务器发送请求
```js
xmlhttp.open("GET","ajax_info.txt",true);
xmlhttp.send();
```
# 使用表单的submit事件来处理请求 
```js
// 使用表单的submit事件来处理请求
$("#login").submit(function(event) {
    // 阻止刷新页面
    event.preventDefault();
    
    var data = $(this).serialize()
    // console.log(data)
    $.post("/users/login", data, function(res)  {
        if (res.success) {
            console.log(res);
        } else {
            alert(res.message)
        }
    })
});

// 1. 通过submit事件来监听表单提交
// 2. 阻止刷新页面 event.preventDefault();
// 3. 通过表单元素对象可以获取表单里的数据 $(表单元素).serialize() 方法
// 4.  $.post(url, body, callback);
        
```
