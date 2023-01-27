const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true]
    },
    courseName: {
        type: String,
        required: [true]
    },
    questionName: {
        type: String,
        required: [true]
    },
    questionDesc: {
        type: String,
        required: [true]
    },
    answer: {
        type: String,
        required: [false]
    }
})

module.exports = mongoose.model('Question', questionSchema)