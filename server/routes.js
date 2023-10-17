import express from 'express'

const router = express.Router()

// GET /puppies/
router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send(`here is ${id} puppy`)
})

export default router
