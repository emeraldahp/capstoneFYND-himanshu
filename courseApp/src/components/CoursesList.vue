<script>
import axios from 'axios'
export default {
    name: "courseslist",
    data() {
        return{
            coursesData: null,
            enrollments:[],
            enrollmentList: [],
            enrolledCourses: [],
            otherCourses: [],
            defaultImgUrl: import.meta.env.VITE_DEFAULT_IMG_URL
        }
    },
    mounted() {
        this.load()
            
    },
    methods:{
        load(){
            axios.get(import.meta.env.VITE_API_URL + '/courses').then(res => {
            //console.log(res.data.data)
            this.coursesData = res.data.data

            if(this.$store.state.userData.loggedIn==true) {
                axios.get(import.meta.env.VITE_API_URL + '/enrollments', {params:{userName: this.$store.state.userData.userName}}).then(res=>{
                    //console.log(res.data.data)
                    this.enrollments = res.data.data

                    this.enrollments.forEach(enrollment => {
                        this.enrollmentList.push(enrollment.courseName)
                    })
                    console.log(this.enrollmentList)

                    this.coursesData.forEach(course => {
                        if(this.enrollmentList.includes(course.courseName))
                            this.enrolledCourses.push(course)
                        else
                            this.otherCourses.push(course)
                    })
                    console.log(this.enrolledCourses)
                    console.log(this.otherCourses)
                })
            }
        
            })
        },

        selectCourse(courseName) {
            this.$store.commit("updateCourse", courseName)
            this.$router.push({name:'courseview'})
        },

        async enrollCourse(courseName, noOfSections){
            console.log("enroll", courseName)
            const enrollmentData = {
                userName: this.$store.state.userData.userName,
                courseName: courseName,
                isCourseComplete: false,
                currentSection: 0,
                noOfSections: noOfSections,
                sectionProgress: null,
                joinDate: new Date(),
                finishDate: null
            }
            console.log(enrollmentData)
            const response = await axios.post(import.meta.env.VITE_API_URL + '/enrollments', enrollmentData)
            console.log(response)

            this.enrollmentList= [],
            this.enrolledCourses= [],
            this.otherCourses= [],
            this.load()
        }

    }
}
</script>

<template>
    <div>
        
        <h3 v-if="$store.state.userData.loggedIn==false"> Courses: </h3> <br>
        <div class="hcourse-container" v-if="$store.state.userData.loggedIn==false">
            <div class="hcourse-item" v-for="course in coursesData" :key="course._id" >
                <div><img class="hcourse-image" :src="course.courseImage" @error="$event.target.src=defaultImgUrl" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
                
            </div>
        </div>
        <div v-else>  
            <h3>Enrolled Courses</h3> <br>
            <div class="hcourse-container">
            <div class="hcourse-item" v-for = "course in enrolledCourses" :key="course._id" @click="selectCourse(course.courseName)">
                <div><img class="hcourse-image" :src="course.courseImage" @error="$event.target.src=defaultImgUrl" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
            </div>
            </div>
            <div v-if="otherCourses.length != 0"><h3>Other Courses</h3></div> <br>
            <div class="hcourse-container">
            <div class="hcourse-item" v-for = "course in otherCourses" :key="course._id">
                <div><img class="hcourse-image" :src="course.courseImage" @error="$event.target.src=defaultImgUrl" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <button @click="enrollCourse(course.courseName, course.noOfSections)">Enroll</button>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
            </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<style>

.hcourse-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.hcourse-item {
    width: 270px;
    height: 250px;
    background: var(--theme-color2);
    transition: 0.5s;
    margin: 10px;
    overflow: hidden;
}
.hcourse-item:hover {
    opacity: 0.7;
}

.hcourse-image {
    width: 270px;
    height: 120px;
}
.hcourse-title {
    font-size: 20px;
    margin: 5px;
}
.hcourse-desc {
    margin: 5px;
}

</style>