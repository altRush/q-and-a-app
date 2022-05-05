const { ipcRenderer } = require('electron')
const { createQuestionDOM, renderQuestions } = require('./utils')
const questionObject = require('./info/questions.json')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	// const replaceText = (selector, text) => {
	//   const element = document.getElementById(selector)
	//   if (element) element.innerText = text
	// }

	// for (const type of ['chrome', 'node', 'electron']) {
	//   replaceText(`${type}-version`, process.versions[type])
	// }

	const questionArray = Object.values(questionObject)

	const questionDOM = createQuestionDOM(questionArray)

	renderQuestions(questionDOM)

	document.querySelector('#questions').addEventListener('click', () => {
		ipcRenderer.on('asynchronous-reply', (event, arg) => {
			console.log(arg) // prints "pong"
		})
		ipcRenderer.send('asynchronous-message', 'ping')
	})
})
