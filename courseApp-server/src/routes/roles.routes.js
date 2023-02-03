const express = require('express')
const {authorize} = require('../middleware/auth')

const router = express.Router() 

router.get('/name', authorize(['user','tutor','admin']), async (req, res, err) => {
    const data= {
        name: res.locals.claims.name,
        role: res.locals.claims.role
    }
    if(data.role=='admin') data.verified = res.locals.claims.verified
    res.status(201).json({status:"success", data:data})
})

module.exports = router