import Scanner from '@kubis/input-scanner'
import { TextCounter, TextStatistics } from 'glyphalyze'

/**
 * Class for statistics UI.
 */
class StatisticsConsoleUI {
  /**
   * @type {Scanner}
   */
  #scanner

  /**
   * @type {string}
   */
  #text

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
   * @param {string} text The text to be analyzed.
   */
  constructor (scanner, text) {
    this.#scanner = scanner
    this.#text = text
    this.#counter = new TextCounter(text)
    this.#statistics = new TextStatistics(text)
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
      break
    case 6:
      break
    case 7:
      break
    case 0:
      this.#running = false
      return
      break
    }
    await this.#scanner.pauseUntilNext()
  }

  #showCharacterCount () {
    const characterCount = this.#counter.countCharacters()
    this.#scanner.prompt(`Character count: ${characterCount}\n`)
  }

  #showWordCount () {
    const wordCount = this.#counter.wordCount()
    this.#scanner.prompt(`Word count: ${wordCount}\n`)
  }

  #showSentenceCount () {
    const sentenceCount = this.#counter.countSentences()
    this.#scanner.prompt(`Sentence count: ${sentenceCount}\n`)
  }

  #showWordFrequency () {
    const [WORD_INDEX, COUNT_INDEX] = [0, 1]
    const frequencyRecord = this.#counter.wordFrequency()
    const iterableFrequency = Object.entries(frequencyRecord)
    iterableFrequency.sort((a, b) => b[COUNT_INDEX] - a[COUNT_INDEX])
    for (const [word, times] of iterableFrequency) {
      this.#scanner.prompt(`${word}: ${times}\n`)
    }
  }
}

export default StatisticsConsoleUI
