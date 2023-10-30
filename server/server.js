import * as Path from 'node:path'
import * as URL from 'node:url'
import express from 'express'
import hbs from 'express-handlebars'
import { readFile } from 'node:fs/promises'
import router from './routes.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

//reading data from the JSON file
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataPath = Path.join(__dirname, './data/data.json')

//Making it a function
export async function readingData() {
  let puppydetails = await readFile(dataPath)
  let parsePuppy = JSON.parse(puppydetails)
  return parsePuppy
}
// using created routes
server.use('/puppies', router)
// server.use('/edit'  , router)

// Your routes/router(s) should go here
server.get('/', async (req, res) => {
  const parsePuppy = await readingData()
  res.render('home', parsePuppy)
})

export default server
