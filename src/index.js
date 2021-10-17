const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless : false});
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 3898 })
  await page.goto('https://www.icarros.com.br/ford');
  await page.mouse.down(800, 3800)
  await page.evaluate(() => {
        const nodeListImg = document.querySelectorAll('.img-responsive')
        const nodeListTitle = document.querySelectorAll('.title')
        const nodeListRate = document.querySelectorAll('.price-results__rate')

        const ListArray = [...nodeListTitle,...nodeListImg,...nodeListRate,]

        const list = ListArray.map( items => ({
            title: items.h2,
            src: items.src,
            p: items.p, 
        }))

        console.log(list) 
  });

  //await browser.close();
})();