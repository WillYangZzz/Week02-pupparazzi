import * as Path from 'node:path'

import express from 'express'
import hbs from 'express-handlebars'
import { readFile } from 'node:fs/promises'
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
server.use('/puppies', puppiesRouter)

server.get('/', async (req, res) => {
  const dogData = await puppyData()
  res.render('home', dogData)
})

export default server

export async function puppyData() {
  return readFile('server/data/data.json')
    .then(function (result) {
      const parsedData = JSON.parse(result)
      return parsedData
    })
    .catch(function (error) {
      console.log(error)
    })
}
