const downloader = require('./downloader')
const parser = require('./parser')

let domain

const init = domain => {
  domain = domain
  console.log(`Working on ${domain}`)
  process(domain, '')
}

const process = (domain, filename) => {
  downloader.get(domain, '', contentType => {
    parser.parse(domain, filename, contentType, (domain, filename) => process(domain, filename))
  })
}

module.exports = {
  init: init
}
