import { ipcRenderer } from "electron";
import { createQuestionDOM, readSyncQna, renderQuestions } from "./utils";
import { qnaRecord } from "./types";

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", (): void => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }

  const qnaArray = readSyncQna();

  const questionArray = qnaArray.map(
    (question: qnaRecord) => question.question
  );

  const questionDOM = createQuestionDOM(questionArray);

  renderQuestions(questionDOM);

  const questionsElement = document.querySelector("#questions");

  if (questionsElement) {
    questionsElement.addEventListener("click", (e): void => {
      const input = e.target as HTMLElement;
      // ipcRenderer.on('asynchronous-reply', (event, arg) => {
      // 	console.log(arg)
      // })
      ipcRenderer.send("asynchronous-message", input.innerText);
    });
  }
});
