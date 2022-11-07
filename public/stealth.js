
const puppeteer = require('puppeteer-extra');
const hidden = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')


module.exports= stealth = () =>  (async () => {
// Launch sequence
    
puppeteer.use(hidden())

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
    ],
    headless: false,
    ignoreHTTPSErrors: true,
    //add this
    executablePath: executablePath(),
  })
  
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1280,
    deviceScaleFactor: 1,
  });


//Go to page

  await page.goto('https://google.com/', {
    waitUntil: 'networkidle0',
  });

})();
