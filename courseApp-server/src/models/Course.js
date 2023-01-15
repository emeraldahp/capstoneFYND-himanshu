const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true]
  },
  adminName:{
    type: String,
    required: [true]
  },
  tutorName:{
    type: String,
    required: [true]
  },
  courseDesc: {
    type: String,
    required: [true]
  },
  courseImage: {
    type: String,
    required: [true]
  },
  noOfSections: {
    type: Number,
    required: [true]
  }

})

module.exports = mongoose.model('Course', courseSchema)