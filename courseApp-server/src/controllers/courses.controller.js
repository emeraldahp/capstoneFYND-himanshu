const Course = require('../models/Course');



const getAllCourses = async (req, res, next) => {

    const courses= await Course.find({})
    console.log(courses)
    res.status(201).json({ status: 'success received', data:courses });
    
}

module.exports = {
    getAllCourses
}