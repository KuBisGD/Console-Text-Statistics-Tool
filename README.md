# Console Text Statistics Tool

## Project vision

The Console Text Statistics Tool aims to make it easy to explore a texts statistics from the
command line. Users can provide text, inspect useful measures of its size and
word usage, estimate how long it may take to read, and save texts for later.
The application presents these actions through a simple menu-driven console
interface.

## Requirements

### Text input

- Users can enter text one line at a time. An empty line ends input, and the
  entered lines become the current text.
- Users can load text by providing a file path.
- The application makes the loaded text available for statistics and saving.

### Text statistics

For the current text, users can view:

- Character count
- Word count
- Sentence count
- The number of appearances of each word, ordered from most frequent to least
  frequent
- Average word length, in characters
- Average sentence length, in words
- Estimated reading time based on a user-provided reading speed in words per
  minute

### Saved texts

- The application saves text files in its predetermined saves folder.
- Users can choose a name for each saved text.
- Users can see the available saved texts and load one for analysis.
- Saved texts use the `.txt` file extension.

### Console interface

- Users can navigate the application's features through console menus.
- The interface provides a way to return to the previous menu and to exit the
  application.
- Invalid menu choices and reading speeds are rejected with a prompt to try
  again.

## Run the application

1. Download code from github.
2. Navigate to the application directory.
3. Install dependencies

Requires Node.js and npm.

```sh
npm install
```

4. Start the application

```sh
npm start
```

To run the automated tests:

```sh
npm test
```

## Project documentation

- [Use cases](./USE_CASE.md) describe the application's user flows.
- [Test report](./TEST_REPORT.md) summarizes manual and automated testing.
