// const categories = [
//     ' https://juegosdigitaleschile.com/categorias/juegos-digitales-ps3',
//      'https://juegosdigitaleschile.com/categorias/juegos-digitales-ps4',
//      'https://juegosdigitaleschile.com/categorias/juegos-digitales-ps5',
//      'https://juegosdigitaleschile.com/categorias/pc',
//      'https://juegosdigitaleschile.com/categorias/xbox/juegos-xbox-one',
//      'https://juegosdigitaleschile.com/categorias/nintendo-switch/juegos-nintendo-switch'
//  ]

const categories = [
    ' https://juegosdigitaleschile.com/categorias/juegos-digitales-ps3',
 ]

const nextSelector = 'body > div:nth-child(8) > div > div > div.col-md-9.col-sm-12 > div:nth-child(2) > div.col-xs-12.text-center > nav > ul > li.next > a';

const cleanStr = (str) => str.replace(/CLP/g, '').replace('$', '').replace(',', '').trim();

module.exports = async (page) => {
    let allCategories = [];
    let data = [];
    for (const pageIteration of categories) {
        console.log("Obteniendo datos de: "+ pageIteration)
        await page.goto(pageIteration, {  waitUntil: 'load' });
        let nextPagination = true;
        while (nextPagination) {
            const games = await page.$$eval('.product-hover', as => as.map((x) => x.href));
            allCategories.push(games);
            await page.click(nextSelector);
            await new Promise(resolve => setTimeout(resolve, 2000))
            if (await page.$(nextSelector) === null) nextPagination = false;
        }
    }
    const products = allCategories.flat(Infinity);
    for (const productPage of products) {
        page.setJavaScriptEnabled(false);
        await page.goto(productPage);
        const price = await page.$eval('.price-new', price => price.textContent);
        const title = await page.$eval('body > div:nth-child(8) > div:nth-child(1) > div > div.col-sm-12.col-xs-12.col-md-70.pb-20 > div > div > div:nth-child(2) > h2', title => title.textContent);
        const description = await page.$eval('#description', desc => desc.textContent);
        const buttonPay = await page.$eval('body > div:nth-child(8) > div:nth-child(1) > div > div.col-sm-8.col-xs-12.col-md-30.pb-20 > div > div > div > button.btn.btn.btn-buy.btn-block.btn-cart.st-btn-buy', sku => {
            return {
                sku: sku.getAttribute('data-id'),
                stock: sku.textContent.toLowerCase().trim() === 'comprar' ? 1 : 0
            }
        })
        data.push({
            sku: buttonPay.sku,
            stock: buttonPay.stock,
            price: cleanStr(price),
            url: productPage,
            title,
            description
        })
        console.log('Se ha pasado por el producto: ' + title)
    }

    


    return data;
}