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
    
    let response
    try{
        if(data.type=="firsttime_complete") {
            const {isCourseComplete, currentSection, sectionProgress, finishDate} = data.data
            response = await Enrollment.findOneAndUpdate(req.query._id, {
                isCourseComplete, currentSection, sectionProgress, finishDate
            })
            console.log("first time update", response.data, req.query)
        }
        else if(data.type=="not_complete") {
            const {currentSection, sectionProgress} = data.data
            response = await Enrollment.findOneAndUpdate(req.query._id, {
                currentSection, sectionProgress
            })    
            console.log("not_complete", response.data, req.query)
        }
        else if(data.type=="already_complete"){
            const {currentSection} = data.data
            response = await Enrollment.findOneAndUpdate(req.query._id, {
                currentSection
            })
            console.log("already", response.data, req.query)
        }
    }
    catch(err){
        console.log(err.message)
    }
    res.status(201).json({status: 'success', data:response})
}

module.exports = {
    getEnrollments,
    postEnrollment,
    getEnrollmentByCourseName,
    updateEnrollment
}