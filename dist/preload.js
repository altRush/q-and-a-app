"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const utils_1 = require("./utils");
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    // const replaceText = (selector, text) => {
    //   const element = document.getElementById(selector)
    //   if (element) element.innerText = text
    // }
    // for (const type of ['chrome', 'node', 'electron']) {
    //   replaceText(`${type}-version`, process.versions[type])
    // }
    const qnaArray = (0, utils_1.readSyncQna)();
    const questionArray = qnaArray.map((question) => question.question);
    const questionDOM = (0, utils_1.createQuestionDOM)(questionArray);
    (0, utils_1.renderQuestions)(questionDOM);
    const questionsElement = document.querySelector("#questions");
    if (questionsElement) {
        questionsElement.addEventListener("click", (e) => {
            const input = e.target;
            // ipcRenderer.on('asynchronous-reply', (event, arg) => {
            // 	console.log(arg)
            // })
            electron_1.ipcRenderer.send("asynchronous-message", input.innerText);
        });
    }
});
