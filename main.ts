// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let mainWindow: BrowserWindow | undefined,
  answerWindow: BrowserWindow | undefined;

const ANSWER_WINDOW_TIMEOUT = 3_000;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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
app.whenReady().then((): void => {
  createWindow();

  app.on("activate", function (): void {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on(
  "asynchronous-message",
  (event: Electron.IpcMainEvent, arg: string): void => {
    setTimeout((): void => {
      if (answerWindow) answerWindow.webContents.send("close-answer-window");
    }, ANSWER_WINDOW_TIMEOUT);

    if (!answerWindow) {
      answerWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow,
        webPreferences: {
          preload: path.join(__dirname, "answerPreload.js"),
        },
      });

      answerWindow.loadFile("child.html");
      answerWindow.webContents.openDevTools();
    }
    // console.log(arg) // prints "ping"
    // event.reply('asynchronous-reply', 'pong')

    answerWindow.webContents.send("action-update-question", arg);

    answerWindow.on("close", function (): void {
      if (answerWindow) {
        answerWindow.destroy();
        answerWindow = undefined;
      }
    });
  }
);

ipcMain.handle(
  "close-answer-window",
  async (event: Electron.IpcMainInvokeEvent, arg: string) => {
    if (answerWindow) {
      answerWindow.destroy();
      answerWindow = undefined;
    }
  }
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function (): void {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
