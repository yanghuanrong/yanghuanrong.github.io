const fs = require('fs')
const path = require('path')
const matter = require('gray-matter');
const fileJSON = []
const blogPath = '../md'
const spawn = require('cross-spawn')

fs.readdir(path.resolve(__dirname, blogPath), (err, files) => {
  if (err) {
    return console.log('目录不存在')
  }
  console.log('Reading data')
  files.forEach((file, i) => {
    const filePath = path.resolve(__dirname, `${blogPath}/${file}`)

    const time = getGitLastUpdatedTimeStamp (filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const matterData = matter(fileContent).data

    const fileImport = fileContent.match(/import.*'/g)
    
    const blogList = []
    fileImport && fileImport.forEach((item) => {
      const data = item.split(' ')
      const name = data[1]
      const address = data[3].replace(/(\'*)/g, '')
      const ext = address.split('.').pop()
      const core = fs.readFileSync(path.resolve(__dirname, address), 'utf8')
      blogList.push({
        name,
        ext,
        path: address,

        core
      })
    })

    if(Object.keys(matterData).length){
      fileJSON.push({
        ...matterData,
        lastUpdated: defaultTransformer(time),
        blogName: `md${i}`,
        blogFile: file,
        blogList
      })
    }
  })
  const fileArray = fileJSON.sort((a, b) => (Date.parse(b.date) - Date.parse(a.date)))
  const dataJSON = `{"data":${JSON.stringify(fileArray, null, 2)}}`
  const dataPath = path.resolve(__dirname, `../data/data.json`)
  fs.writeFile(dataPath, dataJSON, err => {
    console.log('Data update success')
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
