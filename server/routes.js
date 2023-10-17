import express from 'express'
import * as Path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

import fs from 'node:fs/promises'

const dataPath = Path.join(__dirname, './data/data.json')

const router = express.Router()

router.get('/:id', async (req, res) => {
  const data = await fs.readFile(dataPath, 'utf-8')
  const puppiesData = JSON.parse(data)
  const puppyId = req.params.id
  const puppyObj = puppiesData.puppies.find((el) => el.id == puppyId)
  res.render('details', puppyObj)
})

export default router
