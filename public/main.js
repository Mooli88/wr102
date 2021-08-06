const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const {
  getCpuTemperature,
  getCpuInfo,
} = require("../electron/utils/systemInfo");

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      // enableRemoteModule: true,
      preload: path.join(__dirname, "../electron/preload.js"),
    },
  });

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools();

  return win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

// TODO: Move to a more appropriate place
async function runJobs() {
  const win =
    BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];

  const emitCpuInfo = async () => {
    const info = await getCpuInfo();
    win.webContents.send("cpu-info", info);
  };
  const emitCpuTemp = async () => {
    const temp = await getCpuTemperature();
    win.webContents.send("cpu-temp", temp);
  };

  Promise.all([]);
  await emitCpuInfo();
  await emitCpuTemp();

  setTimeout(() => {
    runJobs();
  }, 3000);
}

app.on("ready", async () => {
  await createWindow();
  runJobs();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
