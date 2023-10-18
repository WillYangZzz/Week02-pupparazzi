import { readdir, readFile, writeFile } from 'node:fs/promises' //promises
// import * as URL from 'node:url'
import express, { json } from 'express'
import { Buffer } from 'node:buffer'

const router = express.Router()

const filePath = new URL('./data/data.json', import.meta.url)
const contents = await readFile(filePath, { encoding: 'utf8' })
const viewData = JSON.parse(contents)
const pupArray = viewData.puppies

//dynamic route to display details of particular puppy
router.get('/:id', async (req, res) => {
  const value = req.params.id
  const pupID = pupArray.find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  res.render('details', pupID)
})

router.get('/edit/:id', async (req, res) => {
  const value = req.params.id
  const pupID = pupArray.find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  res.render('edit', pupID)
})

router.post('/edit/:id', async (req, res) => {
  const value = req.params.id
  const pupID = pupArray.find((item) => item['id'] === Number(value))
  //this pupId is hte array we are changing in that form
  pupID.name = req.body.name
  pupID.breed = req.body.breed
  pupID.owner = req.body.owner
  // redoing the updated array in the original JSON data format
  const newPupObj = {
    puppies: pupArray,
  }
  const newViewData = JSON.stringify({ newPupObj })

  await writeFile(filePath, newPupObj)
  res.render('details', pupID)
})

export default router
