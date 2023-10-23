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

const router = express.Router()

router.get('/', async (req, res) => {
  const parsedPuppiesData = await readData()
  const template = 'home'

  res.render(template, parsedPuppiesData)
})

router.get('/add', (req, res) => {
  const template = 'new'

  res.render(template)
})

// needs refactoring
router.post('/add', async (req, res) => {
  let parsedPuppiesData = await readData()

  // TODO: refactor this to use map and Math.max to calulcate the highest id in the data
  let idArr = parsedPuppiesData.puppies.map(item => item.id)
  let newId
  idArr.length > 0? newId = Math.max(...idArr)+1: newId = 1

  const newPuppy = {
    id: newId,
    ...req.body
  }

  // TODO: refactor this code to use the spread operator
  parsedPuppiesData.puppies = [...parsedPuppiesData.puppies,newPuppy]

  await fs.writeFile(
    Path.join(__dirname, `./data/data.json`),
    JSON.stringify(parsedPuppiesData, null, 2),
    {
      encoding: 'utf-8',
    }
  )

  res.redirect(`/puppies/${newId}`)
})

// needs refactoring
router.get('/delete/:id', async (req, res) => {
  const parsedPuppiesData = await readData()
  const id = Number(req.params.id)

  // TODO: refactor filter to remove the if condition
  const newArr = parsedPuppiesData.puppies.filter(item => item.id !== id)
  const newData = {
    puppies: newArr,
  }

  await fs.writeFile(
    Path.join(__dirname, `./data/data.json`),
    JSON.stringify(newData, null, 2),
    {
      encoding: 'utf-8',
    }
  )

  res.redirect('/puppies')
})

router.get('/:id', async (req, res) => {
  const parsedPuppiesData = await readData()
  const value = req.params.id
  const puppiesData = parsedPuppiesData.puppies.find(
    (item) => item.id === Number(value)
  )
  const template = 'details'

  res.render(template, puppiesData)
})

router.get('/edit/:id', async (req, res) => {
  const parsedPuppiesData = await readData()
  const value = req.params.id
  // TODO: remove the if condition
  const puppiesData = parsedPuppiesData.puppies.find(item => item.id === Number(value))
  const template = 'edit'

  res.render(template, puppiesData)
})

router.post('/edit/:id', async (req, res) => {
  const parsedPuppiesData = await readData()

  const value = req.params.id

  const newArr = parsedPuppiesData.puppies.map((item) =>
    item.id === Number(value)
      ? {
          ...item,
          ...req.body
        }
      : item
  )

  const newData = {
    puppies: newArr,
  }

  await fs.writeFile(
    Path.join(__dirname, `./data/data.json`),
    JSON.stringify(newData, null, 2),
    {
      encoding: 'utf-8',
    }
  )

  res.redirect(`/puppies/${value}`)
})

export default router
