import express from 'express'
const router = express.Router()

import puppyData from './getPuppies.js'

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  // console.log(puppyData)
  const puppy = puppyData.puppies.find((pup) => {
    return parseInt(pup.id) === parseInt(req.params.id)
  })
  res.render('details', puppy)
})

export default router
