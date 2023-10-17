import { readFile } from 'node:fs/promises'

export default async function getPuppyData() {
  try {
    const filePath = new URL('./data/data.json', import.meta.url)
    const data = await readFile(filePath, { encoding: 'utf8' })

    return JSON.parse(data)
  } catch (err) {
    console.error(err.message)
  }
}
