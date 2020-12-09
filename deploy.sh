# 确保脚本抛出遇到的错误
set -e

git add .
git commit -am 'deploy'
git push -u origin master

cd -