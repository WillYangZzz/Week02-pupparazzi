import * as Path from 'node:path'

import fs from 'node:fs/promises'
// import * as URL from 'node:url'

import express, { Router } from 'express'
import hbs from 'express-handlebars'
import { readFile } from 'node:fs'
import { log } from 'node:console'
import { isUtf8 } from 'node:buffer'

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

server.get('/', async (req, res) => {
  try {
    const getData = await fs.readFile('./server/data/data.json', 'utf-8')
    const unPack = JSON.parse(getData)
    res.render('home', unPack)
  } catch (error) {
    console.log('not found')
  }
})

export default server
