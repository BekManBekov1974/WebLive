const {
  BrowserWindow,
  app,
  globalShortcut,
  ipcMain,
  shell,
} = require("electron");
const url = require("url");
const path = require("path");
let win;
app.on("ready", () => {
  win = new BrowserWindow({
    backgroundColor: "#0D0F12",
    width: 800,
    height: 700,
    minWidth: 800,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame: false,
    
  });
  
  win.setTitle("WebLive");
  win.setBackgroundColor("#0D0F12");
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  win.maximize();
  win.show();

  win.setMenu(null);
  const ret = globalShortcut.register("F6", () => {
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools();
    } else {
      win.webContents.toggleDevTools();
    }
  });

  const met = globalShortcut.register("F7", (e) => {
    win.reload();
  });

  const full = globalShortcut.register("F11", (e) => {
    if (win.isFullScreen()) win.setFullScreen(false);
    else win.setFullScreen(true);
    win.webContents.send("salom", "qale");
  });
  win.on("close", () => {
    win = null;
  });
  ipcMain.on("saqlash", (event, path) => {
    const { dialog } = require("electron");
    dialog
      .showSaveDialog({
        title: "Saqlash joyini tanlang!",
        filters: [
          {
            name: "WebLive loyiha",
            extensions: ["folder"],
          },
        ],
        properties: [
          "openFile",
          "showOverwriteConfirmation",
          "createDirectory",
        ],
      })
      .then((file) => {
        if (file.canceled) {
          return;
        } else {
          event.sender.send("saqlandi", file.filePath);
        }
      });
  });
  ipcMain.on("newproject", (event, path) => {
    const { dialog } = require("electron");
    dialog
      .showOpenDialog({
        title: "Joylashuvni tanlang!",

        properties: ["openDirectory"],
      })
      .then((file) => {
        if (file.canceled) {
          return;
        } else {
          event.sender.send("projected", file);
        }
      });
  });
  ipcMain.on("minimize", (e) => {
    win.minimize();
  });
  ipcMain.on("closewindow", (e) => {
    win.close();
  });
  ipcMain.on("addHtml", (e, q,dp) => {
    const { dialog } = require("electron");
    dialog
      .showSaveDialog({
        defaultPath:dp,
        title:
          (q == 1 ? "HTML " : q == 2 ? "CSS " : "Js ") +
          "faylini saqlash joyini tanlang!",
        filters: [
          {
            name:
              q == 1 ? "HTML fayl" : q == 2 ? "CSS fayl" : "JavaScript fayl",
            extensions: [q == 1 ? "html" : q == 2 ? "css" : q == 3 ? "js" : ""],
          },
        ],
        properties: [
          "openFile",
          "showOverwriteConfirmation",
          "createDirectory",
        ],
      })
      .then((file) => {
        if (file.canceled) {
          return;
        } else {
          e.sender.send("addedH", file.filePath);
        }
      });
  });
  ipcMain.on("maxmin", (e) => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
});
