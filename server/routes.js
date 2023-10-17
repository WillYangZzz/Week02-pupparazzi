import express from 'express'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

// Read file
const puppiesData = await fs.readFile(
  Path.join(__dirname, `./data/data.json`),
  {
    encoding: 'utf-8',
  }
)

const parsedPuppiesData = JSON.parse(puppiesData)

const router = express.Router()

router.get('/', (req, res) => {
  const template = 'home'

  res.render(template, parsedPuppiesData)
})

router.get('/:id', (req, res) => {
  const value = req.params.id
  const puppiesData = parsedPuppiesData['puppies'].find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  const template = 'details'

  res.render(template, puppiesData)
})

export default router
