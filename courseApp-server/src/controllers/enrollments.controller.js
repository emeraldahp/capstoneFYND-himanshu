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

module.exports = {
    getEnrollments,
    postEnrollment
}