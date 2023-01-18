<script>
import axios from 'axios'
export default{
    name:"coursecreator",
    methods:{
        
        async postCourses() {
            let coursePost = {
                courseName: "MEVN Stack134",
                adminName: "himanshu",
                tutorName: "arghya",
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
        <button @click="postCourses">PostACourse</button>
    </div>
</template>