const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true],
  },
  courseDesc: {
    type: String,
    required: [true]
  }
})

module.exports = mongoose.model('Course', courseSchema)