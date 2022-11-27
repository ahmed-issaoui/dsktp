
const { app, dialog, BrowserWindow, ipcMain} = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");

const linkedinSignIn = require("./pptr/linkedin/linkedinSignIn");
const linkedinApply = require("./pptr/linkedin/linkedinApply");

const glassdoorSignIn = require("./pptr/glassdoor/glassdoorSignIn");
const glassdoorApply = require("./pptr/glassdoor/glassdoorApply");

const indeedSignIn = require("./pptr/indeed/indeedSignIn");
const indeedApply = require("./pptr/indeed/indeedApply");

app.setAppUserModelId('Easyjob');

const createWindow = () => {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 900,
		height: 600,
		maxWidth: 1000,
		minWidth: 700,
		minHeight: 450,
		maxHeight: 700,
		icon: (path.join(__dirname, './assets/images/icon-easyjob.ico')),
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: '#000000',
			symbolColor: '#785df5',
			height: 35

 		},
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: true,
		},
		
	});

	win.setBackgroundColor('#000000');

	win.loadURL(
		isDev
			? "http://localhost:3000"
			: `file://${path.join(__dirname, "../build/index.html")}`
	);


	// Open the DevTools.
	if (isDev) {
		// win.webContents.openDevTools({ mode: "detach" });
		// require('react-devtools-electron');
		console.log('Is dev true')
	};

	if (!isDev) {
		autoUpdater.checkForUpdates();
	};

	win.setMenu(null)

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Ok'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version is being downloaded.'
	}
	dialog.showMessageBox(dialogOpts, (response) => {

	});
})

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall()
	})
});



// Saving Speed

var speed;

ipcMain.on("get/speedParams", (event, data) => {
	speed = data;
	console.log('inside function ' + speed)
});

// Platform 

var platform;

ipcMain.on("get/platformParams", (event, data) => {
	platform = data;
	console.log('platform is ' + platform)
});


// Handling message to launch puppeteer from renderer)


ipcMain.handle("get/puppeteer", async (event, args)=>{
	if (platform == "linkedin") {
			if (fs.existsSync('./public/pptr/linkedin/linkedinCookies.js')) {
				console.log('Cookies exist, Launching Linkedin Apply');
				try { linkedinApply(speed); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Linkedin Sign in then Apply ');
				(async () => {
					try {
						await linkedinSignIn();
						await linkedinApply(speed)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
	else if (platform == "glassdoor") {
			if (fs.existsSync('./public/pptr/glassdoor/glassdoorCookies.js')) {
				console.log('Cookies exist, Launching Glassdoor Apply');
				try { glassdoorApply(speed); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Glassdoor Sign in then Apply ');
				(async () => {
					try {
						await glassdoorSignIn()
						await glassdoorApply(speed)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
	else if (platform == "indeed") {
			if (fs.existsSync('./public/pptr/indeed/indeedCookies.js')) {
				console.log('Cookies exist, Launching Indeed Apply');
				try { indeedApply(speed); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Indeed Sign in then Apply ');
				(async () => {
					try {
						await indeedSignIn()
						await indeedApply(speed)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
  });