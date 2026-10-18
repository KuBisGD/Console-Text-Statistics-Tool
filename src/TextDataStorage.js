import fs from 'node:fs/promises'
import TextFileContent from './TextFileContent'

/**
 * Class for saving and loading text content.
 */
class TextDataStorage {
  /**
   * @type {string}
   */
  #savesFolderPath

  /**
   * Creates a new 
   * 
   * @param {string} savesFolderPath Path to folder with saved data.
   */
  constructor (savesFolderPath) {
    this.#savesFolderPath = savesFolderPath
  }

  /**
   * Gets a list of the saved files names.
   * 
   * @returns {string[]} List of saved file names.
   */
  async getSavedFileNames () {
    const saves = await fs.readdir(this.#savesFolderPath)
    return saves
      .filter(name => name.includes('.txt'))
      .map(name => name.substring(0, name.length - 4))
  }

  /**
   * Saves a string as a text file.
   * 
   * @param {string} fileName Name without '.txt'.
   * @param {string} content Content to be placed in file.
   */
  async saveAsFile (fileName, content) {
    await fs.writeFile(
      `${this.#savesFolderPath}/${fileName.trim()}.txt`,
      content
    )
  }

  /**
   * Loads the saved content from a file.
   * 
   * @param {name} fileName Name of the file to load.
   * @returns {TextFileContent}
   */
  async loadSavedFileContent (fileName) {
    const content = await fs.readFile(`${this.#savesFolderPath}/${fileName}.txt`)
    return new TextFileContent(content.toString())
  }
}

export default TextDataStorage
