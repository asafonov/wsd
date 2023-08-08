const fs = require('fs')

const get = async (domain, filename) => {
  const url = `https://${domain}/${filename}`
  const dirName = `${domain}/${filename}`.replace(/\/[^\/]+\.[^\/]+$/, '').replace(/^\/+/, '')
  let file = filename.match(/[^\/]+\.[^\/]+$/)
  file = file ? file[0] : 'index.html'

  try {
    fs.mkdirSync(dirName, {recursive: true})
  } catch {}

  console.log(`Getting ${url}`)
}

module.exports = {
  get: get
}
