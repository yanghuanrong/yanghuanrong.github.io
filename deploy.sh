# 确保脚本抛出遇到的错误
set -e

git add .
git commit -am 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名
git push -u origin master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -