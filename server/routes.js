import express from 'express'
const router = express.Router()

import { getPuppies, savePuppies } from './utils/getData.js'

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
  const puppyData = await getPuppies()

  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })

  const { name, owner, breed } = req.body
  const updatedPuppy = { ...puppy, name, owner, breed }

  const updatedPuppyData = {
    puppies: puppyData.puppies.map((pup) => {
      if (parseInt(pup.id) === parseInt(req.params.id)) {
        return updatedPuppy
      } else {
        return pup
      }
    }),
  }
  savePuppies(updatedPuppyData)
  res.redirect(`/${req.params.id}`)
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
