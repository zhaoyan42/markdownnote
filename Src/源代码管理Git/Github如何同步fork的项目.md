# Github如何同步fork的项目

## 添加上游仓储地址
### 先查看你fork的仓储地址
```command
$ git remote -v
# origin  https://github.com/
YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin  https://github.com/
YOUR_USERNAME/YOUR_FORK.git (push)
```

### 添加上游仓储地址
```command
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

### 再次查看你fork的仓储地址
```command
$ git remote -v
# origin    https://github.com/
YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin    https://github.com/
YOUR_USERNAME/YOUR_FORK.git (push)
# upstream  https://github.com/
ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
# upstream  https://github.com/
ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

## 同步上游仓储的改变
### 获取上游仓储的最新提交
这些提交会保存为本地分支 upstream/master
```command
$ git fetch upstream
# remote: Counting objects: 75, done.
# remote: Compressing objects: 100% (53/53), done.
# remote: Total 62 (delta 27), reused 44 (delta 9)
# Unpacking objects: 100% (62/62), done.
# From https://github.com/
ORIGINAL_OWNER/ORIGINAL_REPOSITORY
#  * [new branch]      master     -> upstream/master
```
### 然后签出fork仓储的分支
```command
$ git checkout master
# Switched to branch 'master'
```

### 最后把上游分支合并到本地分支
这样你可以合并上游的分支有不丢到你自己的改动。
```command
git merge upstream/master
# Updating a422352..5fdff0f
# Fast-forward
#  README                    |    9 -------
#  README.md                 |    7 ++++++
#  2 files changed, 7 insertions(+), 9 deletions(-)
#  delete mode 100644 README
#  create mode 100644 README.md
```
如果你本地没有改动，Git就只是做"fast-forward"
```command
$ git merge upstream/master
# Updating 34e91da..16c56ad
# Fast-forward
#  README.md                 |    5 +++--
#  1 file changed, 3 insertions(+), 2 deletions(-)
```

https://help.github.com/articles/syncing-a-fork/
