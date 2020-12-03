const fs = require('fs')
const path = require('path').resolve
const matter = require('gray-matter');

const fileJSON = []

const blogPath = '../blog/md'

fs.readdir(path(__dirname, blogPath), (err, files) => {
  if (err) {
    return console.log('目录不存在')
  }
  console.log('正在读取md文件')
  files.forEach((file, i) => {
    const filePath = path(__dirname, `${blogPath}/${file}`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const matterData = matter(fileContent).data

    if(Object.keys(matterData).length){
      fileJSON.push({
        ...matterData,
        blogName: `md${i}`,
        blogFile: file,
      })
    }
  })

  // console.log('正在写入数据')

  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)))
  const dataJSON = `{ 
    "data":${JSON.stringify(fileArray)} 
  }`
  const dataPath = path(__dirname, `../src/utils/data.json`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('data.js文件更新成功')
    if (err) {
      console.error(err)
      return
    }
  })

})
