const express = require('express')
const router = express.Router();
const multer = require('multer')

const getAuth = require('../controller/auth')


router.get('/getAuth', getAuth.getDataAuth)
router.post('/register', getAuth.register)
router.post('/login', getAuth.login)

module.exports = router