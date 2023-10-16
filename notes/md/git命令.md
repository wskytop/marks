---
title: Git 常用命令
date: 2021-11-25 19:39:00
tags: git
cover_picture:
---



##### git config:

```arduino
# 检查一下用户名和邮箱是否配置
git config --blobal --list

# 设置全局用户
git config --global user.name 'your name' 
git config --global user.email 'xxxxx@example.com'

# 设置局部用户
git config --local user.name 'your name'   
git config --local user.email 'xxxxx@example.com' 
```



##### git reset 代码回滚：

> 让代码回滚到指定的提交版本，并且不保留原来的commit记录。

```
# HEAD^ 代表上个版本
# 回退到上一个版本，之前所做的更改都会消失
git reset --hard HEAD^ 
git reset --hard commit_id

# 回退到上一个版本，之前所作的更改都在
git reset --soft HEAD~
git reset --soft commit_id

# 强推到远程 
git push -f origin <branch name>
```



##### git revert 代码回滚：

> 撤销指定的提交，并产生一个新的commit，但保留了原来的commit记录。

```
# 撤销指定的提交版本 
git revert <commit_id>

# 撤销的版本范围 
git revert <commit_id1>..<commit_id2>

# 撤销上一次提交 
git revet HEAD

# 撤销上上次提交 
git revet HEAD^
```



##### 新建代码库：

```
# 在当前目录新建一个 git 代码库
git init
# 新建一个目录，将其初始化为git代码库
git init name
# 下载一个项目和它的整个代码历史
git clone [url]
```



##### 查看文件状态：

```
# 查看指定文件状态
git status [filename]
# 查看全部文件状态
git status
```



##### git分支常用命令：

```
# 列出所有分支
git branch

# 列出所有远程分支
git branch -r

# 切换分支
git checkout [branch-name]

# 新建一个分支，但依旧停留在当前分支
git branch [branch-name]
 
# 新建一个分支，并切换到该分支
git checkout -b [branch-name]

# 新建远程分支
git push origin branchName

# 合并指定分支到当前分支
git merge [branch-name]

# 删除分支
git branch -d [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch-name]

# 提交到暂存区
git add .

# 提交到本地仓库
git commit -m '这是我第一次提交'

# 提交到远程仓库
git push 

# 拉取远程仓库代码
git pull

# 提交到远程仓库(云端没有分支)
git push -u origin [branch-name]

# 存储工作区内容
git stash

# 释放上一次存储内容
git stash pop

# 回退到上一个版本，之前所做的更改都会消失
git reset --hard HEAD^ 

# 回退到上一个版本，之前所作的更改都在
git reset --soft HEAD~

# 强行将本地分支提交到远程分支；
git push -f origin <branch name>

# 取消合并
git merge --abort

# 提取某次提交到当前分支
git cherry-pick -n 8c99195431aa2e6cf8860990be7f368c6ef81bab(提交哈希)
```

##### commit message规范：

```
feat:新功能
fix:修复bug
style:格式
merge：代码合并
docs：文档
perf: 代码优化
revert：回滚到上一个版本
test：增加测试
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
```

