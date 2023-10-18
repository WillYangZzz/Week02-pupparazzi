import express from 'express'
import { puppyData } from './server.js'
// import readFile from 'node'
const router = express.Router()
const dogData = puppyData()

router.get('/:id', async (req, res) => {
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
  const id = req.params.id
  const puppyEdit = {
    id: id,
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
  }
  // console.log(puppyEdit)
  let data = await dogData
  // data.puppies.breed = 'bndsjkahbd'
  const value = data.puppies.find((item) => {
    if (item.id == id) {
      // console.log(dogData.puppies)
      // console.log(item)
      return true
    }
  })
  // console.log(value)
  res.redirect(`/puppies/${id}`)
})

//get the json file which is an object, edit the json file, stringify it again

//dogData.puppies.find((item) => {
//
// })
