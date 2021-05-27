const fs = require('fs')
const path = require('path')
const matter = require('gray-matter');
const spawn = require('cross-spawn')
const md5 = require('md5')
const fileJSON = []
const typeJson = {}
const blogPath = '../md'

fs.readdir(path.resolve(__dirname, blogPath), (err, files) => {
  if (err) {
    return console.log('目录不存在')
  }
  console.log('✨ Reading data')
  files.forEach((file, i) => {
    const filePath = path.resolve(__dirname, `${blogPath}/${file}`)

    const time = getGitLastUpdatedTimeStamp (filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const matterData = matter(fileContent).data
    const { tag } = matterData
    
    if(typeJson[tag]) {
      typeJson[tag] += 1
    } else {
      typeJson[tag] = 1
    }

    if(Object.keys(matterData).length){
      fileJSON.push({
        ...matterData,
        lastUpdated: defaultTransformer(time),
        id: md5(file),
        fileName: file
      })
    }
  })
  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)))
  const dataJSON = `{
    "data":${JSON.stringify(fileArray, null, 2)}, 
    "tag": ${JSON.stringify(typeJson, null, 2)}
  }`
  const dataPath = path.resolve(__dirname, `../data/data.json`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('🚀 Data update success')
    if (err) {
      console.error(err)
      return
    }
  })
})

function defaultTransformer (timestamp, lang, dateOptions) {
  return new Date(timestamp).toLocaleString(lang, dateOptions)
}

function getGitLastUpdatedTimeStamp (filePath) {
  let lastUpdated
  try {
    lastUpdated = parseInt(spawn.sync(
      'git',
      ['log', '-1', '--format=%at', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8')) * 1000
  } catch (e) { /* do not handle for now */ }
  return lastUpdated
}
