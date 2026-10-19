import Scanner from '@kubis/input-scanner'
import { TextCounter, TextStatistics } from 'glyphalyze'

/**
 * @typedef {import('./TextFileContent.js').default} TextFileContent
 */

/**
 * Class for statistics UI.
 */
class StatisticsConsoleUI {
  /**
   * @type {Scanner}
   */
  #scanner

  /**
   * @type {boolean}
   */
  #running = true

  /**
   * @type {TextCounter}
   */
  #counter

  /**
   * @type {TextStatistics}
   */
  #statistics

  /**
   * Creates a new statistics UI object.
   * 
   * @param {Scanner} scanner The input reader for the UI.
   * @param {TextFileContent} text The text to be analyzed.
   */
  constructor (scanner, text) {
    this.#scanner = scanner
    this.#counter = new TextCounter(text.content)
    this.#statistics = new TextStatistics(text.content)
  }

  /**
   * Starts the statistics UI.
   */
  async start () {
    while (this.#running) {
      await this.#menuTextStats()
    }
  }

  /**
   * The menu for text stats.
   */
  async #menuTextStats () {
    const maxOptionValue = this.#renderTextStatsMenu()
    const option = await this.#selectMenuOption(maxOptionValue)
    await this.#actionTextStatsMenu(option)
  }

  /**
   * Renders the text stats menu options to the output.
   * 
   * @returns {number} The amount of options in the menu.
   */
  #renderTextStatsMenu () {
    this.#scanner.prompt('--- Select option ---\n')
    this.#scanner.prompt('1: Character count\n')
    this.#scanner.prompt('2: Word count\n')
    this.#scanner.prompt('3: Sentence count\n')
    this.#scanner.prompt('4: Word frequency\n')
    this.#scanner.prompt('5: Average word length\n')
    this.#scanner.prompt('6: Average sentence length\n')
    this.#scanner.prompt('7: Text time to read\n')
    this.#scanner.prompt('0: Back\n')
    return 7
  }

  /**
   * Gets a user input to be used in selecting a menu option.
   * 
   * @param {number} maxOptionValue The max number to be a valid input.
   * @returns {number} The selected option
   */
  async #selectMenuOption (maxOptionValue) {
    while (true) {
      this.#scanner.prompt('Option: ')
      try {
        const option = await this.#scanner.nextNumber({ min: 0, max: maxOptionValue })
        return option
      } catch {
        this.#scanner.prompt('Enter a valid option\n')
      }
    }
  }

  /**
   * Handles the action for the text stats menu.
   * 
   * @param {number} option The option to be selected.
   * @returns {void}
   */
  async #actionTextStatsMenu (option) {
    switch (option) {
    case 1:
      this.#showCharacterCount()
      break
    case 2:
      this.#showWordCount()
      break
    case 3:
      this.#showSentenceCount()
      break
    case 4:
      this.#showWordFrequency()
      break
    case 5:
      this.#showAverageWordLength()
      break
    case 6:
      this.#showAverageSentenceLength()
      break
    case 7:
      await this.#showEstimatedReadingTime()
      break
    case 0:
      this.#running = false
      return
    default:
      throw new Error('Invalid Text Stats menu option given')
    }
    await this.#scanner.pauseUntilNext()
  }

  /**
   * Displays the character count.
   *
   * @returns {void}
   */
  #showCharacterCount () {
    const characterCount = this.#counter.countCharacters()
    this.#scanner.prompt(`Character count: ${characterCount}\n`)
  }

  /**
   * Displays the word count.
   *
   * @returns {void}
   */
  #showWordCount () {
    const wordCount = this.#counter.countWords()
    this.#scanner.prompt(`Word count: ${wordCount}\n`)
  }

  /**
   * Displays the sentence count.
   *
   * @returns {void}
   */
  #showSentenceCount () {
    const sentenceCount = this.#counter.countSentences()
    this.#scanner.prompt(`Sentence count: ${sentenceCount}\n`)
  }

  /**
   * Displays word frequencies in descending order.
   *
   * @returns {void}
   */
  #showWordFrequency () {
    const [WORD_INDEX, COUNT_INDEX] = [0, 1]
    const frequencyRecord = this.#counter.wordFrequency()
    const iterableFrequency = Object.entries(frequencyRecord)
    iterableFrequency.sort((a, b) => b[COUNT_INDEX] - a[COUNT_INDEX])
    for (const [word, times] of iterableFrequency) {
      this.#scanner.prompt(`${word}: ${times}\n`)
    }
  }

  /**
   * Displays the average word length.
   *
   * @returns {void}
   */
  #showAverageWordLength () {
    const length = this.#statistics.avgWordLength()
    this.#scanner.prompt(`Average word length: ${length.toFixed(2)} characters\n`)
  }

  /**
   * Displays the average sentence length.
   *
   * @returns {void}
   */
  #showAverageSentenceLength () {
    const length = this.#statistics.avgSentenceLength()
    this.#scanner.prompt(`Average sentence length: ${length.toFixed(2)} characters\n`)
  }

  /**
   * Prompts for a reading speed and displays the estimated reading time.
   *
   * @returns {Promise<void>} Resolves after the reading time has been displayed.
   */
  async #showEstimatedReadingTime () {
    const range = { min: 1, max: 1000 }
    while (true) {
      try {
        const wordsPerMinute = await this.#scanner.prompt('Enter words per minute: ').nextNumber(range)
        const seconds = this.#statistics.readingTime(wordsPerMinute)
        const timeString = this.#getSecondsToTimeString(seconds.toFixed(2))
        this.#scanner.prompt(`Reading time: ${timeString}`)
        return
      } catch (error) {
        this.#scanner.prompt(`Words per minute must be ${range.min} to ${range.max}\n`)
      }
    }
  }

  /**
   * Converts a duration in seconds to a formatted time string.
   *
   * @param {number} seconds The duration in seconds.
   * @returns {string} The formatted duration.
   */
  #getSecondsToTimeString (seconds) {
    const time = { hours: 0, minutes: 0, seconds: 0 }
    time.seconds = seconds % 60
    const minutes = (seconds - time.seconds) / 60
    time.minutes = minutes % 60
    time.hours = (minutes - time.minutes) / 60

    let timeString = ''
    if (time.hours !== 0) timeString += `${time.hours} hours `
    if (time.minutes !== 0) timeString += `${time.minutes} minutes `
    if (time.seconds !== 0) timeString += `${time.seconds} seconds`

    return timeString
  }
}

export default StatisticsConsoleUI
