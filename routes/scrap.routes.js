const express = require('express');
const router = express.Router();

const { getCategories } = require('../controllers/scrap.controller.js')

router.route('/scrap/get_categories')
    .get(getCategories)


module.exports = router;