import { readFile } from 'node:fs/promises'

// Get puppy data
let puppyData
try {
  const filePath = new URL('./data/data.json', import.meta.url)
  const data = await readFile(filePath, { encoding: 'utf8' })
  puppyData = JSON.parse(data)
  // console.log(data)
} catch (err) {
  console.error(err.message)
}

export default puppyData
