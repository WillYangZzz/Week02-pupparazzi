import * as Path from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises' //promises
// import * as URL from 'node:url'
import express from 'express'

const router = express.Router()

//dynamic route to display details of particular puppy
router.get('/:id', async (req, res) => {
  const value = req.params.id
  const filePath = new URL('./data/data.json', import.meta.url)
  const contents = await readFile(filePath, { encoding: 'utf8' })
  const viewData = JSON.parse(contents)
  const pupArray = viewData.puppies
  const pupID = pupArray.find((item) => {
    if (item['id'] === Number(value)) {
      return true
    }
  })
  res.render('details', pupID)
})

export default router
