<script>
import axios from 'axios';

export default {
    name: "myprofile",
    data() {
        return {
            enrollments:[],
            completedCourses:[],
            incompleteCourses:[],
        }
    },
    mounted() {
        axios.get(import.meta.env.VITE_API_URL + '/enrollments', {params:{userName: this.$store.state.userData.userName}}).then(res => {
            this.enrollments = res.data.data
            this.enrollments.forEach(element => {
                if(element.isCourseComplete == true) {
                    this.completedCourses.push(element)
                }
                else
                    this.incompleteCourses.push(element)
            })
        })
    }
}

</script>
<template>
    MyProfile <br>
    <h4>Completed Courses</h4>
    <div v-for="course in completedCourses" :key="course._id" >
        {{course.courseName}}
    </div>
    <h4>Courses in Progress</h4>
    <div v-for="course in incompleteCourses" :key="course._id" >
        {{course.courseName}}
    </div>

</template>