const express = require('express');
const { connectDB } = require('./db/connect');
const coursesApiRouter = require('./routes/courses.routes')


const app = express();

app.use('/courses', coursesApiRouter)

connectDB("mongodb://localhost:27017/courseappdb")
app.listen(8531)