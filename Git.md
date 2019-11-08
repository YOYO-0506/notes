# Git

## 初始化仓库
```shell
git init 
```

## 添加代码变更列表到暂存列表
```shell
git add .
```

## 确认存储
```shell
git commit -m "描述"
```

## 查看分支
```shell
git branch
```

## 创建分支
```shell
git branch <branchname>
```

## 切换分支
```shell
git checkout <branchname>
```

## 删除分支
```shell
git branch -d <branchname>
```

## 合并分支
```shell
git merge
```

## 在本地添加一个远程仓库地址
```shell
git remote add <name> <url>

git remote add github https://github.com/YOYO-0506/Project.git
```

## 查询当前有哪些远程仓库
```shell
git remote
```

## 删除远程仓库地址
```shell
git remote remove <name>
```

## 上传到远程仓库
```shell
git push <name> <branchname>

git push github master
```

## 绑定默认
```shell
git push -u <name> <branchname> 

# 第一次提交
git push -u github master

# 第二次提交
git push 
```



