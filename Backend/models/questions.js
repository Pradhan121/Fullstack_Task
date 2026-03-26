const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    loginUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userauth'
    },
    languageList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'langauge'
    },
    topicList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    },
    question: String,
    answer: String,
    marks: Number
})

module.exports = mongoose.model('question', questionSchema)