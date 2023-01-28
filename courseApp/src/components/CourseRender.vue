<script>
import axios from 'axios'
export default {
    name: "courserender",
    data() {
        return {
            currentCourse: '',
            currentSection: 0,
            //v-for was unable the render because the data was null.undefined and so
            structureData: {
                courseName: '',
                noOfSections: 0,
                sections:[ 
                    {   sectionName: null,
                        noOfItems: 0,
                        items:[
                            {
                                type: '',
                                content: ''
                            }
                        ]
                    }
                ]
            },
            courseProgress:{}
        }
    },
    mounted() {
        //for getting structure for selected course
        this.currentCourse = this.$store.state.userData.courseName
        axios.get('http://localhost:8531/structures',{params:{currentCourse:this.currentCourse}}).then(res => {
            //console.log(res.data.data)
            this.structureData = res.data.data
        })
        //for setting course status or progress
        axios.get('http://localhost:8531/enrollments/course', {params:{userName: this.$store.state.userData.userName, courseName: this.currentCourse }}).then(res=>{
            console.log(res.data.data)
            this.courseProgress = res.data.data
            this.currentSection = this.courseProgress.currentSection
            //to populate sectionProgress before its used in selectSection
            if(this.courseProgress.sectionProgress == null) {
                this.courseProgress.sectionProgress = [true]
                for(let i=1; i<this.courseProgress.noOfSections; i++)
                    this.courseProgress.sectionProgress.push(false)
            }
            console.log(this.currentSection)
        })

    },
    methods: {
        async selectSection(index){
            console.log(index)
            //for frontend
            this.currentSection = index
            
            //update current course
            //update section progress individual progress
            this.courseProgress.currentSection = index 
            this.courseProgress.sectionProgress[index] = true
            
            
            //if finishDate is false or coursecomplete is false 
            //check if all the elements in section progress are true// if yes set course complete to true and assign finish date
            if(this.courseProgress.isCourseComplete == false) {
                
                if(this.checkCourseComplete()==true){
                    this.courseProgress.isCourseComplete = true
                    this.courseProgress.finishDate = new Date()
                    //if course complete for the fist time: currentSection, sectionProgress, iscourse complete, finish date
                    const courseProgressPatch = {
                        userName: this.courseProgress.userName,
                        courseName: this.courseProgress.courseName,
                        
                        isCourseComplete: this.courseProgress.isCourseComplete,
                        currentSection: this.courseProgress.currentSection,
                        sectionProgress: this.courseProgress.sectionProgress,
                        finishDate: this.courseProgress.finishDate

                    }
                    const response = await axios.patch("http://localhost:8531/enrollments", {type:"firsttime_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
                    console.log(response)
                }
                else{
                    //if not complete then update currentSection, sectionProgress, 
                    const courseProgressPatch = {
                        userName: this.courseProgress.userName,
                        courseName: this.courseProgress.courseName,
                        currentSection: this.courseProgress.currentSection,
                        sectionProgress: this.courseProgress.sectionProgress
                    }
                    const response = await axios.patch("http://localhost:8531/enrollments", {type:"not_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
                    console.log(response)
                }
            }
            else{
                //if course complete: then only update currentSection
                const courseProgressPatch = {
                    userName: this.courseProgress.userName,
                    courseName: this.courseProgress.courseName,
                    currentSection: this.courseProgress.currentSection
                }
                const response = await axios.patch("http://localhost:8531/enrollments", {type:"already_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
                console.log(response)
            }

            //for patching
            //if course complete: then only update currentSection
            //if course complete for the fist time: currentSection, sectionProgress, iscourse complete, finish date
            //if not complete then update currentSection, sectionProgress, 
            

            
            
        },
        checkCourseComplete() {
            let flag = null
            return flag = this.courseProgress.sectionProgress.every(element =>{
                if(element==false) 
                    return false
                return true
            })
        }
    }

}
</script>
<template>
    CourseRender <br>
    <div>
        <div>
            SectionSelector <br>
            {{currentSection}} <br>
            courseStatus: {{courseProgress}} <br>

            <div v-for="section, index in structureData.sections"  @click="selectSection(index)">
                {{section.sectionName}}
            </div>
        </div>
        <div v-if="structureData.sections[0].sectionName != null" >
            CourseViewport <br>
            {{structureData.sections[currentSection].sectionName}}
            <div v-for="item in structureData.sections[currentSection].items">
                {{item.content}}
            </div>
        </div>
    </div>
</template>