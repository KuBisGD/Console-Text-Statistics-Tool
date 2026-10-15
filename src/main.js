import TextStatConsoleUI from './TextStatConsoleUI.js'

const SAVES_PATH = './src/data'

console.log('--- main file ---')

const ui = new TextStatConsoleUI(process.stdin, process.stdout, SAVES_PATH)

await ui.start()

