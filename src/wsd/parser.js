const fs = require('fs')
const {getUrl, getDirname, getFile, getServerDir} = require('./utils')

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
    urls.push(parseUrl(i[1], domain, filename))
  }

  console.log(urls)
}

const parseUri = (url, domain, filename) => {
  return `URI:${url}`
}

const parseLocal = (url, domain, filename) => {
  if (url[0] === '/') {
    return url
  } else {
    return `${getServerDir(domain, filename)}/${url}`
  }
}

const parseUrl = (url, domain, filename) => {
  if (url.indexOf('://') > -1) {
    return parseUri(url, domain, filename)
  } else {
    return parseLocal(url, domain, filename)
  }
}

module.exports = {
  parse: parse
}
