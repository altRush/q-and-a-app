const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {})

ipcRenderer.on('action-update-question', (event, arg) => {
	document.querySelector('#answer').innerText = arg
})
