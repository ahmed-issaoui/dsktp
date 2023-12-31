
const { app, dialog, BrowserWindow, ipcMain} = require("electron");
const { autoUpdater } = require("electron-updater");
const Store = require('electron-store');
const isDev = require("electron-is-dev");

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

const shell = require('electron').shell;

const {linkedinSignIn} = require("./pptr/linkedin/linkedinSignIn");
const linkedinApply = require("./pptr/linkedin/linkedinApply");
const glassdoorSignIn = require("./pptr/glassdoor/glassdoorSignIn");
const glassdoorApply = require("./pptr/glassdoor/glassdoorApply");
const indeedSignIn = require("./pptr/indeed/indeedSignIn");
const indeedApply = require("./pptr/indeed/indeedApply");

const expressServer = require('./server');

// const CronJob = require('cron').CronJob;


// Let's Go 

app.setAppUserModelId('Superlazy');

const createWindow = () => {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 900,
		height: 620,
		maxWidth: 950,
		minWidth: 850,
		minHeight: 550,
		maxHeight: 690,
		maximizable: false,
		icon: (path.join(__dirname, './assets/images/icon-superlazy.ico')),
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: '#000000',
			symbolColor: '#695DF5',
			height: 35

 		},
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		
	});

	win.setBackgroundColor('#000000');

	win.loadURL(
		isDev
			? "http://localhost:3000"
			: "http://localhost:4198"
	);


	// Open the DevTools.
	if (isDev) {
		setTimeout(()=>{
			win.webContents.openDevTools({ mode: 'detach' });

		}, 3000)
	};

	if (!isDev) {
		autoUpdater.checkForUpdates();
	};

	win.setMenu(null)
	
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
	expressServer();
	createWindow()

})




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
		detail: 'A new version is being downloaded. Please do not close the application until it is completed.'
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

ipcMain.on('app_version', (event) => {
	event.sender.send('app_version', { version: app.getVersion() });
  });


ipcMain.handle("get/appVersion", async (event, data)=>{
	let version = app.getVersion()
	return version

})


// Persistent storage

const schema = {

	name: {
		type: 'string',
	},
	email: {
		type: 'string',
	},
	phone: {
		type: 'string',
	},
	resumePath: {
		type: 'string',
	},
	answers: {
		type: 'object'
	},

	autopilotCampaignsList: {
		type: 'array'
	},
	history: {
		type: 'array'
	},
	linkedinLastLogin: {
		type: 'number',
	},
	glassdoorLastLogin: {
		type: 'number',
	},
	indeedLastLogin: {
		type: 'number',
	},


};

const store = new Store({schema});

// Save data

ipcMain.handle("load/data", async (event, data)=>{

	const dataToLoad = {
		name: "", 
		email: "", 
		phone: "", 
		resumePath: "", 
		answers: {},
		autopilotCampaignsList: [],
		history: [],
	};

	try {
		dataToLoad.user = store.get('user') ? store.get('user') : "" 
		dataToLoad.name = store.get('name') ? store.get('name') : "" 
		dataToLoad.email = store.get('email') ? store.get('email') : "" 
		dataToLoad.phone = store.get('phone') ? store.get('phone') : "" 
		dataToLoad.resumePath = store.get('resumePath') ? store.get('resumePath') : "" 
		dataToLoad.autopilotCampaignsList = store.get('autopilotCampaignsList') ? store.get('autopilotCampaignsList') : []
	
	} catch(err) {
		console.error(err)
	}


	return dataToLoad


})

ipcMain.handle("save/data", async (event, data)=>{
	const dataDetails = data;

	const name = dataDetails.name ? dataDetails.name : "" 
	const email = dataDetails.email ? dataDetails.email : "" 
	const phone = dataDetails.phone ? dataDetails.phone : "" 
	const resumePath = dataDetails.resume.path ? dataDetails.resume.path : "" 

	try {
		store.set('name', name);
		store.set('email', email);
		store.set('phone', phone);
		store.set('resumePath', resumePath);
	} catch(err) {
		console.error(err)
	}


})

