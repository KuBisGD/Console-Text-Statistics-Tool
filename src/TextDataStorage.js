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
   * Gets the file name extension of the stored files.
   * 
   * @returns {string} The file name extension including the ".".
   */
  static get SAVED_FILE_FORMAT () {
    return '.txt'
  }

  /**
   * Creates a new.
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
      .filter(name => name.endsWith(TextDataStorage.SAVED_FILE_FORMAT))
      .map(name => name.substring(0, name.length - TextDataStorage.SAVED_FILE_FORMAT.length)) // Removes file name extension from name
  }

  /**
   * Saves a string as a text file.
   * 
   * @param {string} fileName Name without '.txt'.
   * @param {string} content Content to be placed in file.
   */
  async saveAsFile (fileName, content) {
    await fs.writeFile(
      `${this.#savesFolderPath}/${fileName.trim()}${TextDataStorage.SAVED_FILE_FORMAT}`,
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
