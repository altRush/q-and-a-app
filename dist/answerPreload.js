"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const utils_1 = require("./utils");
const qna_json_1 = __importDefault(require("./info/qna.json"));
window.addEventListener("DOMContentLoaded", () => { });
electron_1.ipcRenderer.on("action-update-question", (event, arg) => {
    const element = document.querySelector("#answer");
    if (element)
        element.innerText = (0, utils_1.findAnswer)(qna_json_1.default, arg);
});
