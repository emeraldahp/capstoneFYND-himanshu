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
        Welcome: User: {{this.$store.state.userData.userName}} <br>
        Status: LoggedIn: {{this.$store.state.userData.loggedIn}} <br>
        currentCourse: {{this.$store.state.userData.courseName}} <br>
        Courses: <br>
        <div v-if="$store.state.userData.loggedIn==false">
            <div v-for="course in coursesData" :key="course._id" @click="selectCourse(course.courseName)">
                {{course._id}} {{course.courseName}}
            </div>
        </div>
        <div v-else>
            EnrolledCourses <br>
            <div v-for = "course in enrolledCourses" :key="course._id" @click="selectCourse(course.courseName)">
                {{course.courseName}}
            </div>
            OtherCourses <br>
            <div v-for = "course in otherCourses" :key="course._id">
                {{course.courseName}}
                <button @click="enrollCourse(course.courseName, course.noOfSections)">Enroll</button>
            </div>
        </div>

    </div>
</template>