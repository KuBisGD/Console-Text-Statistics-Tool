import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import TextDataStorage from '../src/TextDataStorage.js'
import TextFileContent from '../src/TextFileContent.js'

describe('TextDataStorage', () => {
  let savesFolderPath
  let storage

  beforeEach(async () => {
    savesFolderPath = await mkdtemp(join(tmpdir(), 'text-data-storage-'))
    storage = new TextDataStorage(savesFolderPath)
  })

  afterEach(async () => {
    await rm(savesFolderPath, { recursive: true, force: true })
  })

  it('uses the .txt file format', () => {
    expect(TextDataStorage.SAVED_FILE_FORMAT).toBe('.txt')
  })

  it('lists saved text files without their extension', async () => {
    await writeFile(join(savesFolderPath, 'first.txt'), 'first')
    await writeFile(join(savesFolderPath, 'second.txt'), 'second')
    await writeFile(join(savesFolderPath, 'notes.md'), 'notes')

    await expect(storage.getSavedFileNames()).resolves.toEqual([
      'first',
      'second'
    ])
  })

  it('saves trimmed file names and preserves the content', async () => {
    await storage.saveAsFile('  report  ', 'Some text.\n')

    await expect(readFile(join(savesFolderPath, 'report.txt'), 'utf8'))
      .resolves.toBe('Some text.\n')
    await expect(readdir(savesFolderPath)).resolves.toEqual(['report.txt'])
  })

  it.each(['folder/name', 'folder\\name'])(
    'rejects file names containing a path separator: %s',
    async (fileName) => {
      await expect(storage.saveAsFile(fileName, 'content'))
        .rejects.toThrow('a file name must not contain "/" or "\\"')
      await expect(readdir(savesFolderPath)).resolves.toEqual([])
    }
  )

  it('loads saved text as a TextFileContent object', async () => {
    await writeFile(join(savesFolderPath, 'story.txt'), 'Once upon a time.')

    const content = await storage.loadSavedFileContent('story')

    expect(content).toBeInstanceOf(TextFileContent)
    expect(content.content).toBe('Once upon a time.')
  })
})
