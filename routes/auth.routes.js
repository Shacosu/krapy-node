const express = require('express');
const router = express.Router();

const { authLogin } = require('../controllers/auth.controller.js')

router.route('/auth/login')
    .post(authLogin)


module.exports = router;