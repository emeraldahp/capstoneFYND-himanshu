const mongoose = require('mongoose')

const structureSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true],
        unique: true
    },
    noOfSections: {
        type: Number,
        required: [true]
    },
    sections: {
        type: Array,
        required: [true]
    }

})

module.exports = mongoose.model('Structure', structureSchema)