import Scanner from '@kubis/input-scanner'
import TextDataStorage from './TextDataStorage.js'

class ApplicationConsoleUI {
  #content = null
  #dataStorage
  #scanner
  constructor (input, output, savesFilePath) {
    this.#dataStorage = new TextDataStorage(savesFilePath)
    this.#scanner = new Scanner({ input, output })
  }

  async start () {
    while (true) {
      await this.#menuStart()
    }
    
  }

  /**
   * The programs start menu.
   */
  async #menuStart () {
    const maxOptionValue = this.#renderStartMenu()
    const option = await this.#selectMenuOption(maxOptionValue)
    await this.#actionStartMenu(option)
  }

  #renderStartMenu () {
    this.#scanner.prompt('1: Load text form file\n')
    this.#scanner.prompt('2: Manual line input\n')
    this.#scanner.prompt('3: View text statistics\n')
    this.#scanner.prompt('4: Save loaded text\n')
    this.#scanner.prompt('0: Exit\n')
    return 4
  }

  /**
   * Handles the action for the main menu.
   * 
   * @param {number} option The option to be selected.
   * @returns {void}
   */
  async #actionStartMenu (option) {
    switch (option) {
    case 1:
      await this.#loadFromFileMenu()
      break
    case 2:
      await this.#loadFromInput()
      break
    case 3:
      
      break
    case 4:
      await this.#menuSaveText()
      break
    case 0:
      process.exit()
      break
    default:
        
    }
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

  async #loadFromFileMenu () {
    const files = await this.#dataStorage.getSavedFileNames()
    if (files.length === 0) {
      this.#scanner.prompt('No saves found...\n')
    } else {
      for (let i = 0; i < files.length; i++) {
        this.#scanner.prompt(`${i + 1}: ${files[i]}\n`)
      }
    }
    this.#scanner.prompt('0: Back\n')
    const option = await this.#selectMenuOption(files.length)
    if (option === 0) {
      return
    } else {
      
      const content = await this.#dataStorage.loadSavedFileContent(files[option - 1])
      console.log(content)
      this.#content = content
      await this.#scanner.prompt('File loaded, press enter to continue...\n')
        .pauseUntilNext()
    }
  }

  /**
   * Loads a text from a user input.
   */
  async #loadFromInput () {
    this.#scanner.prompt('Enter a text line by line (enter blank line to stop):\n')
    const input = []
    while (true) {
      const line = await this.#scanner.nextLine()
      if (line === '') {
        break
      }

      input.push(line.trim())
    }

    this.#content = input.join(' ')

    await this.#scanner.prompt('Input loaded, press enter to continue...\n')
      .pauseUntilNext()
  }

  /**
   * The menu for text stats.
   */
  async #menuTextStats () {
    const maxOptionValue = this.#renderTextStatsMenu()
    const option = await this.#selectMenuOption(7)
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
   * Handles the action for the text stats menu.
   * 
   * @param {number} option The option to be selected.
   * @returns {void}
   */
  async #actionTextStatsMenu (option) {
    switch (option) {
    case 1:
      break
    case 2:
      break
    case 3:
      break
    case 4:
      break
    case 5:
      break
    case 6:
      break
    case 7:
      break
    case 0:
      return
      break
    }
  }

  /**
   * Menu for saving a the active text locally.
   * 
   * @returns {void}
   */
  async #menuSaveText () {
    if (this.#content === null) {
      await this.#scanner.prompt('No content loaded, press enter to return...\n')
        .pauseUntilNext()
      return
    }

    await this.#displaySavedFiles()
    
    this.#scanner.prompt('Enter save name: ')
    const name = await this.#getFileNameFromInput()
    await this.#dataStorage.saveAsFile(name, this.#content)
    await this.#scanner.prompt('Text saved, press enter to continue...\n')
      .pauseUntilNext()
  }

  /**
   * Displays the files that are locally stored.
   */
  async #displaySavedFiles () {
    this.#scanner.prompt('=== Current saves ===\n')
    for (const fileName of await this.#dataStorage.getSavedFileNames()) {
      this.#scanner.prompt(`${fileName}\n`)
    }
    this.#scanner.prompt('=====================\n')
  }

  /**
   * Gets a user defined file name from an input.
   * 
   * @returns {string} The file name.
   */
  async #getFileNameFromInput () {
    while (true) {
      try {
        const name = await this.#scanner.nextString()
        return name
      } catch {
        this.#scanner.prompt('Enter a valid name.\n')
      }
    }
  }
}

export default ApplicationConsoleUI
