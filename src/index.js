const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 3898 })
  await page.goto('https://www.icarros.com.br/ford');
  await page.mouse.down(800, 3800)

  const ListData = await page.evaluate(() => {
    const nodeListImg = document.querySelectorAll('.img-responsive')

    const nodeListRate = document.querySelectorAll('.price-results__rate')

    const listNode = document.querySelectorAll('.title--brand__highlight')
    let listTitle = []
    let listAvaible = []

    for (var i = 0; i < listNode.length; i++) {

      listTitle[i] = listNode[i].textContent.replace('\n' ,'');
      
    }
    for (var i = 0; i < nodeListRate.length; i++) {

      listAvaible[i] = nodeListRate[i].textContent.replace('\n' ,'').trim();
      
    }

    const ListArray = [...nodeListImg]

    const list = ListArray.map(items => ({
      src: items.src,
    }))

     return ({list, listTitle, listAvaible})
  });

  fs.writeFile('data.json', JSON.stringify(ListData, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done!')
  })

  await browser.close();
})();