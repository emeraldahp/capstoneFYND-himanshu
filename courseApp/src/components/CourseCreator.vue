<script>
import axios from 'axios'
export default{
    name:"coursecreator",
    data() {
        return {
            valid:{
                tutorMsg: 'none',
                courseMsg:'none'
            },
            check:{
                tutorList: [],
                courseList: []
            },
            courseData: {
                courseName: "",
                tutorName: "",
                courseDesc: "",
                courseImage: ""
            },
            currentSection: 0,
            itemType: 'text',
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
            }
        }
    },
    mounted(){
        axios.get(import.meta.env.VITE_API_URL + '/tutors/list').then(res => {
            this.check.tutorList = res.data.data
        })
        axios.get(import.meta.env.VITE_API_URL + '/courses/list').then(res=>{
            this.check.courseList = res.data.data
        })
    },
    watch: {
        "courseData.courseName": function(value) {
            this.validateCourseName(value)
            this.structureData.courseName = value
        },
        "courseData.tutorName": function(value) {
            this.validateTutorName(value)
        }
        
    },  
    methods:{     
        async postCourses() {
            if(this.valid.courseMsg == "available" && this.valid.tutorMsg == "selected" && this.structureData.noOfSections != 0) {
                let coursePost = {
                    courseName: this.courseData.courseName,
                    adminName: this.$store.state.adminData.adminName,
                    tutorName: this.courseData.tutorName,
                    courseDesc: this.courseData.courseDesc,
                    courseImage: this.courseData.courseImage || "default img url",
                    noOfSections: this.structureData.noOfSections
                }
                const response1 = await axios.post(import.meta.env.VITE_API_URL + '/courses', coursePost)
                console.log(response1)
                let structurePost = this.structureData
                const response2 = await axios.post(import.meta.env.VITE_API_URL + '/structures', structurePost) 
                console.log(response2)
            }
        },
        selectSection(index) {
            this.currentSection = index;
        },
        addSection() {
            const sectionInp = prompt("Enter Section Name")
            if(sectionInp != null){
                this.structureData.noOfSections++
                let sectionData = {
                    sectionName: sectionInp,
                    noOfItems: 0,
                    items:[
                        {
                            type: '',
                            content: ''
                        }
                    ]
                }
                if(this.structureData.noOfSections == 1)  
                    this.structureData.sections=[sectionData]
                else
                    this.structureData.sections.push(sectionData)
            }

        },
        addItem(){
            console.log("addItem")
            const itemContentInp = prompt("Enter item content:")
            if(itemContentInp!=null){
                this.structureData.sections[this.currentSection].noOfItems++
                const itemData = {
                    type: this.itemType,
                    content: itemContentInp
                }
                if(this.structureData.sections[this.currentSection].noOfItems == 1)
                    this.structureData.sections[this.currentSection].items = [itemData]
                else
                    this.structureData.sections[this.currentSection].items.push(itemData)
            }
        },
        removeSection(index){
            if(this.currentSection == (this.structureData.noOfSections - 1) ) this.currentSection--
            this.structureData.noOfSections--
            if(this.structureData.noOfSections == 0){
                this.structureData.sections = [ 
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
            }
            else {
                this.structureData.sections.splice(index, 1)
            }
        },
        removeItem(index) {
            this.structureData.sections[this.currentSection].noOfItems--
            if(this.structureData.sections[this.currentSection].noOfItems == 0) {
                this.structureData.sections[this.currentSection].items = [
                    {
                        type: '',
                        content: ''
                    }
                ]
            }
            else {
                this.structureData.sections[this.currentSection].items.splice(index, 1)
            }
        },
        validateCourseName(courseName) {
            if(this.check.courseList.includes(courseName))
                this.valid.courseMsg = "notAvailable"
            else if(!courseName.trim().length){
                this.valid.courseMsg = "cantBeEmpty"
            }
            else
                this.valid.courseMsg = "available"
        },
        validateTutorName(tutorName) {
            if(this.check.tutorList.includes(tutorName))
                this.valid.tutorMsg ="selected"
            else
                this.valid.tutorMsg ="notSelected"
        }

    }
}
</script>
<template>
    <h3>CourseCreator</h3> <br>
    <div>
        <h4>Course Details</h4>
        <div class="course-details-container">
            <div>
                Course Name: <br>
                <input type="text" placeholder="Enter course name." v-model="courseData.courseName"> <br> 
                Msg:{{valid.courseMsg}}<br> <br>
            </div>
            <div>
                Tutor Name: <br>
                <select v-model="courseData.tutorName">
                    <option disabled value="">Select an option.</option>
                    <option v-for="tutor in check.tutorList">{{tutor}}</option>
                </select> <br>
                Msg:{{valid.tutorMsg}}<br> <br>
            </div>
            <div>
                Course Desc: <br>
                <input type="text" placeholder="Enter course description." v-model="courseData.courseDesc"> <br> <br>
            </div>
            <div>
                Course Image: <br>
                <input type="text" placeholder="Enter image server url." v-model="courseData.courseImage"> <br> <br>
            </div>
        </div>
        <h4>Structure Details</h4>
        <div class="course-container">
        <div class="sections">
            SectionSelector <br>
            <button @click="addSection">AddSection</button>
            <div  class="section-container" v-if="structureData.sections[0].sectionName != null">
            <div class="section-item" v-for="section, index in structureData.sections"  @click="selectSection(index)">
                <button v-if="structureData.noOfSections != 0" @click="removeSection(index)">X</button>
                {{section.sectionName}}
            </div>
            </div>
        </div>
        <div class="viewport" v-if="structureData.sections[0].sectionName != null">
            CourseViewport: {{structureData.sections[currentSection].sectionName}} <br>
            <form class="type-select" @submit.prevent="">
                SelectType 
                <img class="type-ico" src="../assets/textico.svg"> <input type="radio" value="text" v-model="itemType">
                <img class="type-ico" src="../assets/imageico.svg"> <input type="radio" value="image" v-model="itemType">
                <img class="type-ico" src="../assets/videoico.svg"> <input type="radio" value="video" v-model="itemType">
                <button @click="addItem">AddItem</button>
            </form>
            
            <div class="sitem-container">
            <div v-for="item, index in structureData.sections[currentSection].items">
                <button v-if="structureData.sections[currentSection].noOfItems != 0" @click="removeItem(index)">X</button>
                {{item.content}}
            </div>
            </div>
        </div>
        </div>
        <hr>
        <button @click="postCourses">Post Course</button>
    </div>
    <div>
        <hr>
        Debug:{{check}} <br>
        {{courseData}}
        {{structureData}} {{itemType}} <br>
        currentSection: {{currentSection}} <br>
        <hr>
    </div>
</template>

<style>

.course-details-container {
    background: var(--theme-color2);
    padding: 10px 10px 10px 10px;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
}

.course-container {
    display: flex;
    flex-direction: row;
}
.sections{
    flex-basis: auto;
}
.viewport{
    flex-grow: 1;
}

.section-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.section-item {
    width: 200px;
    height: 50px;
    background: var(--theme-color2);
    transition: all 300ms;
    margin: 0px 50px 5px 0px
}
.section-item:hover {
    opacity: 0.8;
}
.sitem-container {
    display: flex;
    flex-direction: column;
    background: var(--theme-color2);
    margin-top: 10px;
}
.type-select {
    display: flex;
    place-items: center;
    gap: 2px;
}
.type-ico{
    width: 30px;
    height: 30px;
}

</style>