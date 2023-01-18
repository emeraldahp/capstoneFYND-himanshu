const dotenv = require('dotenv')
const express = require('express');
const { connectDB } = require('./db/connect');
const coursesApiRouter = require('./routes/courses.routes')
const cors = require('cors')

const app = express();
dotenv.config()

app.use(cors({
    origin: "*"
}))


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/courses', coursesApiRouter)

connectDB(process.env.MONGO_URI)
app.listen(8531)