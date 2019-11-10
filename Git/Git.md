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

## 克隆项目
```shell
git clone <url>

git clone https://github.com/weblemon/web1911-04.git
```
## 同步远程仓库
```shell
git pull 
```

## 拉取分支
```shell
git fetch  <仓库名称> <远程分支名称> : <本地分支名称>

git fetch origin dev:dev

# 建议本地分支名称与远程分支名称一样
```

## 忽略文件上传
> 新建一个文件 .gitignore

```shell
# 忽略哪些文件不用上传

# 重命名选择 如：package-lock.json   02/1.txt

# 通配符选择 如: *.json    02/*.txt

# 选择目录 如： node_modules/


```

## GitLab

生成SSH密钥
```shell
ssh-keygen -t rsa -C "1119663769@qq.com"

# 需要设置密码
# Enter passphrase (empty for no passphrase): 
# 重复输入密码
# Enter same passphrase again: 

# 选择后缀名为pub的文件内容即可
```
