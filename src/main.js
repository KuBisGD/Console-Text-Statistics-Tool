import ApplicationConsoleUI from './ApplicationConsoleUI.js'

const SAVES_PATH = './src/data'

const ui = new ApplicationConsoleUI(process.stdin, process.stdout, SAVES_PATH)

await ui.start()
