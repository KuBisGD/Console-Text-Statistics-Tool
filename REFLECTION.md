# Reflection

 - Meaningful names

When picking names for methods in a console application it became important to utilize one word per concept. Since most actions in one way or another repetitions of each other, menu methods are prefixed with `menu` followed by the menu name, each menu contains a `render` method that shows the options that can be selected, and an `action` method then handles the selected option for that menu.
```js
async #menuStart () {
  const maxOptionValue = this.#renderStartMenu()
  const option = await this.#selectMenuOption(maxOptionValue)
  await this.#actionStartMenu(option)
}
```
This also uses intention-revealing names to make it easier to find the responsibilities of each method. Names with intention also became important when naming class properties such as `savesFolderPath` that uses a searchable and pronounceable name that is very clear with its intentions.
```js
class TextDataStorage {
  /**
   * @type {string}
   */
  #savesFolderPath
```
This is not a very cute name which is something that was always avoided when naming variables.

 - Functions

Something that became important when building the console application was to keep the methods to a single level of abstraction. While knowing what abstraction level the code is on can be challenging breaking menu methods down to their core components and doing this for every method became a good template on how to achieve this.
By deliberately not following the verb -> noun pattern and prefixing them with their responsibilities helped organize the code, note however that the `render` methods like `#renderTextStatsMenu` still follows the pattern.
```js
async #menuStart () {
  const maxOptionValue = this.#renderStartMenu()
  const option = await this.#selectMenuOption(maxOptionValue)
  await this.#actionStartMenu(option)
}
```
```js
async #menuTextStats () {
  const maxOptionValue = this.#renderTextStatsMenu()
  const option = await this.#selectMenuOption(maxOptionValue)
  await this.#actionTextStatsMenu(option)
}
```
This also helped the methods to do one thing each, however, this rule was deliberately broken in the `render` methods since they also return the number of options in the menu. This was done because of the `#selectMenuOption` method requires the number of options to validate the input, and the ´render´ methods are the information expert for this information.

While the goal is for each method to be small making a console application that constantly requires texts to be displayed and inputs to be validates can lead to larger methods.
```js
async #actionStartMenu (option) {
  switch (option) {
  case 1:
    await this.#menuLoadSavedFile()
    break
  case 2:
    await this.#loadFromInput()
    break
  case 3:
    await this.#runTextStatistics()
    break
  case 4:
    await this.#menuSaveText()
    break
  case 0:
    process.exit()
    break
  default:
    throw new Error('Invalid start menu option given')
  }
}
```
```js
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
```
These methods only redirects the applications flow to new options but it takes a lot of space to do this. Methods not related to this type of logic are mostly smaller such as the storing and loading of text files.
```js
async loadSavedFileContent (fileName) {
  const content = await fs.readFile(`${this.#savesFolderPath}/${fileName}.txt`)
  return new TextFileContent(content.toString())
}
```
```js
async saveAsFile (fileName, content) {
  await fs.writeFile(
    `${this.#savesFolderPath}/${fileName.trim()}.txt`,
    content
  )
}
```
The `saveAsFile()` method is also only one of two dyadic method in this application. No triads where used.

 - Comments

Comments are not something that is used in the code except for jsdoc commend documenting methods and classes. Most of these commend however are redundant comments that don not give more information to the user than the method name already gives.
```js
/**
 * Menu for loading a saved file.
 */
async #menuLoadSavedFile () { /* ... */ }
```

This is one of the worst offender of this, the comment could be more descriptive like *"Displays the saved-files menu and loads the file selected by the user."* but even this does not add much of useful information apart from that the uses is responsible for selecting the file which is good.
```js
/**
 * Runs the text statistics UI with the currently loaded content.
 * 
 * @returns {void}
 */
