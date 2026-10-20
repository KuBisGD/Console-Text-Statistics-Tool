import { describe, expect, it, vi } from 'vitest'
import StatisticsConsoleUI from '../src/StatisticsConsoleUI.js'

const text = { content: 'cat dog cat. Hi all!' }

const createScanner = (options) => {
  const prompts = []
  const scanner = {
    prompt: vi.fn((message) => {
      prompts.push(message)
      return scanner
    }),
    nextNumber: vi.fn(async () => {
      const option = options.shift()
      if (option instanceof Error) {
        throw option
      }
      return option
    }),
    pauseUntilNext: vi.fn().mockResolvedValue()
  }

  return { scanner, prompts }
}

describe('StatisticsConsoleUI', () => {
  it('displays all glyphalyze statistics and returns to the previous menu', async () => {
    const { scanner, prompts } = createScanner([1, 2, 3, 4, 5, 6, 7, 200, 0])
    const ui = new StatisticsConsoleUI(scanner, text)

    await ui.start()

    expect(prompts.slice(0, 9)).toEqual([
      '--- Select option ---\n',
      '1: Character count\n',
      '2: Word count\n',
      '3: Sentence count\n',
      '4: Word frequency\n',
      '5: Average word length\n',
      '6: Average sentence length\n',
      '7: Text time to read\n',
      '0: Back\n'
    ])
    expect(prompts).toEqual(expect.arrayContaining([
      'Character count: 20\n',
      'Word count: 5\n',
      'Sentence count: 2\n',
      'cat: 2\n',
      'dog: 1\n',
      'hi: 1\n',
      'all: 1\n',
      'Average word length: 2.80 characters\n',
      'Average sentence length: 2.50 characters\n',
      'Enter words per minute: ',
      'Reading time: 1.5 seconds'
    ]))
    expect(prompts.indexOf('cat: 2\n')).toBeLessThan(prompts.indexOf('dog: 1\n'))
    expect(scanner.pauseUntilNext).toHaveBeenCalledTimes(7)
  })

  it('asks again after an invalid menu option', async () => {
    const { scanner, prompts } = createScanner([new Error('Invalid number'), 0])
    const ui = new StatisticsConsoleUI(scanner, text)

    await ui.start()

    expect(prompts).toContain('Enter a valid option\n')
    expect(scanner.nextNumber).toHaveBeenCalledTimes(2)
    expect(scanner.pauseUntilNext).not.toHaveBeenCalled()
  })

  it('retries an invalid reading speed and displays the resulting time', async () => {
    const { scanner, prompts } = createScanner([7, new Error('Invalid number'), 200, 0])
    const ui = new StatisticsConsoleUI(scanner, text)

    await ui.start()

    expect(prompts).toContain('Words per minute must be 1 to 2000\n')
    expect(scanner.nextNumber).toHaveBeenNthCalledWith(1, { min: 0, max: 7 })
    expect(scanner.nextNumber).toHaveBeenNthCalledWith(2, { min: 1, max: 2000 })
    expect(scanner.nextNumber).toHaveBeenNthCalledWith(3, { min: 1, max: 2000 })
    expect(prompts).toContain('Reading time: 1.5 seconds')
    expect(scanner.pauseUntilNext).toHaveBeenCalledTimes(1)
  })
})
