import * as Path from 'node:path'
// import * as URL from 'node:url'
// import fs from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'

import puppiesRouter from './routes.js'

// const __filename = URL.fileURLToPath(import.meta.url)
// const __dirname = Path.dirname(__filename)

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
server.get('/', (req, res) => {
  res.send('This is homePage')
})

server.use('/puppies', puppiesRouter)

export default server
