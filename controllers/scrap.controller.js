const mongoose = require('mongoose');
const { mongoUri } = require('../lib/credentials');
const puppeteer = require('puppeteer');
const getCategory = require('../scraping/juegos-digitales/getCategory');

mongoose.set("strictQuery", false);
mongoose.connect(mongoUri);

const mainFunction  = async () => {
    console.time("time");
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();
  
    const result = await getCategory(page)
    console.log(result)
    console.timeEnd("time");
    await browser.close();
  }

module.exports = {
    getCategories: async (req, res) => {
        try {
            mainFunction()
            .catch((err) => {
                res.json({
                    status: 200,
                    body: 'Se ha completado el Scraping!'
                })
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    body: err.message
                })
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    },

}