async #runTextStatistics () { /* ... */ }
```
While this is not a groundbreaking comment it gives more information about the method that cannot be found in its name, such as that it will use content that is currently loaded.

The only instance of an inline comment in the code was in the retrieval of file names when the file name extension is removed from the text (.txt) file name.
```js
async getSavedFileNames () {
  const saves = await fs.readdir(this.#savesFolderPath)
  return saves
    .filter(name => name.includes(TextDataStorage.SAVED_FILE_FORMAT))
    .map(name => name.substring(0, name.length - TextDataStorage.SAVED_FILE_FORMAT.length)) // Removes file name extension from name
}
```
While the comment is not required it does ease the reading of the code to not require mental math to substring the name of the text file.

The reason that i generally do not include inline comment comes from the fact that i feel that if a comment is required the code should look different to begin with. It is sometimes also hard to notice in the moment whether or a comment is required. The use of redundant comments stems from a previous requirement to include comments on every method and its parameters.
I do fell that comments that inform and explain intent is generally lacking from the code.


 - Formatting

When writing code having a vertical openness between concepts is an important part of keeping the code clean. It acts like a comma when reading code and  separates different important concepts to each other.
```js
#getSecondsToTimeString (seconds) {
  const time = { hours: 0, minutes: 0, seconds: 0 }
  time.seconds = seconds % 60
  const totalMinutes = (seconds - time.seconds) / 60
  time.minutes = totalMinutes % 60
  time.hours = (totalMinutes - time.minutes) / 60

  let timeString = ''
  if (time.hours !== 0) timeString += `${time.hours} hours `
  if (time.minutes !== 0) timeString += `${time.minutes} minutes `
  if (time.seconds !== 0) timeString += `${time.seconds} seconds`

  return timeString
}
```
Here `timeString` is also declared just before it is used to have a smaller vertical distance in the code.

```js
#numberIsInRange (number, range = {}) {
  const { min, max } = range

  if (min !== undefined) this.#validateRangeBound(min, 'min')
  if (max !== undefined) this.#validateRangeBound(max, 'max')

  if (min !== undefined && min > number) return false
  if (max !== undefined && max < number) return false

  return true
}
```
Another example of this form the `Scanner` class, first range is restructured, then input is validated, and finally values are compared.


The vertical ordering of methods is also in the general order that they are called in, with some exceptions to latter additions to the code. The `StatisticsConsoleUI` class is a perfect example of this being put into practice.

When formatting horizontally the only thing that i constantly keep in mind is line length. The longest line that i could find in the code is ~135 characters long and that includes a comment, the actual longest code line is closer to ~100 characters.

 - Objects

The actual code of this application is not very complex and did therefore not require much complexity when it came to object and their relations. The UI classes could have a polymorphic behavior since both share a public `start()` method but interfaces do not exists in JavaScript and inheriting form a parent UI class did not feel like it added any benefit to the code.

The class `TextFileContent` sort of acts like a data transfer object but at the same time its not really a DTO. It is true that it is an object whose soul purpose is to contain and transfer information, it only a data structure that contains one value and this was done so that a text files content does not have to be stored at multiple locations but classes can instead have a reference to the object that contains the content.

When using objects "train wrecks" are avoided but method chaining is used on some occasions.
```js
await this.#scanner.prompt(/* ... */)
  .pauseUntilNext()
```
This is a common construction used in the code and along with the previously shown filename filtering and formatting is an accepted use for chaining methods. This is because the methods called return only the an reference to the object that the method was called on while "train wrecks" are chains on multiple object of what could be different types. These chains are also not broken into declarations as to not violate the "Law of Demeter"

 - Error-handling

When handling errors in the console applications most of them stem from the user providing an invalid input.
```js
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
```
The method simply traps the user in a loop until a valid input is given, if not the error is caught, the user is prompted to give a valid input and the saga continues. The application only catches exceptions and the ones is throws are not caught since they should not be reachable and are therefore logic errors and should crash the program.

Error handling in the `Scanner` module is much more precise in its actions.
```js
/**
 * Gets the next string.
 * 
 * @param {StringMatch} [match=object] Pattern for matching the next string.
 * @throws {RangeError} If the provided string length is outside the allowed range, or the range values are not finite.
 * @throws {RegExpDoesNotMatchError} If input does not match given pattern.
 * @throws {EndOfFileError} If there is no more data to read.
 * @throws {TypeError} If range values are not numbers.
 * @returns {Promise<string>} The next string.
 */
async nextString (match = {}) {
  const { pattern } = match
  const token = await this.next()

  if (pattern instanceof RegExp) {
    if (!pattern.test(token)) {
      throw new RegExpDoesNotMatchError(`'${token}' does not match ${pattern}`)
    }
  } else if (pattern !== undefined) {
    throw new TypeError('Pattern must be of type RegExp or undefined')
  }

  if (!this.#numberIsInRange(token.length, match)) {
    throw new RangeError(`Length of '${token}' must be in range: min:${match.min} max:${match.max}`)
  }

return token
}
```
Here different types of exceptions are thrown depending on the error and each of them have their own custom context.

 - Gränser
 - Enhetstester
 - Klasser
 - System