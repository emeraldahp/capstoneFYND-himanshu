const Course = require('../models/Course');



const getAllCourses = async (req, res, next) => {
    try{
        const courses= await Course.find({})
       
        res.status(201).json({ status: 'success received', data:courses });
    }
    catch(err) {
        res.status(401).json({status: "failed", data:err.message})
    }
    
}

const postCourses = async (req, res, next) => {
    const data = req.body
    try{
        const courseData = await Course.create(data)
        res.status(201).json({status: 'success sent', data:courseData})
    }
    catch(err) {
        res.status(401).json({status: "failed", data:err.message})
    }
    

}

const coursesListByTutor = async (tutorName) => {
    let coursesList = new Set()
    try {
        const courses = await Course.find({tutorName})
      
        courses.forEach(element => {
            coursesList.add(element.courseName)
        })
      
        return Array.from(coursesList)
    }
    catch(err) {
        console.log(err.message)
    }
}

const getCourseList = async (req, res, next) => {
    let courseList = []
    try {
        const courses = await Course.find({})
        courses.forEach(element => {
            courseList.push(element.courseName)
        })
        res.status(201).json({status:"success", data: courseList})
    }
    catch(err) {
        res.status(401).json({status:"failed", data: err.message})
    }
}

const getTutorNameByCourse = async (req, res, next) => {
    const {courseName} = req.query
    let course
    try {
        course = await Course.findOne({courseName})
    
        res.status(201).json({status:"success received", data: course.tutorName})
    }
    catch(err) {
        res.status(401).json({status:"failed", data: err.message})
    }
}

module.exports = {
    getAllCourses,
    postCourses,
    coursesListByTutor,
    getCourseList,
    getTutorNameByCourse
}