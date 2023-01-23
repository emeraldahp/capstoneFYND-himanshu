<script>
import axios from 'axios'
export default {
    name: "courserender",
    data() {
        return {
            currentCourse: '',
            currentSection: 0,
            //v-for was unable the render because the data was null.undefined and so
            structureData: {sections:[{items:[]}]},
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
        axios.get('http://localhost:8531/enrollments/course', {params:{userName: this.$store.state.userData.userName, courseName: this.currentCourse, }}).then(res=>{
            console.log(res.data.data)
            this.courseProgress = res.data.data
            this.currentSection = this.courseProgress.currentSection
            console.log(this.currentSection)
        })

    },
    methods: {
        selectSection(index){
            console.log(index)
            this.currentSection = index
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

            <div v-for="section, index in structureData.sections"  @click="selectSection(index)">
                {{section.sectionName}}
            </div>
        </div>
        <div>
            CourseViewport <br>
            {{structureData.sections[currentSection].sectionName}}
            <div v-for="item in structureData.sections[currentSection].items">
                {{item.content}}
            </div>
        </div>
    </div>
</template>