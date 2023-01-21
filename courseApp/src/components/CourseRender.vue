<script>
import axios from 'axios'
export default {
    name: "courserender",
    data() {
        return {
            testdata : 'h',
            currentCourse: '',
            currentSection: 0,
            structureData: null
        }
    },
    mounted() {
        this.testdata = 'hello'
        this.currentCourse = 'MEVN Stack' 
        axios.get('http://localhost:8531/structures',{params:{currentCourse:this.currentCourse}}).then(res => {
            console.log(res.data.data)
            this.structureData = res.data.data
        })
    }

}
</script>
<template>
    CourseRender <br>
    {{testdata}} <br>
    SectionSelector <br>
    {{currentSection}} <br>
    CourseViewport <br>
    {{structureData}}
</template>