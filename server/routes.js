import express from "express"
import * as Path from 'node:path'
import * as URL from 'node:url'
import { readFile } from "node:fs/promises"

const router = express.Router()


//reading data from the JSON file
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataPath = Path.join(__dirname, './data/data.json')
let puppydetails = await readFile(dataPath ,{encoding : "utf-8"})
//changing the JSON file into a JS object file 
let parsePuppy = JSON.parse(puppydetails)


// returning the array ID and matching to the clicked puppy ID
router.get("/:id", (req, res) =>{
    const value = req.params.id
    let dog = parsePuppy["puppies"].find((dog)=>{
        if(dog["id"] === Number(value)){
            return true
        }
    })

    res.render("details", dog )
    
})

router.get("/edit/:id", (req, res) =>{
    const value = req.params.id
    let dog = parsePuppy['puppies'].find((dog)=>{
        if(dog["id"] === Number(value)){
            return true
        }
    })
        res.render("edit", dog)
    })

router.post("/edit/:id", (req, res) =>{
const value = req.params.id
// create form puppy using values from req.body

// find the right puppy from data

// re-assign the right puppy's values to be form puppy's values

// redirect to single puppy page so user can see their changes. 
})


export default router