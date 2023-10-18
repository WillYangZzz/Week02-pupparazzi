import express from 'express'
// import pups from './server.js'
import { writeFile } from 'node:fs/promises'
import { readFileSync } from 'fs'

const router = express.Router()

function getAllDogs() {
  const read = readFileSync('server/data/data.json', { encoding: 'utf-8' })

  return JSON.parse(read, null, 2)
}

function findDogById(id) {
  const read = readFileSync('server/data/data.json', { encoding: 'utf-8' })

  let pups = JSON.parse(read)

  const puppy = pups['puppies'].find((el) => el['id'] === Number(id))

  return puppy
}

function updateTheDog(dog) {
  const { id, name, owner, breed, image } = dog

  const pups = getAllDogs()

  const newData = pups['puppies'].map((item) => {
    if (item.id === Number(id)) {
      item = { id, name, owner, breed, image }
      console.log(' I Found coco')
      return item
    } else {
      return item
    }
  })

  const obj = {
    puppies: newData,
  }

  console.log(obj)
  const temp = JSON.stringify(obj, null, 2)

  return writeFile('server/data/data.json', temp)
}

router.get('/', (req, res) => {
  const viewData = getAllDogs()

  res.render('home', viewData)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  // pups = { id: id }
  const viewData = findDogById(id)
  res.render('details', viewData)
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  // pups = { id: id }
  const viewData = findDogById(id)
  res.render('edit', viewData)
})

router.post('/edit/:id', (req, res) => {
  const id = Number(req.params.id)
  const name = req.body.name
  const owner = req.body.owner
  const image = req.body.image
  const breed = req.body.breed

  const dog = { id, name, owner, image, breed }

  updateTheDog(dog)
  // const obj= JSON.stringify(newData, null,

  res.redirect('/puppies/')
})

export default router
