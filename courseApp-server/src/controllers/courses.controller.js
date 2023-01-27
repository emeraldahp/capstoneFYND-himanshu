const Course = require('../models/Course');



const getAllCourses = async (req, res, next) => {

    const courses= await Course.find({})
    //console.log(courses)
    res.status(201).json({ status: 'success received', data:courses });
    
}

const postCourses = async (req, res, next) => {
    const data = req.body
    try{
        const courseData = await Course.create(data)
        res.status(201).json({status: 'success sent', data:courseData})
    }
    catch(err) {
        res.status(201).json({status: 'cant sent', data:err.message})
    }
    

}

module.exports = {
    getAllCourses,
    postCourses
}