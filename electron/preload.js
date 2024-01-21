// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require("electron");

const exec = require("child_process").exec;

function isAdmin(cb) {
  try {
    exec("NET SESSION", (err, so, se) => {
      const isAdmin = se.length === 0;
      console.warn(isAdmin ? "admin" : "not admin");
      cb(isAdmin);
    });
  } catch (error) {}
}

contextBridge.exposeInMainWorld("electron", {
  isAdmin: () => new Promise((res) => isAdmin(res)),
  getCpuInfo(cb) {
    ipcRenderer.on("cpu-info", (_, args) => {
      cb(args);
    });
  },
  getCpuTemp(cb) {
    ipcRenderer.on("cpu-temp", (_, args) => {
      cb(args);
    });
  },
});
