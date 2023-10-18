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

// calling things from the routes.js file
server.use('/puppies', puppiesRouter)

// homepage rendering puppies from home.hbs
server.get('/', async (req, res) => {
  const filePath = new URL('./data/data.json', import.meta.url)
  const contents = await readFile(filePath, { encoding: 'utf8' })
  const viewData = JSON.parse(contents)
  try {
    res.render('home', viewData)
  } catch (err) {
    console.error(err.message)
  }
})

server.get('/new', async (req, res) => {
  res.render('new')
})

server.post('/new', async (req, res) => {
  const filePath = new URL('./data/data.json', import.meta.url)
  const contents = await readFile(filePath, { encoding: 'utf8' })
  const viewData = JSON.parse(contents)
  const pupArray = viewData.puppies
  // object for the newly created dog
  const createdPup = {
    id: pupArray.length + 1,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed,
  }
  // pushing the object to the original array
  pupArray.push(createdPup)

  // writing the newobject to the original JSON file - need to stringify before though
  await writeFile(filePath, JSON.stringify(viewData, null, '\t'))
  res.render('home', viewData)
})

export default server
