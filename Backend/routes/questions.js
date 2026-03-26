const express = require('express')
const router = express.Router();

const questionCntrl = require('../controller/questions')

router.get('/', questionCntrl.viewQuestionData)
router.post('/', questionCntrl.createQuestionData)
router.put('/', questionCntrl.updateQuestionData)
router.delete('/', questionCntrl.deleteQuestionData)

module.exports = router


