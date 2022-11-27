const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");
const autoScrollPlugin = require("puppeteer-extra-plugin-auto-scroll");
const { executablePath } = require("puppeteer");
const fs = require("fs/promises");

puppeteer.use(autoScrollPlugin());
puppeteer.use(hidden());

  (async () => {
    // Using plugins



    const getRandom = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    
    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds*(1/1)*getRandom(1,1.5)));
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

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--start-maximized"],
      headless: false,
      ignoreHTTPSErrors: true,
      executablePath: executablePath(),
      devtools: false,
    });
    const pages = await browser.pages();
    const page = pages[0];


    // Go to Page
    await page.goto("https://www.w3schools.com/jsref/met_document_getelementbyid.asp",{timeout:50000});
    await sleep(12000);
    await console.log('connected')
    

    // Scroll Randomly

    await autoRandomScroll('#leftmenuinnerinner')


  })();



// let holdProgress = true;
//       while (holdProgress) {
//           await page.waitFor(300);
//           if (page.url().includes('/env-selector')) {
//               holdProgress = false;
//           }
//       }


    // await sleep(2000);
    // await page.evaluate( () => {
    //     let body = document.body
    //     body.scrollBy(0, 900);
    // });    


    // await sleep(2000);
    // await page.$eval('#leftmenuinnerinner', el => el.scrollBy(0, 900));

    // await sleep(2000);
    // await page.$eval('#leftmenuinnerinner', el => el.scrollBy(0, 900));

    // await sleep(2000);
    // await page.$eval('#leftmenuinnerinner', el => el.scrollBy(0, 900));
    


    // Closing the browser
    // await sleep(3000);
    // await browser.close()
