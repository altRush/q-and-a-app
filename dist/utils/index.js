"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAnswer = exports.renderQuestions = exports.createQuestionDOM = void 0;
const createQuestionDOM = (questionArray) => {
    const questionDOMArray = questionArray.map(question => `<div>${question}</div>`);
    return questionDOMArray.reduce((dom, question) => {
        return dom + question;
    });
};
exports.createQuestionDOM = createQuestionDOM;
const renderQuestions = (questionDOM) => {
    const element = document.getElementById('questions');
    if (element)
        element.innerHTML = questionDOM;
};
exports.renderQuestions = renderQuestions;
const findAnswer = (qnaObject, question) => {
    return Object.values(qnaObject).filter(entry => entry.question === question)[0]['answer'];
};
exports.findAnswer = findAnswer;
