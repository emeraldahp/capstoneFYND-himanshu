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
    <div>
        {{check}} <br>
        {{courseData}}
        {{structureData}} {{itemType}} <br>
        CourseCreator <br>
        <form @Submit.prevent="">
            CourseName: <input type="text" v-model="courseData.courseName"> Msg:{{valid.courseMsg}}<br>
            TutorName: <select v-model="courseData.tutorName">
                <option disabled value="">SelectAnOption</option>
                <option v-for="tutor in check.tutorList">{{tutor}}</option>
            </select> Msg:{{valid.tutorMsg}}<br>
            CourseDesc: <input type="text" v-model="courseData.courseDesc"> <br>
            CourseImage: <input type="text" v-model="courseData.courseImage"> <br>

        </form>
        <div>
            <hr>
            SectionSelector <br>
            currentSection: {{currentSection}} <br>
            <button @click="addSection">AddSection</button>
            <div v-for="section, index in structureData.sections"  @click="selectSection(index)">
                <button v-if="structureData.noOfSections != 0" @click="removeSection(index)">RemoveSection</button>
                {{section.sectionName}}
            </div>
        </div>
        <div v-if="structureData.sections[0].sectionName != null">
            <hr>
            CourseViewport <br>
            <form @submit.prevent="">
                SelectType: 
                Text:<input type="radio" value="text" v-model="itemType">
                Image:<input type="radio" value="image" v-model="itemType">
                Video:<input type="radio" value="video" v-model="itemType">
                <button @click="addItem">AddItem</button>
            </form>
            {{structureData.sections[currentSection].sectionName}}
            <div v-for="item, index in structureData.sections[currentSection].items">
                <button v-if="structureData.sections[currentSection].noOfItems != 0" @click="removeItem(index)">RemoveItem</button>
                {{item.content}}
            </div>
        </div>
        <hr>
        <button @click="postCourses">PostACourse</button>
    </div>
</template>