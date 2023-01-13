const express = require('express');

const app = express();


app.get("/courses", function(req,res){
    res.send("Courses")
})

app.listen(8000)