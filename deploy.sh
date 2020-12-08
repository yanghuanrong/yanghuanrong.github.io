# 确保脚本抛出遇到的错误
set -e

git add .
git commit -am 'deploy'
git push -u origin dev
git checkout master
git merge dev
git push -u origin master
git checkout dev

cd -