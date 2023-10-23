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
  const newPuppies = [...data.puppies, newPuppyInput]
  let jsonDatabase = JSON.stringify({ puppies: newPuppies })
  await writeFile('server/data/data.json', jsonDatabase, 'utf-8')
  res.redirect(`/puppies/${newPuppyInput.id}`)
})

router.get('/:id', async (req, res) => {
  // TODO: fix the code below <-- Done
  const data = await getPuppyData()
  const id = req.params.id
  const value = data.puppies.find((item) => {
    return item.id == Number(id)
  })
  res.render('details', value)
})

router.get('/edit/:id', async (req, res) => {
  // TODO: fix the code below (if conditiona and the await) <-- Done
  const data = await getPuppyData()
  const id = req.params.id
  const value = data.puppies.find((item) => {
    return item.id === Number(id)
  })
  res.render('edit', value)
})

export default router

router.post('/edit/:id', async (req, res) => {
  // TODO: add missing awaits <-- Done
  // re-write the array methods below to be using map and ternary operator <-- Done
  const data = await getPuppyData()
  const id = req.params.id
  const puppyEdit = {
    id: Number(id),
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
    image: req.body.image,
  }
  const newPuppyData = data.puppies.map((item) => {
    return item.id === Number(id) ? (item = puppyEdit) : item
  })
  const jsonPuppies = JSON.stringify({ puppies: newPuppyData }, null, 2)
  await writeFile('server/data/data.json', jsonPuppies, 'utf-8')
  res.redirect(`/puppies/${id}`)
})
