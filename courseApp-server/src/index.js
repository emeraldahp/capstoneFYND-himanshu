const express = require('express');
const { connectDB } = require('./db/connect');
const coursesApiRouter = require('./routes/courses.routes')
//const bodyParser = require('body-parser')


const app = express();
//app.use(express.static('public'));
//app.use(bodyParser.urlencoded({extended:false})) 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/courses', coursesApiRouter)

connectDB("mongodb://localhost:27017/courseappdb")
app.listen(8531)