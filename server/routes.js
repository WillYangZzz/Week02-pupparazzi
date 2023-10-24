import express from 'express'
//import fs from 'node:fs/promises'
import { readFile, writeFile } from 'node:fs/promises'
import Path from 'path'

const router = express.Router()
const dataPath = Path.dirname('./data/data.json')
router.use(express.static(Path.join(dataPath, 'public')))

// Your routes/router(s) should go here
// router.get('/', async (req, res) => {
//   const jsonString = await readFile('server/data/data.json', {
//     encoding: 'utf-8',
//   })
//   const data = JSON.parse(jsonString)
//   console.log(data)
//   //res.send('Pupparazzi')

//   const viewData = data
//   res.render('home', viewData)
// })

router.get('/:id', async (req, res) => {
  const jsonString = await readFile('server/data/data.json', {
    encoding: 'utf-8',
  })
  const data = JSON.parse(jsonString)
  console.log(data)
  //res.send('Pupparazzi')
  const id = req.params.id
  const viewData = data.puppies.find((el) => el.id == id)
  res.render('details', viewData)
})

router.get('/edit/:id', async (req, res) => {
  const jsonString = await readFile('server/data/data.json', {
    encoding: 'utf-8',
  })
  const data = JSON.parse(jsonString)
  console.log(data)
  const id = req.params.id
  const viewData = data.puppies.find((el) => el.id == id)
  res.render('edit', viewData)
})

router.post('/edit/:id', async (req, res) => {
  const value = Number(req.params.id)
  const jsonString = await readFile(dataPath)

  const pupData = JSON.parse(jsonString)
  const { name, breed, owner } = req.body //deconstruct  the obj
  // if no {} implies return and if {} must have return
  const puppies = pupData.puppies.map((puppy) =>
    puppy.id === value ? { ...puppy, name, breed, owner } : puppy
  )

  await writeFile('server/data/data.json', JSON.stringify({ puppies }))

  res.redirect(`/puppies/${req.params.id}`)
})

export default router
