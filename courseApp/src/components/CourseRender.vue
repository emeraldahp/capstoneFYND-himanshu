<script>
import axios from 'axios'
export default {
    name: "courserender",
    data() {
        return {
            testdata : 'h',
            currentCourse: '',
            currentSection: 0,
            //v-for was unable the render because the data was null.undefined and so
            structureData: {sections:[{items:[]}]},
        }
    },
    mounted() {
        this.testdata = 'hello'
        this.currentCourse = 'MEVN Stack' 
        axios.get('http://localhost:8531/structures',{params:{currentCourse:this.currentCourse}}).then(res => {
            console.log(res.data.data)
            this.structureData = res.data.data
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
    {{testdata}} <br>
    <div>
        <div>
            SectionSelector <br>
            {{currentSection}} <br>

            <div v-for="section, index in structureData.sections" :key="section.index" @click="selectSection(index)">
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