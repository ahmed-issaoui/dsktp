// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    // pptr: (message) => ipcRenderer.send("pptr", message)
    pptr: () => ipcRenderer.invoke("get/puppeteer"),
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),

}

//window api

contextBridge.exposeInMainWorld("api", WINDOW_API)