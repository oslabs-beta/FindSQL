const { app, BrowserWindow } = require("electron");
const path = require("path");
const server = require("../server/server");
const grapQLserver = require("../server/graphQL/server2.js");

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    //set the opening width and height
    width: 1200,
    height: 770,
    // set the minimum resizable width and height
    minWidth: 1040,
    minHeight: 680,
    autoHideMenuBar: true,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // removes the flickering that happens on stanard start up
  window.on("ready-to-show", window.show);

  // loading information from localhost3000 when running
  window.loadURL(`http://localhost:3000`);

  window.webContents.openDevTools();
}

// opens window when the windows information is loaded
app.whenReady().then(createWindow);

// allows iOS stuff to be opened, otherwise quits the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// allows windows OS to be opened
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
