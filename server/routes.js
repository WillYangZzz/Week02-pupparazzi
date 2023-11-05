import express from 'express'

import * as Path from 'node:path'
import * as url from 'node:url'

import { readFile, writeFile } from 'node:fs/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const jsonPath = Path.join(__dirname, './data/data.json')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const getData = await readFile(jsonPath, 'utf-8')
    const unPack = JSON.parse(getData)
    // Have to dot into the puppies object of unPack, so that you can use find on an array.
    const byId = unPack.puppies.find(
      (puppy) => puppy.id === Number(req.params.id)
    )
    // Also edited the <a> href link in 'home' for a single puppy - added `puppies/{{id}}`
    res.render('details', byId)
  } catch (error) {
    console.log('not found')
  }
})

export default router
