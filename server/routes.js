import express from 'express'
import * as Path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

const router = express.Router()

// GET /puppies/
router.get('/:id', async (req, res) => {
  const id = req.params.id

  const puppiesJSON = await readFile(Path.resolve('./server/data/data.json'), {
    encoding: 'utf8',
  })
  const viewData = JSON.parse(puppiesJSON)
  // console.log(viewData)
  res.render('details', viewData.puppies[id - 1])
})

// GET /puppies/:id/edit
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id

  const puppiesJSON = await readFile(Path.resolve('./server/data/data.json'), {
    encoding: 'utf8',
  })
  const viewData = JSON.parse(puppiesJSON)

  res.render('edit', viewData.puppies[id - 1])
})

// POST /puppies/:id/edit

router.post('/:id/:id/edit', async (req, res) => {
  const id = req.params.id

  console.log(req.body.name)
  res.send(`${id} is a great puppy`)

  // const puppiesJSONwrite = await writeFile(
  //   Path.resolve('./server/data/data.json'),
  //   {
  //     encoding: 'utf8',
  //   }
  // )
  // const viewData = JSON.parse(puppiesJSON)

  // res.render('edit', viewData.puppies[id - 1])
})

export default router
