// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {ipcRenderer, contextBridge} = require('electron');

const WINDOW_API = {
    pptr: (campaignDetails) => ipcRenderer.invoke("get/puppeteer", campaignDetails),

    loadUserData: () => ipcRenderer.invoke("load/data"),
    saveUserData: (dataToSave) => ipcRenderer.invoke("save/data", dataToSave),
    
    saveNewAutopilotlist: (autopilotList) => ipcRenderer.invoke("save/autopilotList", autopilotList),
    deleteAutopilot: (autpilotReference) => ipcRenderer.invoke("save/deleteAutopilot", autopilotList),
    
    speedParams: (speed) => ipcRenderer.send("get/speedParams", speed),
    
    logoutPpptr: (platform) => ipcRenderer.send("logout/pptr", platform),

    registerAccount: () => ipcRenderer.send('open-register'),
    forgot: () => ipcRenderer.send('open-forgot'),
    support: () => ipcRenderer.send('open-support'),
    customerPortal: (url) => ipcRenderer.send('open-customerPortal',url),
    upgradeAccount: () => ipcRenderer.send('open-upgrade'),

    // getConfig: () => ipcRenderer.invoke('get/config'),
}


contextBridge.exposeInMainWorld("api", WINDOW_API)