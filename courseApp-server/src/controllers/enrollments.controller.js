const Enrollment = require('../models/Enrollment')

const getEnrollments = async (req, res, next) => {
    console.log(req.query.userName)
    const userName = req.query.userName
    enrollments = await Enrollment.find({userName})
    console.log(enrollments)
    res.status(201).json({status: 'success sent', data:enrollments})
}

module.exports = {
    getEnrollments
}