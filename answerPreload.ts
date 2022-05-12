import { ipcRenderer } from "electron";
import { findAnswer } from "./utils";
import qnaObject from "./info/qna.json";

window.addEventListener("DOMContentLoaded", () => {});

ipcRenderer.on("action-update-question", (event, arg) => {
  const element = document.querySelector<HTMLElement>("#answer");

  if (element) element.innerText = findAnswer(qnaObject, arg);
});
