const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const autoScrollPlugin = require("puppeteer-extra-plugin-auto-scroll");

const { executablePath } = require("puppeteer");
const fs = require("fs/promises");
const { Notification } = require("electron");

module.exports = glassdoorApply = (speed) =>
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


    const autoRandomScroll = async (selector, times=2, distance= 400, delay=800) => {
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

    await showNotification("Launching a new campaign","We are launching a new Campaign");
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
      const cookiesString = await fs.readFile("./src/electron/pptr/glassdoor/glassdoorCookies.js");
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
        await page.goto("https://www.glassdoor.com/Job/united-states-web-developer-jobs-SRCH_IL.0,13_IN1_KO14,27.htm?applicationType=1&remoteWorkType=1");
        await sleep(4000);
        await page.waitForSelector("button");
        await showNotification("Logged in successfully", "We're logged in");
    } 
    catch {
        await showNotification("Oops.. Something happend", "Please check your internet connection");
        throw new Error('Couldnt Load the Page');
    }
    
    // Catching Max Page

    try {
      

    } catch(error){console.error(error)}
    

    const loopNextPage = async () => {

      let paginationText =  await page.$eval('.paginationFooter', el => el.innerText);
      await console.log(paginationText)
      let lastPage = paginationText.replace("Page 1 of ", "");
      await console.log(lastPage)

      for (let i = 1; 30 <= lastPage; i++) {
        await sleep(5000);

        await page.click('#MainCol');
        await sleep(1000);

        await autoRandomScroll('#MainCol', getRandomInt(3,6))
        await sleep(3000);
  
            await loopNextJob()

        await page.click(`button[aria-label="Next"]`);
        await console.log(`Going to page ${i + 1}`);
      }
    }

    const loopNextJob = async () => {

      for (let i = 1; i <= 1; i++) {
        await sleep(4000);
        await page.click(`.react-job-listing:nth-of-type(${i})`);

        await sleep(3000);
        await page.click(`.react-job-listing:nth-of-type(${i})`);
        await console.log("clicking on job item " + i);

        await sleep(1500);
        await autoRandomScroll('#JDCol', getRandomInt(2,3))

        try { await startApplying()} catch(error) {console.error(error)};

      }
    }

    const startApplying = async () => {
          await sleep(3000);
          await page.click(`button[data-test="applyButton"]`);

          try {await insideApplication()} catch (error) {console.error(error)};
    }

    const insideApplication = async () => {
      await sleep(3000);
      await inputtingData()

      // await sleep(2000);
      // await page.click('#form-action-continue');

      // await sleep(4000);
      // await respondToQuestions()
    };
    
    const inputtingData = async () => {  
      await sleep(5000);

      const text = await page.evaluate(() => Array.from(document.querySelectorAll('label'), element => element.textContent));

      for (let i = 0; i <= text.length; i++) {
        console.log(text[i]);
      }
      // const elements = await page.$x('/html/body/div/div/div[1]/div[2]/form/div[2]/div[1]/div/div/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/input')
      // await elements[0].click() 
      // await console.log(elements)
      // await sleep(1000);
      // await elements[0].type('hello') 

      // await page.click('#input-applicant\.email');
      // await sleep(5000);
      // await page.type('#input-applicant\.email', 'Ahmed Issaoui');
      // await sleep(100000);

      
      // const inputs = await page.$$('.input-applicant');
      // await console.log(inputs);



      // await sleep(1000);
      // await sleep(2500);
      // await page.click('.UserField-Email input');
      // await page.type(`input[name="applicant.name"]`,'Ahmed Issaoui');
      // await sleep(2500);
      // await page.type('#input-applicant.email', 'pro.ahmed.issaoui@gmail.com');
      // await sleep(2500);
      // await page.type('#input-applicant.phoneNumber', '+21629809010');

      // await sleep(2000);
      // await uploadResume();

    };

    const uploadResume = async () => {
        await sleep(1520);
        const input = await page.$("#ia-CustomFilePicker-resume"); 
        await input.uploadFile( "C:/Users/priva/OneDrive/Bureau/Ahmed-Issaoui-Resume.pdf");
        await sleep(8000);
    }

    const respondToQuestions = async () => {
      // AnsweringRadio
      // Answering Input
      // Answering Select
    }



    // Start of Sequence
    try {
      await loopNextPage()
      await showNotification("We're done here", "We have finished our loop");
    }

    catch(error) {
      await showNotification("Something went wrong", "Error happened during the process");
      console.error(error)
    }
    


    // Ending Browser
    // await sleep(3000);
    // await browser.close()



  })();

