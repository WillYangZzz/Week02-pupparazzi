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

router.post('/add', async (req, res) => {
  let parsedPuppiesData = await readData()
  let idArr = []
  for (let i=0; i<parsedPuppiesData['puppies'].length; i++) {
    idArr.push(parsedPuppiesData['puppies'][i]['id'])
  }
  let maxId
  if (idArr.length>0) {maxId = Math.max(...idArr)}else{maxId=0}
  const newId = maxId + 1
  const newPuppy = {
    id: newId,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed,
  }
  parsedPuppiesData['puppies'].push(newPuppy)

  await fs.writeFile(
    Path.join(__dirname, `./data/data.json`),
    JSON.stringify(parsedPuppiesData, null, 2),
    {
      encoding: 'utf-8',
    }
  )

  res.redirect(`/puppies/${newId}`)
})

router.get('/delete/:id', async (req, res) => {
  const parsedPuppiesData = await readData()
  const id = Number(req.params.id)
  const newArr = parsedPuppiesData['puppies'].filter((item) => {
    if (item['id'] === id) {
      return false
    } else {
      return true
    }
  })
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
  const puppiesData = parsedPuppiesData['puppies'].find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  const template = 'details'

  res.render(template, puppiesData)
})

router.get('/edit/:id', async (req, res) => {
  const parsedPuppiesData = await readData()
  const value = req.params.id
  const puppiesData = parsedPuppiesData['puppies'].find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  const template = 'edit'

  res.render(template, puppiesData)
})

router.post('/edit/:id', async (req, res) => {
  const parsedPuppiesData = await readData()

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
