import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'

import { getPuppies } from './utils/getData.js'
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

// Your routes/router(s) should go here
server.get('/', async (req, res) => {
  const puppyData = await getPuppies()
  res.render('home', puppyData)
})

export default server
