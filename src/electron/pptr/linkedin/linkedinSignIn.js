const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");

const { executablePath } = require("puppeteer");
const { Notification, safeStorage } = require("electron");

const fs = require("fs/promises");
const path = require("path");



const linkedinSignIn = () =>
  (async () => {
    // Using plugins
    puppeteer.use(hidden());


    const showNotification = (title, body) => {
      new Notification({ title: title, body: body }).show();
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // Launching a browser and a blank page

    await showNotification("Opening Linkedin for Sign in","We are launching a new Campaign on Linkedin");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--start-maximized"],
      headless: false,
      ignoreHTTPSErrors: true,
      executablePath: executablePath(),
      devtools: false,
    });
    const pages = await browser.pages();
    const page = pages[0];


    // Going to URL
    try {
        await page.goto("https://www.linkedin.com/");
        await sleep(3000);
        await page.waitForSelector("input");
        await showNotification("Please login with your account", "Login with your account to apply");
    } 
    catch {
        await showNotification("Oops.. Something happend", "Please check your internet connection");
        throw new Error('Couldnt Load the Page');
    }


    // Saving cookies 
    try {
        await sleep(2000);
        await page.waitForNavigation({timeout: 120000});
        await sleep(2000);
        
        const cookies = await page.cookies();
        const stringifiedCookies = await JSON.stringify(cookies, null, 2)

        const linkedinCookiesPath = path.join(__dirname, 'linkedinCookies.txt')

        if (safeStorage.isEncryptionAvailable()) {
          await sleep(4000);

          try {
            const encryptedCookies = safeStorage.encryptString(stringifiedCookies);
            await fs.writeFile(linkedinCookiesPath, encryptedCookies);
        

          } 
          catch (error) {console.error(error)}
        }  

        
        await sleep(4000);
        await showNotification("Logged in Sucessfully, Restarting the App", "Please wait for a moment");

    }
    catch {
      await showNotification("Oops.. Something happend", "Error happened during the process");
      throw new Error('Error in cookies');
    }
    

    // Closing the browser
    await sleep(2000);
    await browser.close()


  })();



  module.exports = {linkedinSignIn}