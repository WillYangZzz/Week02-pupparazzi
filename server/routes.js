import express from 'express'
import { read, write } from './readandwrite.js'

const router = express.Router()

// GET /puppies/new
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  const viewData = await read()
  // const id = viewData.puppies.length + 1

  let newPuppy = {}
  newPuppy.id = viewData.puppies.length + 1
  newPuppy.name = req.body.name
  newPuppy.owner = req.body.owner
  newPuppy.image = req.body.image
  newPuppy.breed = req.body.breed

  viewData.puppies.push(newPuppy)

  // let newJSON = { puppies }
  let puppyEdit = JSON.stringify(viewData, null, 2)
  await write(puppyEdit)

  res.redirect('/')
})

// GET /puppies/
router.get('/:id', async (req, res) => {
  const id = req.params.id

  const viewData = await read()

  res.render('details', viewData.puppies[id - 1])
})

// GET /puppies/:id/edit
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id

  const viewData = await read()

  res.render('edit', viewData.puppies[id - 1])
})

// POST /puppies/:id/edit

router.post('/:id/:id/edit', async (req, res) => {
  const id = req.params.id

  const viewData = await read()

  let puppies = viewData.puppies.map((el) => {
    if (el.id == id) {
      el.name = req.body.name
      el.breed = req.body.breed
      el.owner = req.body.owner
    }
    return el
  })

  let newJSON = { puppies }

  let puppyEdit = JSON.stringify(newJSON, null, 2)

  await write(puppyEdit)

  res.redirect(`/puppies/${id}`)
})

export default router
