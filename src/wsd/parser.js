const fs = require('fs')
const {getUrl, getDirname, getFile, getServerDir} = require('./utils')

const parse = (domain, filename, contentType, onUrlFound) => {
  if (contentType.indexOf('text') === -1) {
    return
  }

  const dirname = getDirname(domain, filename)
  const file = getFile(filename)
  let content = fs.readFileSync(`${dirname}/${file}`).toString()
  content = processUrls(/<a[^>]+href=['"](.*?)['"]/g, content, domain, filename, onUrlFound)
  content = processUrls(/<img[^>]+src=['"](.*?)['"]/g, content, domain, filename, onUrlFound)
  fs.writeFileSync(`${dirname}/${file}`, content)
}

const processUrls = (regex, content, domain, filename, onUrlFound) => {
  const m = content.matchAll(regex)

  for (let i of m) {
    const url = parseUrl(i[1], domain, filename)

    if (url) {
      onUrlFound(domain, url)
      content = content.replace(new RegExp(`['"]${i[1]}['"]`, 'g'), `"${url}"`)
    }
  }

  return content
}

const isEmptyUrl = url => {
  return url.indexOf('mailto:') === 0
}

const parseUri = (url, domain, filename) => {
  const uri = new URL(url)
  return uri.hostname === domain ? uri.pathname + uri.search : null
}

const parseLocal = (url, domain, filename) => {
  if (url[0] === '/') {
    return url
  } else {
    return `${getServerDir(filename)}/${url}`
  }
}

const parseUrl = (url, domain, filename) => {
  if (url.indexOf('://') > -1) {
    return parseUri(url, domain, filename)
  } else if (isEmptyUrl(url)) {
    return
  } else {
    return parseLocal(url, domain, filename)
  }
}

module.exports = {
  parse: parse
}
