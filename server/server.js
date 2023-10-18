import * as Path from 'node:path'
// import * as URL from 'node:url'
import router from './routes.js'

import express from 'express'
import hbs from 'express-handlebars'
// import * as pups from './data/data.json'

// const filePath = new URL('./data/data.json', import.meta.url)

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
server.use('/puppies', router)
export default server
