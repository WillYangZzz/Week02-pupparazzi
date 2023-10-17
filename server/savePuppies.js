import fs from 'node:fs/promises'

export default async function savePuppies(newData) {
  try {
    const JSONdata = JSON.stringify(newData)
    await fs.writeFile('./server/data/data.json', JSONdata, {
      encoding: 'utf-8',
    })
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('uh oh', err)
  }
}
