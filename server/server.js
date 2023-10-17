import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'

import { readFile } from 'node:fs/promises'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Get puppy data
let dataJSON
try {
  const filePath = new URL('./data/data.json', import.meta.url)
  const data = await readFile(filePath, { encoding: 'utf8' })
  dataJSON = JSON.parse(data)
  // console.log(data)
} catch (err) {
  console.error(err.message)
}

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  res.render('home', dataJSON)
})
export default server
