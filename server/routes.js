import express, { Router } from 'express'

import fs from 'node:fs/promises'

const router = express.Router

router.get('/:id', async (req, res) => {
  try {
    const getData = await fs.readFile('./server/data/data.json', 'utf-8')
    const unPack = JSON.parse(getData)
    res.render('home', unPack)
  } catch (error) {
    console.log('not found')
  }
})

export default Router
