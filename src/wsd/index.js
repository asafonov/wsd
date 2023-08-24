const downloader = require('./downloader')
const parser = require('./parser')

let domain
const processed = {}

const init = domain => {
  domain = domain
  console.log(`Working on ${domain}`)
  process(domain, '')
}

const process = (domain, filename) => {
  if (processed[filename]) return

  processed[filename] = true
  console.log(`Processing ${filename}`)
  downloader.get(domain, filename, contentType => {
    parser.parse(domain, filename, contentType, (domain, filename) => process(domain, filename))
  })
}

module.exports = {
  init: init
}
