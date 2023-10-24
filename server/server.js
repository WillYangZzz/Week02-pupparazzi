import * as Path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

import express from 'express'
import hbs from 'express-handlebars'
import puppyRouter from './routes.js'
import fs from 'node:fs/promises'

const dataPath = Path.join(__dirname, './data/data.json')

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

server.use('/puppies', puppyRouter)

server.get('/', async (req, res) => {
  const data = await fs.readFile(dataPath, 'utf-8')
  const puppiesData = JSON.parse(data)
  res.render('home', puppiesData)
})

export default server
