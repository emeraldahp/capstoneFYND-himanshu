const express = require('express');
const { connectDB } = require('./db/connect');
const { getAllCourses } = require('./controllers/courses.controller');

const app = express();

connectDB("mongodb://localhost:27017/courseappdb")
app.get("/courses", getAllCourses)

app.listen(8000)