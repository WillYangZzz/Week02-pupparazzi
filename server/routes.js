import express from 'express'
import { puppyData } from './server.js'
import { writeFile } from 'fs/promises'
const router = express.Router()

router.get('/add', async (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  const originalPuppyDatabase = puppyData()
  let data = await originalPuppyDatabase
  const newPuppyInput = {
    id: data.puppies.length + 1,
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
    image: req.body.image,
  }
  data.puppies.push(newPuppyInput)
  let jsonDatabase = JSON.stringify(data)
  writeFile('server/data/data.json', jsonDatabase, 'utf-8')
  res.redirect(`/puppies/${newPuppyInput.id}`)
})

router.get('/:id', async (req, res) => {
  const originalPuppyDatabase = puppyData()
  let data = await originalPuppyDatabase
  const id = req.params.id
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      return true
    }
  })
  res.render('details', value)
})

router.get('/edit/:id', async (req, res) => {
  const originalPuppyDatabase = puppyData()
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
  const originalPuppyDatabase = puppyData()
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
