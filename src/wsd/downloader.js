const fs = require('fs')
const http = require('https')
const {getUrl, getDirname, getFile} = require('./utils')
const downloads = {}

const get = (domain, filename, onDownloaded) => {
  const url = getUrl(domain, filename)

  if (downloads[url]) return

  const dirname = getDirname(domain, filename)
  const file = getFile(filename)

  try {
    fs.mkdirSync(dirname, {recursive: true})
  } catch {}

  console.log(`Getting ${url}`)

  const request = http.get(url, response => {
    if (response.statusCode !== 200) return

    const f = fs.createWriteStream(`${dirname}/${file}`)
    response.pipe(f)
    f.on('finish', () => {
      f.close()
      console.log(`${dirname}/${file} saved`)
      downloads[url] = true
      onDownloaded && onDownloaded(response.headers['content-type'])
    })
  })
}

module.exports = {
  get: get
}
