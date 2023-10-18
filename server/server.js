import * as Path from 'node:path'
import * as URL from 'node:url'
import express, { Router } from 'express'
import hbs from 'express-handlebars'
// import { readdir, readFile } from 'node:fs/promises'
import fs from 'node:fs/promises'

// server/data
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataPath = Path.join(__dirname, '/data/data.json')
const data = await fs.readFile(dataPath, 'utf-8')
const puppiesData = JSON.parse(data)

console.log(puppiesData)

import puppyRouter from './routes/dog.js'
// import puppyDetails from './routes/details.js'

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
// server.use('puppies', puppyDetails.id)

server.get('/', (req, res) => {
  res.render('home', puppiesData)
})

const puppiesArray = puppiesData.puppies
server.get('/:id', (req, res) => {
  const id = req.params.id
  const puppyDetails = puppiesArray.find((puppyName) => {
    if (puppyName['id'] == id) {
      return true
    }
  })
  res.render('details', puppyDetails)
})

// server.get('/:id', (req, res) => {
//   const id = req.params.id
//   const puppyDetails = puppiesArray.find((puppyName) => {
//     if (puppyName['id'] == id) {
//       return true
//     }
//   })
//   res.render('edit', puppyDetails)
// })

// server.post('/edit/:id', (req, res) => {
//   const id = req.params.id
//   const newDetails = req.body

//   console.log(newDetails)
// })
export default server
