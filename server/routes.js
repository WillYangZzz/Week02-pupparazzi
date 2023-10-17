import express from 'express'
import puppyData from './data/data.json' assert { type: 'json' }

const router = express.Router()

router.get('/', (req, res) => {
  res.send('display puppy details')
})

router.get('/:id', (req, res) => {
  const puppyId = req.params.id
  const puppyObj = puppyData.puppies.find((el) => el.id == puppyId)
  res.render('details', puppyObj)
})

export default router
