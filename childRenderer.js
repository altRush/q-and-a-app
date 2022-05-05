ipcRenderer.on('asynchronous-message', function (evt, message) {
	const answerElement = document.getElementById('answer')

	if (answerElement) answerElement.innerText = message
})
