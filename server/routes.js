import express from 'express'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

// Read file

async function readData() {
  const data = await fs.readFile(Path.join(__dirname, `./data/data.json`), {
    encoding: 'utf-8',
  })
  return JSON.parse(data)
}

const parsedPuppiesData = await readData()

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

router.get('/edit/:id', (req, res) => {
  const value = req.params.id
  const puppiesData = parsedPuppiesData['puppies'].find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  const template = 'edit'

  res.render(template, puppiesData)
})

router.post('/edit/:id', (req, res) => {
  const value = req.params.id
  const name = req.body.name
  const breed = req.body.breed
  const owner = req.body.owner

  const newArr = parsedPuppiesData['puppies'].map((item) => {
    if (item['id'] === Number(value)) {
      item['name'] = name
      item['breed'] = breed
      item['owner'] = owner
    }
    return item
  })

  const newData = {
    puppies: newArr,
  }

  fs.writeFile(
    Path.join(__dirname, `./data/data.json`),
    JSON.stringify(newData, null, 2),
    {
      encoding: 'utf-8',
    }
  )

  res.redirect(`/puppies/${value}`)
})

router.get('/add', (req, res) => {
  const template = 'add'

  res.render(template)
})

export default router
