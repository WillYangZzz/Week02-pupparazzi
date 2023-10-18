import express from 'express'
import * as Path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { read } from './readandwrite.js'

const router = express.Router()

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

  // console.log(puppyEdit)

  const puppiesJSONwrite = await writeFile(
    Path.resolve('./server/data/data.json'),
    puppyEdit,
    (err) => {
      if (!err) {
        console.log('done')
      }
    }
  )

  res.redirect(`/puppies/${id}`)

  // const viewData = JSON.parse(puppiesJSON)

  // res.render('edit', viewData.puppies[id - 1])
})

export default router
