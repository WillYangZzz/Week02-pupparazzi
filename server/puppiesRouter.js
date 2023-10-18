import express from 'express'
import * as Path from 'node:path'
// import * as URL from 'node:url'
import * as URL from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'

const router = express.Router()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataFile = Path.join(__dirname, '/data/data.json')

const contents = await readFile(dataFile, { encoding: 'utf8' })
const parsedData = JSON.parse(contents)
const puppiesArray = parsedData.puppies

router.get('/:id', (req, res) => {
  const id = req.params.id
  const puppy = puppiesArray.find((dog) => {
    if (dog['id'] == id) {
      return true
    }
  })
  res.render('details', puppy)
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  const puppy = puppiesArray.find((dog) => {
    if (dog['id'] == id) {
      return true
    }
  })
  res.render('edit', puppy)
})

router.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const newData = req.body
})
export default router
