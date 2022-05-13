"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow, answerWindow;
const ANSWER_WINDOW_TIMEOUT = 3000;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
        },
    });
    // const childWindow = new BrowserWindow({
    // 	width: 800,
    // 	height: 600,
    // 	parent: mainWindow
    // })
    // and load the index.html of the app.
    mainWindow.loadFile("index.html");
    // childWindow.loadFile('child.html')
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.ipcMain.on("asynchronous-message", (event, arg) => {
    setTimeout(() => {
        if (answerWindow)
            answerWindow.webContents.send("close-answer-window");
    }, ANSWER_WINDOW_TIMEOUT);
    if (!answerWindow) {
        answerWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            parent: mainWindow,
            webPreferences: {
                preload: path_1.default.join(__dirname, "answerPreload.js"),
            },
        });
        answerWindow.loadFile("child.html");
        answerWindow.webContents.openDevTools();
    }
    // console.log(arg) // prints "ping"
    // event.reply('asynchronous-reply', 'pong')
    answerWindow.webContents.send("action-update-question", arg);
    answerWindow.on("close", function () {
        if (answerWindow) {
            answerWindow.destroy();
            answerWindow = undefined;
        }
    });
});
electron_1.ipcMain.handle("close-answer-window", (event, arg) => __awaiter(void 0, void 0, void 0, function* () {
    if (answerWindow) {
        answerWindow.destroy();
        answerWindow = undefined;
    }
}));
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
