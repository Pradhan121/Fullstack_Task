const express = require('express')
const router = express.Router();

const questionCntrl = require('../controller/questions')

router.get('/', questionCntrl.viewQuestionData)
router.post('/', questionCntrl.createQuestionData)
router.put('/:id', questionCntrl.updateQuestionData)
router.delete('/:id', questionCntrl.deleteQuestionData)

module.exports = router


