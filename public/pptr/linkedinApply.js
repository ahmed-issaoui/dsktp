const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const autoScrollPlugin = require("puppeteer-extra-plugin-auto-scroll");

const { executablePath } = require("puppeteer");
const fs = require("fs/promises");
const { Notification } = require("electron");

module.exports = linkedinApply = (speed) =>
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
    


    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds*(1/speed)*getRandom(1,1.5)));
    };


    // Sequence: Launching a browser and a blank page

    await showNotification("Launching a New Campaign","We are launching a new Campaign on Linkedin");
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
      const cookiesString = await fs.readFile("./public/pptr/linkedinCookies.js");
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
        await page.goto("https://www.linkedin.com/jobs/search/?currentJobId=3353469753&f_AL=true&geoId=100876405&keywords=react&location=Colombia&refresh=true");
        await sleep(5000);
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
        await sleep(5000);
        await page.waitForSelector(`button[aria-label="Page ${i}"]`);
    
        await loopNextJob()
    
        await page.click(`button[aria-label="Page ${i + 1}"]`);
        await console.log(`clicking on page button ${i + 1}`);
      }
    }

    const loopNextJob = async () => {

      for (let i = 1; i <= 25; i++) {
        await sleep(5000);
        await page.click(`.jobs-search-results__list-item:nth-of-type(${i})`);
        await console.log("clicking on job item " + i);

        await startApplying()

      }
    }

    const startApplying = async () => {
          await sleep(3000);
          await page.click(".jobs-apply-button");
      
          await insideApplication()

    }

    const insideApplication = async () => {
      try { 
        scenarioOne()
        
      } catch {

        scenarioTwo()
      }
    };

    const scenarioOne = async () => {  // Scenario One: Direct Submission

        await inputTelephone()
        await uploadResume()

        // Submit Application
        await sleep(5000);
        await page.click('button[aria-label="Submit application"]');
    };

    const scenarioTwo = async () => {
        try { // Scenario Two: Continue to Applcation 
          await sleep(2000);
          await page.waitForSelector('button[aria-label="Continue to next step"]');
          await sleep(1500);
          await page.click('button[aria-label="Continue to next step"]');
          await sleep(2200);
          await page.waitForSelector('button[aria-label="Continue to next step"]');
          await sleep(1000);
          await page.click('button[aria-label="Continue to next step"]');

          respondToQuestions()

          await sleep(2200);
          await page.waitForSelector('button[aria-label="Review your application"]');
          await sleep(1000);
          await page.click('button[aria-label="Review your application"]');
          await sleep(4000);
          await page.waitForSelector('button[aria-label="Submit application"]');
          await page.click('button[aria-label="Submit application"]');

        } catch {
          console.log("Its not this scenario");
        }
    };

    const respondToQuestions = async () => {
      try { // Respond to Questions
        await sleep(1000);
        await page.waitForSelector('.jobs-easy-apply-form-element');
        await sleep(1500);
        const textInputs = await page.$$('.jobs-easy-apply-form-element .fb-single-line-text__input');
        for (let i = 0; index < textInputs.length; i++) {
          const textInput = textInputs[i]
          await console.log(textInput)
          await sleep(2330);
          await page.click(textInput);
          await sleep(3020);
          await page.type(textInput, '2');
        }

      } catch {
        console.log('No question elements or error')
      }

    };

    const uploadResume = async () => {
        await sleep(3020);
        await page.waitForSelector("input[type=file]");
        const input = await page.$("input[type=file]");
        await sleep(1000);
        await input.uploadFile(
          "C:/Users/priva/OneDrive/Bureau/Ahmed-Issaoui-Resume.pdf"
        );
        await sleep(12000);
    }

    const inputTelephone = async () => {
        await sleep(2330);
        await page.click('.fb-single-line-text__input');

        await sleep(3020);
        await page.type('.fb-single-line-text__input', '');

    };



    // Main Loop
    try {
      await loopNextPage()
      await showNotification("We're done here", "We have finished our loop");
    }

    catch(error) {
      await showNotification("Something went wrong", "Error happened during the process");
      console.error(error)
    }
    

    // Closing the browser
    await sleep(3000);
    await browser.close()


  })();



// let holdProgress = true;
//       while (holdProgress) {
//           await page.waitFor(300);
//           if (page.url().includes('/env-selector')) {
//               holdProgress = false;
//           }
//       }