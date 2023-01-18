const dotenv = require('dotenv')
const express = require('express');
const { connectDB } = require('./db/connect');
const coursesApiRouter = require('./routes/courses.routes')
const usersApiRouter = require('./routes/users.routes')
const cors = require('cors')

const app = express();
dotenv.config()

app.use(cors({
    origin: "*"
}))


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/courses', coursesApiRouter)
app.use('/users', usersApiRouter)

connectDB(process.env.MONGO_URI)
port = process.env.PORT || 8531
app.listen(port)