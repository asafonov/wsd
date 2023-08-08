const fs = require('fs')
const {getUrl, getDirname, getFile} = require('./utils')

const parse = (domain, filename, contentType) => {
  if (contentType.indexOf('text') === false) {
    return
  }

  const dirname = getDirname(domain, filename)
  const file = getFile(filename)
  const content = fs.readFileSync(`${dirname}/${file}`).toString()
  const m = content.matchAll(/<a[^>]+href=['"](.*?)['"]/g)
  const urls = []

  for (let i of m) {
    urls.push(i[1])
  }
}

module.exports = {
  parse: parse
}
