import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'
import { readFile } from 'node:fs/promises'
import { log } from 'node:console'
import { writeFile } from 'node:fs/promises'
import { readingData } from './server.js'

const router = express.Router()

//reading data from the JSON file
// const __filename = URL.fileURLToPath(import.meta.url)
// const __dirname = Path.dirname(__filename)
// const dataPath = Path.join(__dirname, './data/data.json')
// let puppydetails = await readFile(dataPath, { encoding: 'utf-8' })
// //changing the JSON file into a JS object file

// returning the array ID and matching to the clicked puppy ID
router.get('/:id', async (req, res) => {
  const value = req.params.id
  let parsePuppy = await readingData()

  let dog = parsePuppy['puppies'].find((dog) => {
    if (dog['id'] === Number(value)) {
      return true
    }
  })

  res.render('details', dog)
})

router.get('/edit/:id', async (req, res) => {
  const value = req.params.id
  const parsePuppy = await readingData()
  let dog = parsePuppy['puppies'].find((dog) => {
    if (dog['id'] === Number(value)) {
      return true
    }
  })
  res.render('edit', dog)
})

router.post('/edit/:id', async (req, res) => {
  const value = req.params.id
  const parsePuppy = await readingData()
  // create form puppy using values from req.body

  const dogObj = {
    id: Number(value),
    name: req.body.name,
    breed: req.body.breed,
    owner: req.body.owner,
    image: req.body.image,
  }
  // find the right puppy from data
  const findingPuppy = parsePuppy['puppies'].map((dog) => {
    if (dog['id'] === Number(value)) {
      return (dog = dogObj)
    } else {
      return dog
    }
  })
  const puppiesToJson = JSON.stringify({ puppies: findingPuppy }, null, 2)
  await writeFile('server/data/data.json', puppiesToJson, 'utf-8')
  // re-assign the right puppy's values to be form puppy's values
  res.redirect(`/puppies/${value}`)
  // redirect to single puppy page so user can see their changes.
})
export default router
