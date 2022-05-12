import { ipcRenderer } from "electron";
import { createQuestionDOM, renderQuestions } from "./utils";
import qnaArray from "./info/qna.json";

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

  const questionArray = qnaArray.map((question) => question.question);

  const questionDOM = createQuestionDOM(questionArray);

  renderQuestions(questionDOM);

  const questionsElement = document.querySelector("#questions");

  if (questionsElement) {
    questionsElement.addEventListener("click", (e) => {
      const input = e.target as HTMLElement;
      // ipcRenderer.on('asynchronous-reply', (event, arg) => {
      // 	console.log(arg)
      // })
      ipcRenderer.send("asynchronous-message", input.innerText);
    });
  }
});
