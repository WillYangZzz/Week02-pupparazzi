import * as Path from 'node:path'
import fs from 'node:fs/promises'

const dataPath = Path.resolve('server/data/data.json')

/**
 * Asynchronous function to get a list of puppies.
 * @returns {Object} An object containing a property "puppies" which is an array of puppy objects.
 * @property {number} id - The ID of the puppy.
 * @property {string} name - The name of the puppy.
 * @property {string} owner - The owner of the puppy.
 * @property {string} image - The image URL of the puppy.
 * @property {string} breed - The breed of the puppy.
 * @throws {Error} If there's an error reading or parsing the data.
 */
export async function getPuppies() {
  try {
    const filePath = new URL(dataPath, import.meta.url)
    const data = await fs.readFile(filePath, { encoding: 'utf8' })

    return JSON.parse(data)
  } catch (err) {
    console.error(err.message)
  }
}

/**
 * Overwrites a JSON file with new data.
 * @param {Object} newData - The new data to be written to the file.
 * @returns {Promise} A promise that resolves when the file is successfully updated.
 * @throws {Error} If there's an error writing the file.
 */
export async function savePuppies(newData) {
  try {
    const JSONdata = JSON.stringify(newData)
    return await fs.writeFile(dataPath, JSONdata, {
      encoding: 'utf-8',
    })
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error('uh oh', err)
  }
}
