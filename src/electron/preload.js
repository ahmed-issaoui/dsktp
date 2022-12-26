// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    pptr: (campaignDetails) => ipcRenderer.invoke("get/puppeteer", campaignDetails),
    
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),

    registerAccount: () => ipcRenderer.sendSync('open-register'),
    forgot: () => ipcRenderer.sendSync('open-forgot'),
    upgradeAccount: () => ipcRenderer.sendSync('open-upgrade'),

    readFile: () => {
        ipcRenderer.send('read-file')
        return new Promise((resolve) => ipcRenderer.once('read-file-success', (event, data) => resolve({ event, data }))
        )
    },

}

//window api

contextBridge.exposeInMainWorld("api", WINDOW_API)