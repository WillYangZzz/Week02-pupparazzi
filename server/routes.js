import express from 'express'
// import pups from './server.js'
import { readFile, writeFile } from 'node:fs/promises'

const router = express.Router()

const read = await readFile('server/data/data.json', { encoding: 'utf-8' })

let pups = JSON.parse(read)
// let pups = read
// [
//   {
//     id: 5,
//     name: 'Murphy',
//     owner: 'Matthew',
//     image: '/images/puppy5.jpg',
//     breed: 'Pug',
//   },
// ]

router.get('/', (req, res) => {
  const viewData = pups

  res.render('home', viewData)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  // pups = { id: id }
  const viewData = pups['puppies'].find((el) => el['id'] === Number(id))
  res.render('details', viewData)
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  // pups = { id: id }
  const viewData = pups['puppies'].find((el) => el['id'] === Number(id))
  res.render('edit', viewData)
})

router.post('/edit/:id', (req, res) => {
  const id = req.params.id

  const name = req.body.name
  const owner = req.body.owner
  const breed = req.body.breed

  console.log(req.body)

  const newData = pups['puppies'].map((item) => {
    if (item.id === Number(id)) {
      item = { id, name, owner, breed }
      console.log(' I Found coco')
      return item
    } else {
      return item
    }

    // const finalData = {
    //   item,
    // }
  })

  // const obj= JSON.stringify(newData, null, 2)

  const obj = {
    puppies: newData,
  }

  console.log(obj)
  const temp = JSON.stringify(obj, null, 2)

  writeFile('server/data/data.json', temp)

  res.redirect('/puppies/')
})

export default router
