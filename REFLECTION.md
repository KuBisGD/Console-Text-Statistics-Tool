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


 
 - Kommentarer
 - Formatering
 - Objekt
 - Felhantering
 - Gränser
 - Enhetstester
 - Klasser
 - System