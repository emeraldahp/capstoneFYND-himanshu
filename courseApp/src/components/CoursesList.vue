<script>
import axios from 'axios'
export default {
    name: "courseslist",
    data() {
        return{
            coursesData: null,
            d1:''
        }
    },
    mounted() {
        this.d1 = "hello"
        axios.get('http://localhost:8531/courses').then(res => {
            console.log(res.data.data)
            this.coursesData = res.data.data
        })
            
    },
    methods:{
        async getAllCourses() {
            const coursesResponse = await axios.get('http://localhost:8531/courses')
            console.log(coursesResponse.data.data)
            this.coursesData = coursesResponse.data.data
        },
        async postCourses() {
            let coursePost = {
                courseName: "MEVN Stack134",
                adminName: "himanshu",
                tutorName: "aragya",
                courseDesc: "Learn web development with vue.",
                courseImage: "default Img",
                noOfSections: 3
            }
            const response = await axios.post('http://localhost:8531/courses', coursePost)
            console.log(response)
        }


    }
}
</script>

<template>
    <div>
        Courses: {{d1}}
        <button @click="getAllCourses">ReloadCoursesList</button>
        <div v-for="course in coursesData" :key="course._id">{{course._id}} {{course.courseName}}</div>
        <button @click="postCourses">PostACourse</button>
    </div>
</template>