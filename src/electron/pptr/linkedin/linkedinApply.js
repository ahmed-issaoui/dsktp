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
    
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds*(1/speed)*getRandom(1,1.5)));
    };


    const autoRandomScroll = async (selector, times=2, distance= 400, delay=2000) => {
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
    
    // Sequence: Launching a browser and a blank page

    await showNotification("Launching a new campaign","We are launching a new Campaign on Linkedin");
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
      const cookiesString = await fs.readFile("./src/electron/pptr/linkedin/linkedinCookies.js");
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
        await autoRandomScroll('.jobs-search-results-list', getRandomInt(1,3))
    
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
        await autoRandomScroll('.jobs-search__job-details--container', getRandomInt(1,3))

            await startApplying();

      }
    }

    const startApplying = async () => {
      try {
          await sleep(3000);
          await page.click(".jobs-apply-button");
  
              await insideApplication()

              try {await getOut()} catch(error) {await console.error(error)}
              await sleep(2000);
              try {await getOut()} catch(error) {await console.error(error)}
      
              
      } catch (error) {
          await console.error(error)

      }

    }

    const insideApplication = async () => {
      try { 
        await console.log('Trying Scenario 1')
        await scenarioOne()
        
      } catch {
        await console.log('Trying Scenario 2')
        await scenarioTwo()
      } 
    };


    const scenarioOne = async () => {  

      // Is there input?
      try {await inputTelephone()} catch (error) {console.error(error)};
      try {await uploadResume()} catch (error) {console.error(error)};
      
      // Submit Application
      await sleep(3000);
      await page.click('button[aria-label="Submit application"]');

    };


    const scenarioTwo = async () => { 
          await sleep(2000);
          await page.waitForSelector('button[aria-label="Continue to next step"]', {timeout: 6000});

          // Is there input?
          try {await inputTelephone()} catch (error) {console.error(error)};
          try {await uploadResume()} catch (error) {console.error(error)};

          await sleep(1500);
          await page.click('button[aria-label="Continue to next step"]');
          await sleep(2200);

          // Is there input?
          try {await inputTelephone()} catch (error) {console.error(error)};
          try {await uploadResume()} catch (error) {console.error(error)};
          
          await page.waitForSelector('button[aria-label="Continue to next step"]', {timeout: 5000});
          await sleep(1000);
          await page.click('button[aria-label="Continue to next step"]');

              await respondToQuestions()

          try {
            await sleep(1000);
            await page.click('button[aria-label="Continue to next step"]');
          } catch (error) {console.error(error)};

          await sleep(1500);
          await page.waitForSelector('button[aria-label="Review your application"]', {timeout: 3000});
          await page.click('button[aria-label="Review your application"]');

          await sleep(4000);
          await page.waitForSelector('button[aria-label="Submit application"]', {timeout: 3000});
          await page.click('button[aria-label="Submit application"]');

    };

    const respondToQuestions = async () => {

        await sleep(1000);
        await page.waitForSelector('.jobs-easy-apply-form-element');
        await sleep(1500);
        const textInputs = await page.$$('.jobs-easy-apply-form-element .fb-single-line-text__input');

        for (let i = 0; index < textInputs.length; i++) {
          const textInput = textInputs[i]
          await console.log(textInput)
          await sleep(2330);
          await page.click(textInput);
          await page.type(textInput, '2');
        }
      };
      
      const getOut = async () => {
        await sleep(1020);
        await page.click('button[aria-label="Dismiss"]');
        await sleep(2020);
        await page.click('button[data-control-name="discard_application_confirm_btn"]');
    }

    const uploadResume = async () => {
        // Check if there's a resume
        await sleep(1520);
        await page.waitForSelector("input[type=file]", {timeout: 2000}); 
        const input = await page.$("input[type=file]"); 
        await input.uploadFile( 
          "C:/Users/priva/OneDrive/Bureau/Ahmed-Issaoui-Resume.pdf"
        );
        await sleep(8000);
    }

    const inputTelephone = async () => {
        // Check if input is the same
        await sleep(1330);
        await page.click('.fb-single-line-text__input');

        await sleep(1020);
        await page.type('.fb-single-line-text__input', '');

    };



    // Applying Sequence
    try {
      await loopNextPage()
      await showNotification("We're done here", "We have finished our loop");
    }

    catch(error) {
      await showNotification("Something went wrong", "Error happened during the process");
      console.error(error)
    }


    // Ending Browser
    await sleep(3000);
    await browser.close()


  })();

