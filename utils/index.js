const createQuestionDOM = questionArray => {
	const questionDOMArray = questionArray.map(
		question => `<div>${question}</div>`
	)

	return questionDOMArray.reduce((dom, question) => {
		return dom + question
	})
}

const renderQuestions = questionDOM => {
	const element = document.getElementById('questions')

	if (element) element.innerHTML = questionDOM
}

module.exports = { createQuestionDOM, renderQuestions }
