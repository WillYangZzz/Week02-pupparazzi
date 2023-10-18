import express from 'express'
import { puppyData } from './server.js'
import { writeFile } from 'fs/promises'
// import readFile from 'node'
const router = express.Router()
const dogData = puppyData()

router.get('/:id', async (req, res) => {
  puppyData()
  let data = await dogData
  // console.log(data)
  const id = req.params.id
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      return true
    }
  })
  res.render('details', value)
})
router.get('/edit/:id', async (req, res) => {
  let data = await dogData
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
  let newPuppyObject = { puppies: '' }
  const id = req.params.id
  const puppyEdit = {
    id: Number(id),
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
  }
  // console.log(puppyEdit)
  let data = await dogData
  // data.puppies.breed = 'bndsjkahbd'
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      puppyEdit.image = item.image
      let filtered = data.puppies.filter((x) => x.id != item.id)
      filtered.push(puppyEdit)
      newPuppyObject.puppies = filtered
      console.log('new object array: ', newPuppyObject.puppies)
      const jsonPuppies = JSON.stringify(newPuppyObject)
      writeFile('server/data/data.json', jsonPuppies, 'utf-8')
      return true
    }
  })
  res.redirect(`/puppies/${id}`)
})
