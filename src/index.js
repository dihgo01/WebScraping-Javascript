const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 3898 })
  await page.goto('https://www.icarros.com.br/ford');
  await page.mouse.down(800, 3800)
  await page.evaluate(() => {
    const nodeListImg = document.querySelectorAll('.img-responsive')

    const nodeListRate = document.querySelectorAll('.price-results__rate')

    const listNode = document.querySelectorAll('.title--brand__highlight')
    let listTitle = []
    let listAvaible = []

    for (var i = 0; i < listNode.length; i++) {

      listTitle[i] = listNode[i].textContent.replace('\n' ,'');
      
    }
    for (var i = 0; i < nodeListRate.length; i++) {

      listAvaible[i] = nodeListRate[i].textContent.replace('\n' ,'');
      
    }

    const ListArray = [...nodeListImg]

    const list = ListArray.map(items => ({
      src: items.src,
    }))

    console.log(list)
    console.log(listTitle)
    console.log(listAvaible)
  });

  //await browser.close();
})();