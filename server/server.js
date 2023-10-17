import * as Path from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises' //promises
// import * as URL from 'node:url'
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

// Your routes/router(s) should go here
// assigning path for data file & making the data into an object here
const filePath = new URL('./data/data.json', import.meta.url)
const contents = await readFile(filePath, { encoding: 'utf8' })
const viewData = JSON.parse(contents)

// calling things from the routes.js file
server.use('/puppies', puppiesRouter)

// homepage rendering puppies from home.hbs
server.get('/', async (req, res) => {
  try {
    res.render('home', viewData)
  } catch (err) {
    console.error(err.message)
  }
})

export default server
