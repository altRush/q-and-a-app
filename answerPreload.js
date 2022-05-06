const { ipcRenderer } = require('electron')
const { findAnswer } = require('./utils')
const qnaObject = require('./info/qna.json')

window.addEventListener('DOMContentLoaded', () => {})

ipcRenderer.on('action-update-question', (event, arg) => {
	document.querySelector('#answer').innerText = findAnswer(qnaObject, arg)
})
