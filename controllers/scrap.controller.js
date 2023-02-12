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
    console.timeEnd("time");
    await browser.close();
    return result;
  }

module.exports = {
    getCategories: async (req, res) => {
        try {
            mainFunction()
            .then((data) => {
                res.json({
                    status: 200,
                    messageStatus: 'Se ha completado el Scraping!',
                    body: data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    messageStatus: err.message
                })
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                messageStatus: error.message
            })
        }
    },

}