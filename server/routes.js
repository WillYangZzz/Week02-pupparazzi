import express from "express"
import * as Path from 'node:path'
import * as URL from 'node:url'
import { readFile } from "node:fs/promises"


const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
const dataPath = Path.join(__dirname, './data/data.json')
let puppydetails = await readFile(dataPath ,{encoding : "utf-8"})
console.log(puppydetails);
//changing the JSON file into a JS file 
let parsePuppy = JSON.parse(puppydetails)

const router = express.Router()

// router.get("/" , (req, res) => {
//     res.render()
// })
router.get("/:id", (req, res) =>{
    const value = req.params.id
    let dog = parsePuppy["puppies"].find((dog)=>{
        if(dog["id"] === Number(value)){
            return true
        }
    })

    res.render("details", dog )
    
})
export default router