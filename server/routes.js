import express from 'express'
const router = express.Router()

import puppyData from './getPuppies.js'

// GET the puppy edit form
router.get('/edit/:id', (req, res) => {
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  res.render('edit', puppy)
})

// POST the edited puppy data
router.post('/edit/:id', (req, res) => {
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  const { name, owner, breed } = req.body
  const updatedPuppy = { ...puppy, name, owner, breed }
  console.log(updatedPuppy)
  res.render('edit', updatedPuppy)
})

// GET an individual puppy detail
router.get('/:id', (req, res) => {
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  res.render('details', puppy)
})

export default router
