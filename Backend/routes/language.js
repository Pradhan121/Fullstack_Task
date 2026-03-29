const express = require('express')
const router = express.Router();

const langCntrl = require('../controller/language')

router.get('/', langCntrl.viewLanguage)
router.post('/', langCntrl.createLanguage)
router.put('/:id', langCntrl.updateLanguage)
router.delete('/:id', langCntrl.deleteLanguage)

module.exports = router