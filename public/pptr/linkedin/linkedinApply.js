const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");

const { executablePath } = require("puppeteer");
const { Notification, safeStorage } = require("electron");

const fs = require("fs/promises");
const path = require("path");

module.exports = linkedinApply = async (campaignDetails) => {
    const speed = campaignDetails.speed
    const resumePath = campaignDetails.resume.path
    
    let jobTitle = campaignDetails.jobTitle
    let location = campaignDetails.location
    let remote = campaignDetails.remote
  
    const cleaningJobTitle = () => {
      jobTitle = jobTitle.replace("  ", " ")
      jobTitle = jobTitle.replace("   ", " ")
      jobTitle = jobTitle.replace("    ", " ")

      while (jobTitle.charAt(jobTitle.length - 1) === " ")  {
        jobTitle = jobTitle.slice(0, -1);
      }

      while (jobTitle.charAt(0) === " ")  {
        jobTitle = jobTitle.slice(1);
      }

      jobTitle = jobTitle.replace(" ", "%20");

    }

    try {
      cleaningJobTitle()
    }
    catch (error){
      console.error(error)
    }

    const cleaningLocation = () => {
        location = location.replace("  ", " ")
        location = location.replace("   ", " ")
        location = location.replace("    ", " ")
        
        while (location.charAt(location.length - 1) === " ")  {
          location = location.slice(0, -1);
        }

        while (location.charAt(0) === " ")  {
          location = location.slice(1);
        }


        location = location.replace(" ", "%20");
        location = location.replace(",", "%2C");

    }
    try {
      cleaningLocation()
    }
    catch (error){
      console.error(error)
    }
    

    // Using plugins
    puppeteer.use(hidden());


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
      slowMo: 150
    });
    const pages = await browser.pages();
    const page = pages[0];



    // Setting up cookies & logging in

    try {
      await sleep(800);
      showNotification("Entering your account", "We are logging you in with your account");

      const linkedinCookiesPath = path.join(__dirname, 'linkedinCookies.txt')
      const cookiesFile = await fs.readFile(linkedinCookiesPath);

      if (safeStorage.isEncryptionAvailable()) {

        try {
          var decryptedCookies = safeStorage.decryptString(cookiesFile)
        } 
        catch (error) {console.error(error)}
      }  

      const finalCookie = JSON.parse(decryptedCookies);
      await sleep(1000);
      await page.setCookie(...finalCookie);
      await sleep(4000);
    }

    catch {
      showNotification("Oops.. Something happend", "We couldn't log you in");
      throw new Error('Error in cookies');
    }
    


    // Going to URL

    await sleep(2000);
    await page.goto(`https://www.linkedin.com`);
    await sleep(10000);
    await page.waitForSelector("button");



    let searchLink = ""

    const defineLink = (remote) => {
      if (remote = "All" ) {
        searchLink = `https://www.linkedin.com/jobs/search/?&f_AL=true&keywords=${jobTitle}&location=${location}&refresh=true`
      }
      else if (remote = "Onsite Only" ) {
        searchLink = `https://www.linkedin.com/jobs/search/?&f_AL=true&f_WT=1&keywords=${jobTitle}&location=${location}&refresh=true`
      }
      if (remote = "Remote Only" ) {
        searchLink = `https://www.linkedin.com/jobs/search/?&f_AL=true&f_WT=2&keywords=${jobTitle}&location=${location}&refresh=true`
      }
      if (remote = "Hybrid Only" ) {
        searchLink = `https://www.linkedin.com/jobs/search/?&f_AL=true&f_WT=3&keywords=${jobTitle}&location=${location}&refresh=true`
      }
      if (remote = "Remote + Hybrid" ) {
        searchLink = `https://www.linkedin.com/jobs/search/?&f_AL=true&f_WT=2%2C3&keywords=${jobTitle}&location=${location}&refresh=true`
      }
    }

    defineLink(remote)

    try {
      
        await page.goto(searchLink);
        await sleep(8000);
        await page.waitForSelector("button",{timeout: 60000});
    } 
    catch {
        showNotification("Oops.. Something happend", "Please check your internet connection");
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
        await input.uploadFile(resumePath);
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


  };

