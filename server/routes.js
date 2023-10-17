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

  // let puppyData = {
  //   name: req.body.name,
  //   breed: req.body.breed,
  //   owner: req.body.owner,
  // }

  const puppiesJSON = await readFile(Path.resolve('./server/data/data.json'), {
    encoding: 'utf8',
  })
  const viewData = JSON.parse(puppiesJSON)

  let puppyNumber = viewData.puppies.map((el) => {
    if (el.id == id) {
      el.name = req.body.name
      el.breed = req.body.breed
      el.owner = req.body.owner
      console.log(el)
    } else console.log(el)
  })

  // let puppyEdit = JSON.stringify(puppyNumber, null, 2)

  console.log(puppyNumber)

  // const puppiesJSONwrite = await writeFile(
  //   Path.resolve('./server/data/data.json'),
  //   puppyEdit,
  //   (err) => {
  //     if (!err) {
  //       console.log('done')
  //     }
  //   }
  // )

  res.send(`${id - 1} is a great puppy`)

  // const viewData = JSON.parse(puppiesJSON)

  // res.render('edit', viewData.puppies[id - 1])
})

export default router
