const fs = require('fs')
const path = require('path').resolve
const matter = require('gray-matter');
const fileJSON = []
const blogPath = '../md'

fs.readdir(path(__dirname, blogPath), (err, files) => {
  if (err) {
    return console.log('目录不存在')
  }
  console.log('正在读取md数据')
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
  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)))
  const dataJSON = `{"data":${JSON.stringify(fileArray, null, 2)}}`
  const dataPath = path(__dirname, `../data/data.json`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('数据更新成功')
    if (err) {
      console.error(err)
      return
    }
  })
})
