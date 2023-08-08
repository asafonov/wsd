const fs = require('fs')
const http = require('https')
const binaryFiles = ['.jpg', '.jpeg', '.gif', '.png', '.mp3', '.ogg', '.mp4']
const urls = {}
const dirnames = {}
const files = {}
const downloads = {}

const getKey = (domain, filename) => {
  return `${domain}/${filename}`
}

const getUrl = (domain, filename) => {
  const key = getKey(domain, filename)

  if (! urls[key]) {
    urls[key] = `https://${domain}/${filename}`
  }

  return urls[key]
}

const getDirname = (domain, filename) => {
  const key = getKey(domain, filename)

  if (! dirnames[key]) {
    dirnames[key] = `${domain}/${filename}`.replace(/\/[^\/]+\.[^\/]+$/, '').replace(/^\/+/, '')
  }

  return dirnames[key]
}

const getFile = (filename) => {
  if (! files[filename]) {
    const file = filename.match(/[^\/]+\.[^\/]+$/)
    files[filename] = file ? file[0] : 'index.html'
  }

  return files[filename]
}

const get = (domain, filename) => {
  const url = getUrl(domain, filename)

  if (downloads[urls]) return

  const dirname = getDirname(domain, filename)
  const file = getFile(filename)

  try {
    fs.mkdirSync(dirname, {recursive: true})
  } catch {}

  console.log(`Getting ${url}`)

  const f = fs.createWriteStream(`${dirname}/${file}`)
  const request = http.get(url, response => {
    response.pipe(f)
    f.on('finish', () => {
      f.close()
      console.log(`${dirname}/${file} saved`)
      downloads[url] = true
      parse(domain, filename, response.headers['content-type'])
    })
  })
}

const parse = (domain, filename, contentType) => {
  if (contentType.indexOf('text') === false) {
    return
  }

  const dirname = getDirname(domain, filename)
  const file = getFile(filename)
  const content = fs.readFileSync(`${dirname}/${file}`).toString()
}

module.exports = {
  get: get
}
