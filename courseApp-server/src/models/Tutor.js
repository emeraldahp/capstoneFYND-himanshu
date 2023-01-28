const mongoose = require("mongoose")

const tutorSchema = new mongoose.Schema({
    tutorName: {
        type: String,
        required: [true],
        unique: true
    },
    email: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    }
})

module.exports = mongoose.model('Tutor', tutorSchema)