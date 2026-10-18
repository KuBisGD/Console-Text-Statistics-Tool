/**
 * Class for storing the content of a text file.
 */
class TextFileContent {
  /**
   * @type {string}
   */
  #content

  /**
   * Gets the content of the text file.
   */
  get content () {
    return this.#content
  }

  /**
   * Creates a new text file content object.
   * 
   * @param {string} content The content of the file.
   */
  constructor (content) {
    this.#content = content
  }
}

export default TextFileContent
