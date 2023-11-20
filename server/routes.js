import express from 'express'

import * as Path from 'node:path'
import * as url from 'node:url'

import { readFile, writeFile } from 'node:fs/promises'

// import { log } from 'node:console'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const jsonPath = Path.join(__dirname, './data/data.json')

const router = express.Router()

// Show each puppy page with their details.
router.get('/:id', async (req, res) => {
  try {
    const getData = await readFile(jsonPath, 'utf-8')
    const puppiesObj = JSON.parse(getData)
    const puppiesArr = puppiesObj.puppies
    const puppyById = puppiesArr.find(
      (puppy) => puppy.id === Number(req.params.id)
    )

    res.render('details', puppyById)
  } catch (error) {
    console.log('not found')
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const getData = await readFile(jsonPath, 'utf-8')
    const puppiesObj = JSON.parse(getData)
    const puppiesArr = puppiesObj.puppies
    const puppyById = puppiesArr.find(
      (puppy) => puppy.id === Number(req.params.id)
    )
    res.render('edit', puppyById)
  } catch (error) {
    console.log('not found')
  }
})

router.post('/edit/:id', async (req, res) => {
  try {
    const getData = await readFile(jsonPath, 'utf-8')
    const puppiesObj = JSON.parse(getData)
    const puppiesArr = puppiesObj.puppies
    // Returns the index of the object in the array where the given .id is found
    // i.e. where req.params.id = 1, the index returned is 0.
    const puppyIndex = puppiesArr.findIndex(
      (puppies) => puppies.id === Number(req.params.id)
    )
    console.log(puppyIndex)

    // Grabs the puppies object at the correct index (puppyIndex)
    // The spread operator is used to create a shallow copy of the object.
    // The spread operator is used again to add the req.body contense to the object copy.
    puppiesArr[puppyIndex] = { ...puppiesArr[puppyIndex], ...req.body }

    const newPupData = JSON.stringify(puppiesObj, null, 2)
    console.log(newPupData)
    await writeFile(jsonPath, newPupData)
    res.render('details', puppiesArr[puppyIndex])
  } catch (error) {
    console.log('Error updating puppy:', error)
  }
})

export default router