const linkedinCookiesPath = path.join(__dirname, './pptr/linkedin/linkedinCookies.txt')
const glassdoorCookiesPath = path.join(__dirname, './pptr/glassdoor/glassdoorCookies.txt')
const indeedCookiesPath = path.join(__dirname, './pptr/indeed/indeedCookies.txt')

// Login



ipcMain.handle("get/loginStatus", async (event, data)=>{
	let linkedinStatus
	let glassdoorStatus
	let indeedStatus



	if (fs.existsSync(linkedinCookiesPath)) {
		linkedinStatus = true	
	}
	if (fs.existsSync(glassdoorCookiesPath)) {
		glassdoorStatus = true	
	}
	if (fs.existsSync(indeedCookiesPath)) {
		indeedStatus = true	
	}

	const loginStatus = {linkedinStatus, glassdoorStatus, indeedStatus}
	const dataToLoad = JSON.stringify(loginStatus)

	return dataToLoad



})



ipcMain.on('platform/login', (event, data) => {

	if (data === "linkedin") {

		(async () => {
			try {
				await linkedinSignIn(store);
			}
			catch (error) {console.error(error)}
		})();


	}
	else if (data === "glassdoor") {

		(async () => {
			try {
				await glassdoorSignIn(store);
			}
			catch (error) {console.error(error)}
		})();


	}
	else if (data === "indeed") {

		(async () => {
			try {
				await indeedSignIn(store);
			}
			catch (error) {console.error(error)}
		})();


	}


});
ipcMain.on('platform/logout', (event, data) => {

	if (data === "glassdoor") {
		if (fs.existsSync(glassdoorCookiesPath)) {
			console.log('Cookies exist, deleting it')
				try {

				fs.unlink(glassdoorCookiesPath, (err => {
					if (err) console.log(err);
					else {
					  console.log("Deleted cookie");
					}
				  }));

				} catch(error) {
					console.error(error);
				}


		} else  {
			console.log("cookies doesn't exist in the first place to be deleted")
		}

	}

	else if (data === "linkedin") {
		if (fs.existsSync(linkedinCookiesPath)) {
			console.log('Cookies exist, deleting it')
			try { 
				
				fs.unlink(linkedinCookiesPath, (err => {
					if (err) console.log(err);
					else {
					  console.log("Deleted cookie");
					}
				  }));
			
			} catch(error) {
				console.error(error);
			}

		} else  {
			console.log("cookies doesn't exist in the first place to be deleted")
		}
	}
	else if (data === "indeed") {
		if (fs.existsSync(indeedCookiesPath)) {
			console.log('Cookies exist, deleting it')
			try { 
				
				fs.unlink(indeedCookiesPath, (err => {
					if (err) console.log(err);
					else {
					  console.log("Deleted cookie");
					}
				  }));
			
			} catch(error) {
				console.error(error);
			}

		} else  {
			console.log("cookies doesn't exist in the first place to be deleted")
		}
	}
});

// Automatically delete data 
app.on('ready', () => {
	let linkedinLastLogin = store.get('linkedinLastLogin')
	let glassdoorLastLogin = store.get('glassdoorLastLogin')
	let indeedLastLogin = store.get('indeedLastLogin')
	
	console.log(linkedinLastLogin)
	console.log(glassdoorLastLogin)
	console.log(indeedLastLogin)
	
	if (linkedinLastLogin+ 432000000 < Date.now()) {
			if (fs.existsSync(linkedinCookiesPath)) {
				console.log('Cookies exist, deleting it')
					try {
	
							fs.unlink(linkedinCookiesPath, (err => {
								if (err) console.log(err);
								else {
								console.log("Cookies too old, Deleted cookie");
								}
							}));
					
					} catch(error) {
						console.error(error);
					}
	
	
			} else  {
				console.log("cookies doesn't exist in the first place to be deleted")
			}
	}
	
	if (glassdoorLastLogin+ 432000000 < Date.now()) {
			if (fs.existsSync(glassdoorCookiesPath)) {
				console.log('Cookies exist, deleting it')
					try {
	
							fs.unlink(glassdoorCookiesPath, (err => {
								if (err) console.log(err);
								else {
								console.log("Cookies too old, Deleted cookie");
								}
							}));
					
					} catch(error) {
						console.error(error);
					}
	
	
			} else  {
				console.log("cookies doesn't exist in the first place to be deleted")
			}
	}
	
	if (indeedLastLogin+ 432000000 < Date.now()) {
		if (fs.existsSync(indeedCookiesPath)) {
			console.log('Cookies exist, deleting it')
				try {
	
						fs.unlink(indeedCookiesPath, (err => {
							if (err) console.log(err);
							else {
							console.log("Cookies too old, Deleted cookie");
							}
						}));
				
				} catch(error) {
					console.error(error);
				}
	
	
		} else  {
			console.log("cookies doesn't exist in the first place to be deleted")
		}
	}
	
	
  })


