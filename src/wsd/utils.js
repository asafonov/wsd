const urls = {}
const dirnames = {}
const files = {}

const getKey = (domain, filename) => {
  return `${domain}/${filename}`
}

const unslash = str => {
  return str.replace(/\/+/g, '/')
}

const getUrl = (domain, filename) => {
  const key = getKey(domain, filename)

  if (! urls[key]) {
    urls[key] = unslash(`https://${domain}/${filename}`)
  }

  return urls[key]
}

const getDirname = (domain, filename) => {
  return unslash(`${domain}/${getServerDir(filename)}`)
}

const getServerDir = filename => {
  const key = filename

  if (! dirnames[key]) {
    dirnames[key] = filename.replace(/\/[^\/]+\.[^\/]+$/, '').replace(/^\/+/, '')
  }

  return dirnames[key]
}

const getFile = filename => {
  if (! files[filename]) {
    const file = filename.match(/[^\/]+\.[^\/]+$/)
    files[filename] = file ? file[0] : 'index.html'
  }

  return files[filename]
}

module.exports = {
  getUrl: getUrl,
  getDirname: getDirname,
  getFile: getFile,
  getServerDir: getServerDir
}
