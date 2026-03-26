const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    loginUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userauth'
    },
    name: String
})

module.exports = mongoose.model('language', languageSchema)