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
            axios.get(import.meta.env.VITE_API_URL + '/courses/list').then(res=>{
                this.check.courseList = res.data.data
                this.$store.commit("loadingStatus", false)
                }).catch(err=>{
                    alert("courselist fetching failed")
                    this.$router.push({name:'home'})
                })
        }).catch(err=>{
            alert("tutorlist fetching failed")
            this.$router.push({name:'home'})
        })
        this.$store.commit("setSectionsBtn", true)
    },
    beforeUnmount() {
        this.$store.commit("setSectionsBtn", false)
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
            if(this.$store.state.adminData.verified == false){ 
                alert('NotVerified: Only testing allowed and cannot post courses. Please Contact: SuperAdmin') 
                return
            }
            if(this.valid.courseMsg == "available" && this.valid.tutorMsg == "selected" && this.structureData.noOfSections != 0) {
                this.$store.commit("loadingStatus", true)
                try{
                    let coursePost = {
                        courseName: this.courseData.courseName,
                        adminName: this.$store.state.adminData.adminName,
                        tutorName: this.courseData.tutorName,
                        courseDesc: this.courseData.courseDesc,
                        courseImage: this.courseData.courseImage || "noimage",
                        noOfSections: this.structureData.noOfSections
                    }
                    const response1 = await axios.post(import.meta.env.VITE_API_URL + '/courses', coursePost)
                    let structurePost = this.structureData
                    const response2 = await axios.post(import.meta.env.VITE_API_URL + '/structures', structurePost) 

                    if(response1.data.status=="success sent" && response2.data.status=="success sent") {
                        alert("Course Added Successfully")
                        this.$store.commit("loadingStatus", false)
                        this.$router.push({name:'home'})
                    }
                    else {
                        alert("Retry.")
                        this.$store.commit("loadingStatus", false)
                    }
                }
                catch(err) {
                    alert(err.message)
                    this.$store.commit("loadingStatus", false)
                }
            }
            else {
                alert("validation failed: check Msg status or/and courseStructure cant be empty")
            }
        },
        selectSection(index) {
            this.currentSection = index;
        },
        addSection() {
            let sectionInp = prompt("Enter Section Name. (Max Length 15)")
            if(sectionInp != null && sectionInp.length > 15) {
                alert("MaxLength Exceeded.")
                sectionInp = null;
            }
            if(sectionInp != null && !sectionInp.trim().length) {
                alert("Cant Be Empty.")
                sectionInp = null;
            }
            if(sectionInp != null && sectionInp[0] == ' ') {
                alert("First char Empty.")
                sectionInp = null;
            }
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
            let promptText
            if(this.itemType=="text") promptText = "Enter text content." 
            else if(this.itemType=="image") promptText = "Enter image url."
            else if(this.itemType=="video") promptText = "Enter youtube id."
            const itemContentInp = prompt(promptText)
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
            else if(courseName[0]==' '){
                this.valid.courseMsg = "firstCharEmpty"
            }
            else if(courseName.length > 15){
                this.valid.courseMsg = "maxLength15"
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
        <h3>CourseCreator</h3> <br>
        <div>
            <h4>Course Details</h4>
            <div class="cc-course-details-container">
                <div>
                    Course Name: <br>
                    <input type="text" placeholder="Enter course name." v-model="courseData.courseName"> <br> 
                    Msg: {{valid.courseMsg}}<br> <br>
                </div>
                <div>
                    Tutor Name: <br>
                    <select v-model="courseData.tutorName">
                        <option disabled value="">Select an option.</option>
                        <option v-for="tutor in check.tutorList">{{tutor}}</option>
                    </select> <br>
                    Msg: {{valid.tutorMsg}}<br> <br>
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
            <div v-if="courseData.courseImage!=''"  >
                <h4>Image Preview</h4>
                <div ><img title="AspectRatio 9:4" :src="courseData.courseImage" alt="imageUnavailable" height="240" width="540"></div>
            </div>
            <h4>Structure Details</h4>
            <div class="cc-course-container">
            <div class="cc-sections" :style="this.$store.state.sectionsPanel ? 'display: block' : ''" >
                SectionSelector <br>
                <button @click="addSection">AddSection</button>
                <div  class="cc-section-container" v-if="structureData.sections[0].sectionName != null">
                <div class="cc-section-item" v-for="section, index in structureData.sections"  @click="selectSection(index); this.$store.commit('sectionsPanelStatus', false)">
                    <div> <button v-if="structureData.noOfSections != 0" @click="removeSection(index)">X</button> </div>
                    <div class="cc-section-text">{{section.sectionName}}</div>
                </div>
                </div>
            </div>
            <div class="cc-viewport" :style="this.$store.state.sectionsPanel ? 'display: none' : ''" v-if="structureData.sections[0].sectionName != null">
                CourseViewport: {{structureData.sections[currentSection].sectionName}} <br>
                <form class="cc-type-select" @submit.prevent="">
                    SelectType 
                    <img class="cc-type-ico" src="../assets/textico.svg"> <input type="radio" value="text" v-model="itemType">
                    <img class="cc-type-ico" src="../assets/imageico.svg"> <input type="radio" value="image" v-model="itemType">
                    <img class="cc-type-ico" src="../assets/videoico.svg"> <input type="radio" value="video" v-model="itemType">
                    <button @click="addItem">AddItem</button>
                </form>
                
                <div class="cc-sitem-container">
                <div v-for="item, index in structureData.sections[currentSection].items">
                    <button v-if="structureData.sections[currentSection].noOfItems != 0" @click="removeItem(index)">X</button> <br>
                    <div v-if="item.type=='text'" class="cc-sitem-text" :class="item.content[0]=='#'? 'cc-sitem-text-title' : '' " >
                        {{item.content}}
                    </div>
                    <div v-if="item.type=='image'" class="cc-sitem-image-cont" >
                        <img class="cc-sitem-image" :src="item.content" alt="ImageCantBeLoaded">
                    </div>
                    <div v-if="item.type=='video'" >
                        <iframe class="cc-sitem-video" :src="'https://www.youtube.com/embed/'+ item.content"></iframe>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
            <hr>
            <button @click="postCourses">Post Course</button>
        </div>
    </div>
</template>

<style>

.cc-course-details-container {
    background: var(--theme-color2);
    padding: 10px;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
}

.cc-course-container {
    display: flex;
    flex-direction: row;
    
}
.cc-sections{
    flex-basis: auto;
    min-width: 250px;
    max-height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.cc-viewport{
    flex-grow: 1;
    max-height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.cc-section-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.cc-section-item {
    display: flex;
    flex-direction: row;
    width: 240px;
    height: 50px;
    place-items: center;
    background: var(--theme-color2);
    transition: all 300ms;
    margin: 0px 5px 5px 0px;
    overflow: hidden;
}

.cc-section-item:hover {
    opacity: 0.8;
}

.cc-section-text {
    margin-left: 5px;
    max-width: 160px;
    word-wrap: break-word;
}

.cc-sitem-container {
    display: flex;
    flex-direction: column;
    background: var(--theme-color2);
    margin-top: 10px;
}
.cc-sitem-text {
    word-wrap: break-word;
}
.cc-sitem-text-title {
    font-size: 20px;
}

.cc-sitem-image {
    max-width: 100%;
}
.cc-sitem-video {
    width:1000px;
    aspect-ratio: 16/9;
    max-width: 100%;
}

.cc-type-select {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    gap: 2px;
}
.cc-type-ico{
    width: 30px;
    height: 30px;
}

@media (max-width: 600px) {
    .cc-sections {
        display: none;
    }
    .cc-section-item {
        width: 540px;
        justify-content: center;
    }
    .cc-section-text {
        font-size: 20px;
        max-width: 400px;
        flex-grow: 1;
        text-align: center;
    }
}

@media (max-width: 630px) {
    .cc-course-details-container {
        padding:5px;
        gap:5px;
    }
}

</style>