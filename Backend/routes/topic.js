const express = require('express')
const router = express.Router();

const topicCntrl = require('../controller/topic')

router.get('/', topicCntrl.viewTopicData)
router.post('/', topicCntrl.createTopic)
router.put('/', topicCntrl.updateTopicData)
router.delete('/', topicCntrl.deleteTopicData)

module.exports = router
