// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    pptr: (campaignDetails) => ipcRenderer.invoke("get/puppeteer", campaignDetails),
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),
    
    
    loadUserData: () => ipcRenderer.invoke("load/data"),
    saveUserData: (dataToSave) => ipcRenderer.invoke("save/data", dataToSave),
    
    getLoginStatus: () => ipcRenderer.invoke("get/loginStatus"),
    logoutFromPlatform: (platform) => ipcRenderer.send("platform/logout", platform),
    loginToPlatform: (platform) => ipcRenderer.send("platform/login", platform),

    registerAccount: () => ipcRenderer.send('open-register'),
    forgot: () => ipcRenderer.send('open-forgot'),
    support: () => ipcRenderer.send('open-support'),
    customerPortal: (url) => ipcRenderer.send('open-customerPortal',url),
    upgradeAccount: () => ipcRenderer.send('open-upgrade'),

}


contextBridge.exposeInMainWorld("api", WINDOW_API)