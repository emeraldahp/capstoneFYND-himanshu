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
            this.incompleteCourses.forEach(element=>{
                if(element.sectionProgress);
            })
            this.$store.commit("loadingStatus", false)  
        })
    },
    methods: {
        viewCertificate(certId) {
        
            router.push({
                name: 'certview',
                path: '/certview',
                query: {_id:certId}
            })
        },
        coursePercent(item) {
            let count = 0;
            if(!Array.isArray(item.sectionProgress)) return 0
            item.sectionProgress.forEach(element => {
                if(element == true) count++;
            })
            return count/item.noOfSections*100
        }
    }
}

</script>
<template>
    <div>
        <h3>Completed Courses</h3>
        <div class="completedcourse-container">
            <div class="completedcourse-item" v-for="course in completedCourses" :key="course._id" >
                <div class="completedcourse-item-head">
                    <div>Course Name: {{course.courseName}}</div>
                    <div class="completedcourse-item-finish" >Finish Date: {{course.finishDate.slice(0,10)}}</div>
                </div>
                <hr>
                <div class="completedcourse-item-cert"><button @click="viewCertificate(course._id)">ViewCertificate</button></div>
            </div>
        </div>
        <h3>Courses in Progress</h3>
        <div class="inprogresscourse-container" >
            <div class="inprogresscourse-item" v-for="course,index in incompleteCourses" :key="course._id" >
                Course Name: {{course.courseName}} 
                <hr>
                <div >Progress: {{coursePercent(course)}}%</div>
                <div class="inprogresscourse-item-progressbar" :style="{width:coursePercent(course)+'%'}" ></div>
            </div>
        </div>
        <hr>
    </div>
</template>


<style>

.completedcourse-item {
    background-color: var(--theme-color2);
    margin: 5px;
    padding: 5px;
}

.inprogresscourse-item {
    background-color: var(--theme-color2);
    margin: 5px;
    padding: 5px;
}

.completedcourse-item-cert {
    margin-left: auto;
}

.completedcourse-item-head {
    display:flex; 
    flex-direction: row;
}
.completedcourse-item-finish {
    margin-left: auto;
}

.inprogresscourse-item-progressbar {
    height: 10px;
    min-width: 5px;
    background-color: var(--theme-color3);
    opacity: .5;
}

</style>
