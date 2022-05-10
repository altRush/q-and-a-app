export const createQuestionDOM = (questionArray: string[]) => {
	const questionDOMArray = questionArray.map(
		question => `<div>${question}</div>`
	)

	return questionDOMArray.reduce((dom: string, question: string) => {
		return dom + question
	})
}

export const renderQuestions = (questionDOM: string) => {
	const element = document.getElementById('questions')

	if (element) element.innerHTML = questionDOM
}

export const findAnswer = (qnaObject: object, question: string) => {
	return Object.values(qnaObject).filter(
		entry => entry.question === question
	)[0]['answer']
}
