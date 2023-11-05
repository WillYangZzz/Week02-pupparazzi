import express from 'express'

import * as Path from 'node:path'
import * as url from 'node:url'

import { readFile, writeFile } from 'node:fs/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const jsonPath = Path.join(__dirname, './data/data.json')

const router = express.Router()

// router.get('/:id', async (req, res) => {
//   try {
//     const getData = await readFile(jsonPath, 'utf-8')
//     const unPack = JSON.parse(getData)

//     const byId = req.params.id(unPack)

//     res.render('details', byId)
//   } catch (error) {
//     console.log('not found')
//   }
// })

router.get('/:id', async (req, res) => {
  try {
    const getData = await readFile(jsonPath, 'utf-8')
    const unPack = JSON.parse(getData)
    const byId = unPack.find((puppy) => puppy.id === Number(req.params.id))

    res.render('details', byId)
  } catch (error) {
    console.log('not found')
  }
})

export default router
