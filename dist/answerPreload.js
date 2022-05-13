"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const utils_1 = require("./utils");
window.addEventListener("DOMContentLoaded", () => { });
electron_1.ipcRenderer.on("action-update-question", (event, arg) => {
    const element = document.querySelector("#answer");
    if (element)
        element.innerText = (0, utils_1.findAnswer)((0, utils_1.readSyncQna)(), arg);
});
electron_1.ipcRenderer.on("close-answer-window", (event, arg) => {
    electron_1.ipcRenderer.invoke("close-answer-window", arg).then((result) => {
        console.log(result);
    });
});
