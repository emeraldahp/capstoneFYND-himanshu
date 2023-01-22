const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true]
    },
    courseName: {
        type: String,
        required: [true]
    },
    isCourseComplete: {
        type: Boolean,
        required: [true]
    },
    currentSection: {
        type: Number,
        required: [true]
    },
    noOfSections: {
        type: Number,
        required: [true]
    },
    sectionProgress: {
        type: Array,
        required: [false]
    },
    joinDate: {
        type: Date,
        required: [true]
    },
    finishDate: {
        type: Date,
        required: [false]
    }
})

module.exports = mongoose.model('Enrollment', enrollmentSchema)