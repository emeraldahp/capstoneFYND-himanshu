const Structure = require('../models/Structure')

const getStructure = async (req, res, next) => {
    //console.log(req.query)
    courseName = req.query.currentCourse
    try{
        const structure = await Structure.findOne({courseName})
        //console.log(structure)
        res.status(201).json({ status: 'success received', data:structure });
    }
    catch(err) {
        res.status(201).json({ status: 'failed', data:err.message });
    }
}

module.exports = {
    getStructure
}
