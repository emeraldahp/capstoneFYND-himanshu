const express = require('express');
const { connectDB } = require('./db/connect');
const coursesApiRouter = require('./routes/courses.routes')
const cors = require('cors')

const app = express();
app.use(cors({
    origin: "*"
}))


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/courses', coursesApiRouter)

connectDB("mongodb://localhost:27017/courseappdb")
app.listen(8531)