import Scanner from '@kubis/input-scanner'
import TextDataStorage from './TextDataStorage.js'

class TextStatConsoleUI {
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

  async #menuStart () {
    this.#scanner.prompt('1: Load text form file\n')
    this.#scanner.prompt('2: Manual line input\n')
    this.#scanner.prompt('3: View text statistics\n')
    this.#scanner.prompt('4: Save loaded text\n')
    this.#scanner.prompt('0: Exit\n')
    const option = await this.#selectMenuOption(4)
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

  async #menuSaveText () {
    if (this.#content === null) {
      await this.#scanner.prompt('No content loaded, press enter to return...\n')
        .pauseUntilNext()
    }
  }
}

export default TextStatConsoleUI
