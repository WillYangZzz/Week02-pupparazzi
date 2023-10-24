import * as Path from 'node:path'
// import * as URL from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'
import puppiesRouter from './routes.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

server.use('/puppies', puppiesRouter)

server.get('/', async (req, res) => {
  const jsonString = await readFile('server/data/data.json', {
    encoding: 'utf-8',
  })
  const data = JSON.parse(jsonString)
  console.log(data)
  //res.send('Pupparazzi')

  const viewData = data
  res.render('home', viewData)
})

export default server
