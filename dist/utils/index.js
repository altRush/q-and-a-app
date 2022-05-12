"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSyncQna = exports.findAnswer = exports.renderQuestions = exports.createQuestionDOM = void 0;
const fs_1 = __importDefault(require("fs"));
const createQuestionDOM = (questionArray) => {
    const questionDOMArray = questionArray.map((question) => `<div>${question}</div>`);
    return questionDOMArray.reduce((dom, question) => {
        return dom + question;
    });
};
exports.createQuestionDOM = createQuestionDOM;
const renderQuestions = (questionDOM) => {
    const element = document.getElementById("questions");
    if (element)
        element.innerHTML = questionDOM;
};
exports.renderQuestions = renderQuestions;
const findAnswer = (qnaObject, question) => {
    return qnaObject.filter((entry) => entry.question === question)[0]["answer"];
};
exports.findAnswer = findAnswer;
const readSyncQna = () => {
    const qnaArrayAsString = fs_1.default.readFileSync("./info/qna.json", "utf8");
    const qnaArray = JSON.parse(qnaArrayAsString);
    return qnaArray;
};
exports.readSyncQna = readSyncQna;
