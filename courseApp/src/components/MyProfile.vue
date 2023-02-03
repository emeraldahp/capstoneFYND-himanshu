<script>
import axios from 'axios';
import router from '../router';
import CertView from '../views/CertView.vue';

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
    },
    methods: {
        viewCertificate(certId) {
            console.log("certificate "+ typeof certId)
            router.push({
                name: 'certview',
                path: '/certview',
                query: {_id:certId}
            })
        }
    }
}

</script>
<template>
    <div>
        <h4>Completed Courses</h4>
        <div v-for="course in completedCourses" :key="course._id" >
            {{course.courseName}} 
            <button @click="viewCertificate(course._id)">ViewCertificate</button>
        </div>
        <h4>Courses in Progress</h4>
        <div v-for="course in incompleteCourses" :key="course._id" >
            {{course.courseName}}
        </div>
        <hr>
    </div>
</template>

