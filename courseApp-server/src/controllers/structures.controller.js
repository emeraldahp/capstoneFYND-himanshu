const Structure = require('../models/Structure')

const getStructure = async (req, res, next) => {
    
    courseName = req.query.currentCourse
    try{
        const structure = await Structure.findOne({courseName})
     
        res.status(201).json({ status: 'success received', data:structure });
    }
    catch(err) {
        res.status(201).json({ status: 'failed', data:err.message });
    }
}

const postStructure = async (req, res, next) => {
    const data = req.body
  
    try{
        const structureData = await Structure.create(data)
        res.status(201).json({status:'success sent', data:structureData})
    }
    catch(err) {
        res.status(201).json({status:'failed', data:err.message})
    }

}

module.exports = {
    getStructure,
    postStructure

}
