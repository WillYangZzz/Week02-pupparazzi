import express from 'express'
import { getPuppyData } from './server.js'
import { writeFile } from 'fs/promises'
const router = express.Router()

router.get('/add', async (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  const data = await getPuppyData()

  const newPuppyInput = {
    id: data.puppies.length + 1,
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
    image: req.body.image,
  }
  // data.puppies.push(newPuppyInput)
  const newPuppies = [...data.puppies, newPuppyInput]
  let jsonDatabase = JSON.stringify({ puppies: newPuppies })
  await writeFile('server/data/data.json', jsonDatabase, 'utf-8')
  res.redirect(`/puppies/${newPuppyInput.id}`)
})

router.get('/:id', async (req, res) => {
  // TODO: fix the code below
  const originalPuppyDatabase = getPuppyData()
  let data = await originalPuppyDatabase
  const id = req.params.id
  const value = data.puppies.find((item) => item.id === Number(id))
  res.render('details', value)
})

router.get('/edit/:id', async (req, res) => {
  // TODO: fix the code below (if conditiona and the await)
  const originalPuppyDatabase = getPuppyData()
  let data = await originalPuppyDatabase
  const id = req.params.id
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      return true
    }
  })
  res.render('edit', value)
})

export default router

router.post('/edit/:id', async (req, res) => {
  // TODO: add missing awaits
  // re-write the array methods below to be using map and ternary operator
  const originalPuppyDatabase = getPuppyData()
  let newPuppyDatabase = { puppies: '' }
  const id = req.params.id
  const puppyEdit = {
    id: Number(id),
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
  }
  let data = await originalPuppyDatabase
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      puppyEdit.image = item.image
      let filtered = data.puppies.filter((x) => x.id != item.id)
      filtered.push(puppyEdit)
      newPuppyDatabase.puppies = filtered
      const jsonPuppies = JSON.stringify(newPuppyDatabase)
      writeFile('server/data/data.json', jsonPuppies, 'utf-8')
      return true
    }
  })
  res.redirect(`/puppies/${id}`)
})
