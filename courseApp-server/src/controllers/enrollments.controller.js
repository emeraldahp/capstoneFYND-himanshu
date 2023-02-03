const Enrollment = require('../models/Enrollment')

const getEnrollments = async (req, res, next) => {
   
    const userName = req.query.userName
    try{
        enrollments = await Enrollment.find({userName})
      
        res.status(201).json({status: 'success received', data:enrollments})
    }
    catch(err) {
        res.status(201).json({status: 'failed', data:err.message})
    }
}

const postEnrollment = async (req, res, next) => {
  
    const data = req.body
    try{
        const enrollmentData = await Enrollment.create(data)
        res.status(201).json({status: 'success sent', data:enrollmentData})
    }
    catch(err) {
        res.status(201).json({status: 'failed', data:err.message})
    }
}
//for course status
const getEnrollmentByCourseName = async (req, res, next) => {
    data = req.query
  
    const {userName, courseName} = data
    try{
    const enrollment = await Enrollment.findOne({userName, courseName})
  
    res.status(201).json({status: 'success received', data:enrollment})
    }
    catch(err) {
        res.status(201).json({status: 'failed', data:err.message})
    }

}

const updateEnrollment = async (req, res, next) => {
    data = req.body

    
    let response
    try{
        if(data.type=="firsttime_complete") {
            const {isCourseComplete, currentSection, sectionProgress, finishDate} = data.data
            const _id = req.query._id
            response = await Enrollment.findOneAndUpdate({_id}, {
                isCourseComplete, currentSection, sectionProgress, finishDate
            })
          
        }
        else if(data.type=="not_complete") {
            const {currentSection, sectionProgress} = data.data
            response = await Enrollment.findOneAndUpdate({_id: req.query._id}, {
                currentSection, sectionProgress
            })    
         
        }
        else if(data.type=="already_complete"){
            const {currentSection} = data.data
            response = await Enrollment.findOneAndUpdate({_id: req.query._id}, {
                currentSection
            })
         
        }
        res.status(201).json({status: 'success', data:response})
    }
    catch(err){
     
        res.status(201).json({status: 'failed', data:err.message})
    }
    
}

const getEnrollmentById = async (req, res, next) => {
    const {_id} = req.query
    let response
 
    try {
        response = await Enrollment.findOne({_id})
    
        if(response == null) throw new Error('Certificate not found.')
        else res.status(201).json({status: 'success received', data:response})

    }
    catch(err) {
        res.status(201).json({status: 'failed', data:err.message})
    }

}

module.exports = {
    getEnrollments,
    postEnrollment,
    getEnrollmentByCourseName,
    updateEnrollment,
    getEnrollmentById
}