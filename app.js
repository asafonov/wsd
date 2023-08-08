#!/usr/bin/env node
const wsd = require('./src/wsd')

if (process.argv.length < 3) {
  console.error('Usage: wsd ${domain}')
  return
}

const domain = process.argv[2]

const app = async () => {
  wsd.init(domain)
}

app()
