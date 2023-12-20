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

router.get('/:id/edit', async (req, res) => {
  const data = await fs.readFile(dataPath, 'utf-8')
  const puppiesData = JSON.parse(data)
  const puppyId = req.params.id
  const editPuppy = puppiesData.puppies.find((el) => el.id == puppyId)
  res.render('edit', editPuppy)
})

router.post('/:id/edit', async (req, res) => {
  const puppyId = req.params.id
  const puppyObj = { id: puppyId, ...req.body }

  const data = await fs.readFile(dataPath, 'utf-8')
  const puppiesData = JSON.parse(data)
  // puppiesData.puppies[puppyId - 1] = puppyObj

  const updatedPuppy = puppiesData.puppies.map((el) => {
    if (el.id == puppyId) {
      el = puppyObj
    }
    return el
  })

  await fs.writeFile(
    dataPath,
    JSON.stringify({ puppies: updatedPuppy }, null, 2),
    'utf-8'
  )

  res.redirect(`/puppies/${req.params.id}`)
})

export default router
