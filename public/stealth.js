
const puppeteer = require('puppeteer-extra');
const hidden = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer');
const fs = require('fs/promises');
const { Notification} = require("electron");


module.exports= stealth = () =>  (async () => {
// Launch sequence
const NOTIFICATION_TITLE = `We're launching a campaign on linkedin`
const NOTIFICATION_BODY = 'Please open the browser for login'

const showNotification = () => {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

   
puppeteer.use(hidden())

  const browser = await puppeteer.launch({
    args: ['--no-sandbox',],
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath: executablePath(),
    devtools: true,
  })

  await showNotification() ;
  
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 650,
    deviceScaleFactor: 1,
  });


//Go to page

  await page.goto('https://www.linkedin.com/', {
    waitUntil: 'networkidle0',
  });

  const cookiesString = await fs.readFile('./public/cookies.js');
  const cookiez = JSON.parse(cookiesString);
  await page.setCookie(...cookiez);
  await console.log('setting cookies')

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  
  await sleep(5000);

  await page.reload();
  
  //  const cookies = await page.cookies();
  //  await fs.writeFile('./public/cookies.js', JSON.stringify(cookies,null,2))
  //  await console.log('saving cookies');

})();


/* Sequence
Platform, Job Title, Location 

switch platform  
  case linkedin: path = htttps://www.linkedin.com/{jobtitle}/location }
  case glassdoor: path =   
  

browser.newPage({path})

*/

/* 
What can I do to save login cookies 
Wait for 60 sec
*/


/*
cookiesLinkedin
cookiesGlassdoor
cookiesIndeed
*/

