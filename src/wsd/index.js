const downloader = require('./downloader')

let domain

const init = domain => {
  domain = domain
  console.log(`Working on ${domain}`)
  downloader.get(domain, '')
}

module.exports = {
  init: init
}
