// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    pptr: () => ipcRenderer.invoke("get/puppeteer"),
    
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),
    platformParams: (platform) => ipcRenderer.send("get/platformParams", platform),

    registerAccount: () => ipcRenderer.sendSync('open-register'),
    forgot: () => ipcRenderer.sendSync('open-forgot')



}

//window api

contextBridge.exposeInMainWorld("api", WINDOW_API)