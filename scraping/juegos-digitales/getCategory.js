const categories = [
    ' https://juegosdigitaleschile.com/categorias/juegos-digitales-ps3',
     'https://juegosdigitaleschile.com/categorias/juegos-digitales-ps4',
     'https://juegosdigitaleschile.com/categorias/juegos-digitales-ps5',
     'https://juegosdigitaleschile.com/categorias/pc',
     'https://juegosdigitaleschile.com/categorias/xbox/juegos-xbox-one',
     'https://juegosdigitaleschile.com/categorias/nintendo-switch/juegos-nintendo-switch'
 ]
const nextSelector = 'body > div:nth-child(8) > div > div > div.col-md-9.col-sm-12 > div:nth-child(2) > div.col-xs-12.text-center > nav > ul > li.next > a';

module.exports = async (page) => {
    let allCategories = [];
    for (const pageIteration of categories) {
        console.log("Obteniendo datos de: "+ pageIteration)
        await page.goto(pageIteration, {  waitUntil: 'load'});
        let nextPagination = true;
        while (nextPagination) {
            const games = await page.$$eval('.product-hover', as => as.map((x) => x.href));
            allCategories.push(games);
            await page.click(nextSelector);
            await new Promise(resolve => setTimeout(resolve, 2000))
            if (await page.$(nextSelector) === null) nextPagination = false;
            console.log(allCategories)
        }
    }
    return allCategories.flat(Infinity);
}