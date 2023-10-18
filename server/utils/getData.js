import * as Path from 'node:path'
import fs from 'node:fs/promises'

const dataPath = Path.resolve('server/data/data.json')

export async function getPuppies() {
  try {
    const filePath = new URL(dataPath, import.meta.url)
    const data = await fs.readFile(filePath, { encoding: 'utf8' })

    return JSON.parse(data)
  } catch (err) {
    console.error(err.message)
  }
}

export async function savePuppies(newData) {
  try {
    const JSONdata = JSON.stringify(newData)
    await fs.writeFile(dataPath, JSONdata, {
      encoding: 'utf-8',
    })
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('uh oh', err)
  }
}
