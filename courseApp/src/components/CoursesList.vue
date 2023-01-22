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

        selectCourse(courseName) {
            this.$store.commit("updateCourse", courseName)
            this.$router.push({name:'courseview'})
        }

    }
}
</script>

<template>
    <div>
        Welcome: user: {{this.$store.state.userData.userName}}
        Courses: {{d1}}
        <button @click="getAllCourses">ReloadCoursesList</button>
        <div v-for="course in coursesData" :key="course._id" @click="selectCourse(course.courseName)">
            {{course._id}} {{course.courseName}}
        </div>

    </div>
</template>