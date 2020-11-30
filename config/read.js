const fs = require('fs')
const path = require('path').resolve
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

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
    const fileHTML = md.render(fileContent);
    const title = fileHTML.match(/<h1.*?>(.*?)<\/h1>/)

    const fileInfo = fs.statSync(filePath)

    fileJSON.push({
      title: title[1],
      file: file,
      ctime: fileInfo.birthtime,
      components: `md${i}`,
      createTime: timeFormat(fileInfo.birthtime)
    })
  })

  console.log('正在写入数据')

  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.ctime) - Date.parse(a.ctime)))

  const dataJSON = `export default { data:${JSON.stringify(fileArray)} }`
  
  const dataPath = path(__dirname, `../src/utils/data.js`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('data.js文件更新成功')
    if (err) {
      console.error(err)
      return
    }
  })

})


function timeFormat(time){
  const date = new Date(time)

  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate() 
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()  

  m = m < 10 ? `0${m}` : m
  d = d < 10 ? `0${d}` : d
  hh = hh < 10 ? `0${hh}` : hh
  mm = mm < 10 ? `0${mm}` : mm
  ss = ss < 10 ? `0${ss}` : ss

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}