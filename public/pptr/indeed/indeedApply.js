const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const autoScrollPlugin = require("puppeteer-extra-plugin-auto-scroll");

const { executablePath } = require("puppeteer");
const fs = require("fs/promises");
const { Notification } = require("electron");

module.exports = indeedApply = (speed) =>
  (async () => {
    // Using plugins
    puppeteer.use(hidden());
    puppeteer.use(autoScrollPlugin());


    const showNotification = (title, body) => {
      new Notification({ title: title, body: body }).show();
    };


    const getRandom = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds*(1/speed)*getRandom(1,1.5)));
    };


    const autoRandomScroll = async (selector, times=2, distance= 400, delay=600) => {
      for (let i = 1; i <= times; i++) {
          let randomDistance = distance * getRandom(0.8,1.3) 
          await sleep(delay);
          await page.$eval(selector, (el, randomDistance) => el.scrollBy(0, randomDistance), randomDistance);
      }

      for (let i = 1; i <= times; i++) {
          let randomDistance = -distance * getRandom(0.8,1.3) 
          await sleep(delay);
          await page.$eval(selector, (el, randomDistance) => el.scrollBy(0, randomDistance), randomDistance);
      }
    }

    const autoRandomScrollWindow = async (times=2, distance= 400, delay=600) => {
      for (let i = 1; i <= times; i++) {
          let randomDistance = distance * getRandom(0.8,1.3) 
          await sleep(delay);
          await page.evaluate((randomDistance) => window.scrollBy(0, randomDistance), randomDistance);
      }

      for (let i = 1; i <= times; i++) {
          let randomDistance = -distance * getRandom(0.8,1.3) 
          await sleep(delay);
          await page.evaluate((randomDistance) => window.scrollBy(0, randomDistance), randomDistance);
      }
    }
    
    // Sequence: Launching a browser and a blank page

    await showNotification("Launching a new campaign","We are launching a new Campaign on Indeed");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--start-maximized"],
      headless: false,
      ignoreHTTPSErrors: true,
      executablePath: executablePath(),
      devtools: false,
    });
    const pages = await browser.pages();
    const page = pages[0];




    // Setting up cookies & logging in

    try {
      await sleep(800);
      await showNotification("Entering your account", "We are logging you in with your account");
      const cookiesString = await fs.readFile("./public/pptr/indeed/indeedCookies.js");
      const cookiez = JSON.parse(cookiesString);
      await page.setCookie(...cookiez);
      await sleep(4000);
    }

    catch {
      await showNotification("Oops.. Something happend", "We couldn't log you in");
      throw new Error('Error in cookies');
    }
    


    // Going to URL
    try {
        await page.goto("https://www.indeed.com/jobs?q=developer&sc=0kf%3Aattr%28D7S5D%29attr%28DSQF7%29%3B&vjk=592911ee2a9af6fa");
        await sleep(4000);
        await page.waitForSelector("button");
        await showNotification("Logged in successfully", "We're logged in");
    } 
    catch {
        await showNotification("Oops.. Something happend", "Please check your internet connection");
        throw new Error('Couldnt Load the Page');
    }
    
    
    // Defining Sequence Functions 
            
    const loopNextPage = async () => {
      for (let i = 1; i <= 11; i++) {
        await sleep(3000);
        await autoRandomScrollWindow(getRandomInt(3,5))
        
            await loopNextJob()
        
        await sleep(3500);
        await page.click(`a[aria-label="Next Page"]`);
        await console.log(`Clicking on next page`);
      }
    }

    const loopNextJob = async () => {

      for (let i = 1; i <= 25; i++) {
        try {
          await sleep(2000);
          await page.click(`.jobsearch-ResultsList li:nth-of-type(${i})`);
          await console.log("clicking on job item " + i);

          await autoRandomScrollWindow(getRandomInt(1,2),300)

              await startApplying();

        } catch (error) {console.error(error)}

      }
    }

    const startApplying = async () => {
      try {
          await sleep(3000);
          await page.click(".jobsearch-IndeedApplyButton-buttonWrapper button");

              await sleep(3000);
              const pageTarget = page.target();
              const newTarget = await browser.waitForTarget((target) => target.opener() === pageTarget);
              const newPage = await newTarget.page()
              
              await sleep(2000);
              await newPage.bringToFront()
              
                  try { await insideApplication() } catch (error) {console.error(error)}
              
              await sleep(1000);
              await newPage.close()
      
              
      } catch (error) {
          await console.error(error)
      }

    }


    const insideApplication = async () => {
      try { 
        await scenarioOne()
        
      } catch(error) {
        await console.error(error)
      } 
    };


    const scenarioOne = async () => {  
      await sleep(2000);
      
            await inputtingData()
      
      await sleep(1000);
      await newPage.click('.ia-continueButton');

    };

    const inputtingData = async () => {  
      await sleep(1000);
      await page.select('select[aria-label="Phone number country"]', 'TN')

    }


    // Main Entry
    try {
      await loopNextPage()
      await showNotification("We're done here", "We have finished our loop");
    }

    catch(error) {
      await showNotification("Something went wrong", "Error happened during the process");
      console.error(error)
    }
    finally {
      await sleep(3000);
      await browser.close()
    }


  })();