// Saving Speed

var speed;

ipcMain.on("get/speedParams", (event, data) => {
	speed = data;
});

// Platform 


// Opening external links

ipcMain.on('open-register', (event, data) => {
	shell.openExternal('https://job-app-f2665.web.app/enter/register');
});

ipcMain.on('open-forgot', (event, data) => {
	shell.openExternal('https://job-app-f2665.web.app/enter/reset');
});

ipcMain.on('open-support', (event, data) => {
	shell.openExternal('https://superlazyapp.atlassian.net/servicedesk/customer/portal/1');
});

ipcMain.on('open-upgrade', (event, data) => {
	shell.openExternal('https://job-app-f2665.web.app/enter/signin');
});
ipcMain.on('open-customerPortal', (event, data) => {
	shell.openExternal(data);
});





// Handling message to launch puppeteer from renderer)

ipcMain.handle("get/puppeteer", async (event, data)=>{
	const campaignDetails = data;
	// console.log(data.resume.name)
	// // const resumePath = path.join(__dirname, `resumeee.pdf`)
	
	// // try {
	// // 	let newFile = new File(campaignDetails.resume, 'resume.pdf')
	// // 	fs.writeFile(resumePath, newFile);
	// // } catch (error) {console.error(error)}



	if (campaignDetails.platform == "linkedin") {
			const linkedinCookiesPath = path.join(__dirname, './pptr/linkedin/linkedinCookies.txt')
			if (fs.existsSync(linkedinCookiesPath)) {
				console.log('Cookies exist, Launching Linkedin Apply');
				try { linkedinApply(campaignDetails); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Linkedin Sign in then Apply ');
				(async () => {
					try {
						await linkedinSignIn(store);
						await linkedinApply(campaignDetails)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
	else if (campaignDetails.platform == "glassdoor") {
			const glassdoorCookiesPath = path.join(__dirname, './pptr/glassdoor/glassdoorCookies.txt')

			if (fs.existsSync(glassdoorCookiesPath)) {
				console.log('Cookies exist, Launching Glassdoor Apply');
				try { glassdoorApply(speed); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Glassdoor Sign in then Apply ');
				(async () => {
					try {
						await glassdoorSignIn(store)
						await glassdoorApply(speed)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
	else if (campaignDetails.platform == "indeed") {
			const indeedCookiesPath = path.join(__dirname, './pptr/indeed/indeedCookies.txt')

			if (fs.existsSync(indeedCookiesPath)) {
				console.log('Cookies exist, Launching Indeed Apply');
				try { indeedApply(speed); }catch(error) {console.error(error);}

			} else {
				console.log('Cookies doesnt exist, Launching Indeed Sign in then Apply ');
				(async () => {
					try {
						await indeedSignIn(store)
						await indeedApply(speed)
					}
					catch (error) {console.error(error)}
				})();
			}
	}
  });




// CRON Job

// let isAutopilot = false

// if (isAutopilot) {
// 	console.log('Starting the job');

// 	const job = new CronJob('* */2 * * * *', function() {
        
// 		console.log('Cron job running every 2 min.');
// 		setTimeout(() => {
// 			job.stop()
// 		}, 200000);
//     },
//     null,
//     true,
//     'America/Los_Angeles'
// );
// }


// CRON JOB EVERYDAY
	// Start the function
	// End the function after 5 hours.. SetTimeout