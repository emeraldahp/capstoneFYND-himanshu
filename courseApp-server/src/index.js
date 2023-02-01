const dotenv = require('dotenv')
const express = require('express');
const { connectDB } = require('./db/connect');

const coursesApiRouter = require('./routes/courses.routes')
const usersApiRouter = require('./routes/users.routes')
const structuresApiRouter = require('./routes/structures.routes')
const enrollmentsApiRouter = require('./routes/enrollments.routes')
const questionApiRouter = require('./routes/questions.routes')
const tutorApiRouter = require('./routes/tutor.routes')
const adminApiRouter = require('./routes/admin.routes')
const rolesApiRouter = require('./routes/roles.routes')

const notFound = require('./middleware/not-found');

const cors = require('cors')


const app = express();
dotenv.config()

app.use(cors({
    origin: "*"
}))


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/roles', rolesApiRouter)
app.use('/courses', coursesApiRouter)
app.use('/users', usersApiRouter)
app.use('/structures', structuresApiRouter)
app.use('/enrollments', enrollmentsApiRouter)
app.use('/questions', questionApiRouter)
app.use('/tutors', tutorApiRouter)
app.use('/admins', adminApiRouter)

app.use(notFound);

connectDB(process.env.MONGO_URI)
port = process.env.PORT || 8531
app.listen(port)