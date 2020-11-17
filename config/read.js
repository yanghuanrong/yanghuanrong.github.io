const fs = require('fs')
const path = require('path').resolve
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

const fileJSON = []

fs.readdir(path(__dirname, '../blog'), (err, files) => {
  if (err) {
    return console.log('目录不存在')
  }

  files.forEach((file, i) => {
    const filePath = path(__dirname, `../blog/${file}`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const fileHTML = md.render(fileContent);
    const title = fileHTML.match(/<h1.*?>(.*?)<\/h1>/)

    const fileInfo = fs.statSync(filePath)

    fileJSON.push({
      title: title[1],
      file: file,
      ctime: fileInfo.ctime,
      components: `md${i}`,
      createTime: timeFormat(fileInfo.ctime)
    })
  })

  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.ctime) - Date.parse(a.ctime)))

  const dataJSON = `export default { data:${JSON.stringify(fileArray)} }`
  
  const dataPath = path(__dirname, `../src/utils/data.js`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('src/utils/data.json文件更新成功')
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