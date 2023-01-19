// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    pptr: (campaignDetails) => ipcRenderer.invoke("get/puppeteer", campaignDetails),
    
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),

    registerAccount: () => ipcRenderer.send('open-register'),
    forgot: () => ipcRenderer.send('open-forgot'),
    support: () => ipcRenderer.send('open-support'),
    customerPortal: (url) => ipcRenderer.send('open-customerPortal',url),
    upgradeAccount: () => ipcRenderer.send('open-upgrade'),

    // getConfig: () => ipcRenderer.invoke('get/config'),
}


contextBridge.exposeInMainWorld("api", WINDOW_API)