import express from 'express'
const router = express.Router()

import { getPuppies, savePuppies } from './utils/getData.js'

// GET display form to add a new puppy
router.get('/new', (req, res) => {
  res.render('new')
})

// POST receive form data for a new puppy
router.post('/new', async (req, res) => {
  const puppyData = await getPuppies()
  const newId = puppyData.puppies.length + 1

  const { name, owner, breed, image } = req.body
  const newPuppy = { id: newId, name, owner, breed, image }

  const updatedPuppyData = {
    puppies: [...puppyData.puppies, newPuppy],
  }
  savePuppies(updatedPuppyData)
  res.redirect(`/puppies/${newId}`)
})

// GET the puppy edit form
router.get('/edit/:id', async (req, res) => {
  const puppyData = await getPuppies()
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  res.render('edit', puppy)
})

// POST the edited puppy data
router.post('/edit/:id', async (req, res) => {
  // get form data
  const { name, owner, breed } = req.body

  // get list of all puppies
  const puppyData = await getPuppies()

  // merge the new data into the puppies data
  const updatedPuppyData = {
    puppies: puppyData.puppies.map((pup) => {
      return parseInt(pup.id) === parseInt(req.params.id)
        ? { ...pup, name, owner, breed }
        : pup
    }),
  }

  savePuppies(updatedPuppyData)
  res.redirect(`/puppies/${req.params.id}`)
})

// GET an individual puppy detail
router.get('/:id', async (req, res) => {
  const puppyData = await getPuppies()
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  res.render('details', puppy)
})

export default router
