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
    const puppiesObj = JSON.parse(getData)
    const puppiesArr = puppiesObj.puppies
    const puppyById = puppiesArr.find(
      (puppy) => puppy.id === Number(req.params.id)
    )
    res.render('details', puppyById)
  } catch (error) {
    console.log('not found')
  }
})

export default router
