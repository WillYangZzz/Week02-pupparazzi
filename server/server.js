import * as Path from 'node:path'
// import * as URL from 'node:url'
import * as URL from 'node:url'
import { readFile } from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'
import puppiesRouter from './puppiesRouter.js'

//read data

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

//these lines of code fines the path to the data.json inside data folder
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataFile = Path.join(__dirname, '/data/data.json')

const contents = await readFile(dataFile, { encoding: 'utf8' })
const parsedData = JSON.parse(contents)

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  res.render('home', parsedData)
})

server.use('/', puppiesRouter)

export default server
