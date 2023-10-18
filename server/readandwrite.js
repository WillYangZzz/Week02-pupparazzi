import { readFile, writeFile } from 'node:fs/promises'
import * as Path from 'node:path'

export async function read() {
  const puppiesJSON = await readFile(Path.resolve('./server/data/data.json'), {
    encoding: 'utf8',
  })
  return JSON.parse(puppiesJSON)
}

export async function write() {}
