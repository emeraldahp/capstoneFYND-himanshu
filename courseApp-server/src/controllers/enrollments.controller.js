const Enrollment = require('../models/Enrollment')

const getEnrollments = async (req, res, next) => {
    console.log(req.query.userName)
    const userName = req.query.userName
    enrollments = await Enrollment.find({userName})
    console.log(enrollments)
    res.status(201).json({status: 'success received', data:enrollments})
}

const postEnrollment = async (req, res, next) => {
    console.log(req.body)
    const data = req.body

    const enrollmentData = await Enrollment.create(data)
    res.status(201).json({status: 'success sent', data:enrollmentData})
}
//for course status
const getEnrollmentByCourseName = async (req, res, next) => {
    data = req.query
    console.log(req.query)
    const {userName, courseName} = data
    const enrollment = await Enrollment.findOne({userName, courseName})
    console.log(enrollment)
    res.status(201).json({status: 'success received', data:enrollment})

}

const updateEnrollment = async (req, res, next) => {
    data = req.body
    console.log(data)
}

module.exports = {
    getEnrollments,
    postEnrollment,
    getEnrollmentByCourseName,
    updateEnrollment
}