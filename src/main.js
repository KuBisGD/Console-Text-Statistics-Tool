import ApplicationConsoleUI from './ApplicationConsoleUI.js'

const SAVES_PATH = './src/data'

console.log('--- main file ---')

const ui = new ApplicationConsoleUI(process.stdin, process.stdout, SAVES_PATH)

await ui.start()

