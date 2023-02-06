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
            coursePreview: false,
            coursePreviewData: {}
        }
    },
    mounted() {
        this.load()

            
    },
    methods:{
        load(){
            axios.get(import.meta.env.VITE_API_URL + '/courses')
                .then(res => {
                    this.coursesData = res.data.data
                    
                    
                    if(this.$store.state.userData.loggedIn==true) {
                        axios.get(import.meta.env.VITE_API_URL + '/enrollments', {params:{userName: this.$store.state.userData.userName}})
                            .then(res=>{
                                this.enrollments = res.data.data

                                this.enrollments.forEach(enrollment => {
                                    this.enrollmentList.push(enrollment.courseName)
                                })
                              

                                this.coursesData.forEach(course => {
                                    if(this.enrollmentList.includes(course.courseName))
                                        this.enrolledCourses.push(course)
                                    else
                                        this.otherCourses.push(course)
                                })
                              
                                this.$store.commit("loadingStatus", false)
                            })
                            .catch(err=>{
                                alert("Error: EnrollmentFetchingFailed.")
                                this.$store.commit("loadingStatus", false)
                            })
                    }
                    else {
                        this.$store.commit("loadingStatus", false)
                    }
            
                })
                .catch(err=>{
                    alert("Error: CourseFetchingFailed.")
                    this.$store.commit("loadingStatus", false)
                })
        },

        selectCourse(courseName) {
            this.$store.commit("updateCourse", courseName)
            this.$router.push({name:'courseview'})
        },

        async enrollCourse(courseName, noOfSections){
         
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
            this.$store.commit("loadingStatus", true)
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + '/enrollments', enrollmentData)
            }
            catch(err) {
                alert("enrollment failed")
            }
            this.enrollmentList= [],
            this.enrolledCourses= [],
            this.otherCourses= [],
            this.load()
        },

        selectCoursePreview(course, message) {
            this.coursePreview=true
            this.coursePreviewData=course
            this.coursePreviewData.message=message
        }

    }
}
</script>

<template>
    <div>
        
        <h3 v-if="$store.state.userData.loggedIn==false"> Courses </h3>
        <div class="hcourse-container" v-if="$store.state.userData.loggedIn==false">
            <div class="hcourse-item" v-for="course in coursesData" :key="course._id" @click="selectCoursePreview(course, 'LOGIN AS USER TO ENROLL')" >
                <div class="hcourse-image-container" ><img class="hcourse-image" :src="course.courseImage" @error="$event.target.remove()" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
                
            </div>
        </div>
        <div v-else>  
            <h3>Enrolled Courses</h3> <br>
            <div class="hcourse-container">
            <div class="hcourse-item" v-for = "course in enrolledCourses" :key="course._id" @click="selectCourse(course.courseName)">
                <div class="hcourse-image-container" ><img class="hcourse-image" :src="course.courseImage" @error="$event.target.remove()" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
            </div>
            </div>
            <div v-if="otherCourses.length != 0"><h3>Other Courses</h3></div> <br>
            <div class="hcourse-container">
            <div class="hcourse-item" v-for = "course in otherCourses" :key="course._id">
                <div class="hcourse-image-container" ><img class="hcourse-image" :src="course.courseImage" @error="$event.target.remove()" ></div>
                <div class="hcourse-title">{{course.courseName}}</div>
                <button @click="enrollCourse(course.courseName, course.noOfSections)">Enroll</button>
                <button @click="selectCoursePreview(course, 'PRESS ENROLL TO CONTINUE')">Preview</button>
                <div class="hcourse-desc">{{course.courseDesc}}</div>
            </div>
            </div>
        </div>
        <hr>
        <div></div>
        <div class="course-preview-container" v-if="coursePreview==true" >
            <div class="bg-fade" @click="coursePreview=false" ></div>
            <div class="course-preview-item" >
                <div class="course-preview-image-container" ><img class="course-preview-image" :src="coursePreviewData.courseImage" @error="$event.target.remove()" ></div>
                <div class="course-preview-title" >CourseName: {{coursePreviewData.courseName}}</div>
                <div class="course-preview-desc" >CourseDescription: {{coursePreviewData.courseDesc}}</div>
                <div class="course-preview-foot">
                    <hr>
                    {{coursePreviewData.message}}
                    <hr>
                </div>
                
            </div>
        </div>
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
    word-wrap: break-word;
}
.hcourse-item:hover {
    opacity: 0.7;
}

.hcourse-image,
.hcourse-image-container {
    width: 270px;
    height: 120px;
}

.hcourse-image-container {
    background-image: url(../assets/defimgfull.svg);
    background-size: cover;
}

.hcourse-image {
    background: var(--theme-color3);
}

.hcourse-title {
    font-size: 20px;
    margin: 5px 5px 0px 5px;
}
.hcourse-desc {
    margin: 5px;
    line-height: 1.8em;
    max-height: 3.6em;
    overflow: hidden;
}
.course-preview-container {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    place-items: center;
    justify-content: center;
}
.course-preview-item {
    display: flex;
    flex-direction: column;
    z-index: 10;
    width: 810px;
    height: 700px;
    background-color: var(--theme-color2);
    animation: fadeIn .5s;
}

.course-preview-image,
.course-preview-image-container {
    width: 810px;
    height: 360px;
}

.course-preview-image-container {
    background-image: url(../assets/defimgfull.svg);
    background-size: cover;
    background-position: center;
}

.course-preview-image {
    background: var(--theme-color3);
}

.course-preview-foot {
    margin: 10px;
    margin-top: auto;

}

.course-preview-title {
    font-size: 20px;
    margin: 10px;
}

.course-preview-desc {
    margin: 10px;
    line-height: 1.8em;
    max-height: 14.4em;
    word-wrap: break-word;
    overflow: scroll;
}

@media (max-width: 850px) {
    .course-preview-item {
        width: 540px;
        height: 600px;
    }

    .course-preview-image,
    .course-preview-image-container {
        width: 540px;
        height: 240px;
    }
    
}

@media (max-height: 750px) {
    .course-preview-item {
        width: 540px;
        height: 360px;
    }

    .course-preview-image,
    .course-preview-image-container {
        display: none;
    }
}



</style>