const { ipcRenderer } = require('electron')
const { createQuestionDOM, renderQuestions } = require('./utils')
const questionObject = require('./info/qna.json')

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

	const questionArray = Object.values(questionObject).map(
		question => question.question
	)

	const questionDOM = createQuestionDOM(questionArray)

	renderQuestions(questionDOM)

	if (document.querySelector('#questions')) {
		document.querySelector('#questions').addEventListener('click', e => {
			ipcRenderer.on('asynchronous-reply', (event, arg) => {
				console.log(arg) // prints "pong"
			})
			ipcRenderer.send('asynchronous-message', e.target.innerText)
		})
	}
})
