import express from 'express'
const router = express.Router()

router.get('/:id', (req, res) => {
  res.send(`puppy ${req.params.id} should be displayed here`)
})

export default router
