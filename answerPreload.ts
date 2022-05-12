import fs from "fs";
import { ipcRenderer } from "electron";
import { findAnswer, readSyncQna } from "./utils";

window.addEventListener("DOMContentLoaded", () => {});

ipcRenderer.on(
  "action-update-question",
  (event: Electron.IpcRendererEvent, arg: string): void => {
    const element = document.querySelector<HTMLElement>("#answer");

    if (element) element.innerText = findAnswer(readSyncQna(), arg);
  }
);
