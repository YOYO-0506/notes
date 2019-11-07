# 阻止冒泡事件
```js
event.stopPropagation();
```

# 监听事件类型
```js
parent.addEventListener("click", function(e) {
		alert("parent 触发了点击事件");
	}, {
		// 在捕获阶段执行事件
		capture: true,
		// 时间只执行一次之后就取消委托（监听）
		once: true
	})
```
* capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
* once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。

# 阻止默认的点击事件执行
```js
event.preventDefault();
```

