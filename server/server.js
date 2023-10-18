import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'

import puppiesRouter from './routes.js'
import { getPuppies } from './utils/getData.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// routes/router(s)
server.use('/puppies', puppiesRouter)

server.get('/', async (req, res) => {
  const puppyData = await getPuppies()
  res.render('home', puppyData)
})

export default server
