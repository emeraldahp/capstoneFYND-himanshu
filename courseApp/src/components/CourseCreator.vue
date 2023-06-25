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
                courseList: [],
                showCourseDetails: true,
                showStructureDetails: true,
                showCourseImage: false,
                errorCourseImageLoad: false,
                focusMode: false,
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
        },
        "courseData.courseImage": function(value) {
            this.check.showCourseImage = false;
            this.check.errorCourseImageLoad = false;
        },
        
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
                        courseImage: this.courseData.courseImage || "",
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
        },
        toggleFocusMode() {
            this.$emit('toggleNavBar');
            this.check.focusMode = this.check.focusMode ? false : true;
        },
        toggleSectionsPanel() {
            this.$store.commit("sectionsPanelStatus", this.$store.state.sectionsPanel? false : true)
        }

    }
}
</script>
<template>
    <div class="cc-container">
        <div class="cc-content">
            <div v-show="!check.focusMode" >
            <h3>Course Creator</h3>
            <h4 class="cc-section-title" title="Show/Hide Course Details" 
                @click="this.check.showCourseDetails = this.check.showCourseDetails ? false : true " >
                <div class="arrow" :style="{transform: this.check.showCourseDetails ? 'rotate(0deg)' : 'rotate(-90deg)' }">&#9660;</div>
                Course Details 
                <span v-if="!check.showCourseDetails" style="opacity: 50%;" >Collapsed</span> 
            </h4>
            <div v-show="check.showCourseDetails" class="cc-course-details-container">
                <div class="cc-course-details-items" >
                    Course Name <br>
                    <input type="text" placeholder="Enter course name." v-model="courseData.courseName"> <br> 
                    Msg: {{valid.courseMsg}}<br> <br>
                </div>
                <div class="cc-course-details-items">
                    Tutor Name <br>
                    <select v-model="courseData.tutorName">
                        <option disabled value="">Select an option.</option>
                        <option v-for="tutor in check.tutorList">{{tutor}}</option>
                    </select> <br>
                    Msg: {{valid.tutorMsg}}<br> <br>
                </div>
                <div class="cc-course-details-items">
                    Course Description <br>
                    <input type="text" placeholder="Enter course description." v-model="courseData.courseDesc"> <br> <br>
                </div>
                <div class="cc-course-details-items">
                    Course Image <br>
                    <input type="text" placeholder="Enter image server url." v-model.lazy="courseData.courseImage"> <br> <br>
                </div>
            </div>
            <div v-show="check.showCourseDetails">
                <h4 v-if="courseData.courseImage">Image Preview</h4>
                <h5 v-if="check.errorCourseImageLoad && courseData.courseImage" style="margin-left: 5px;">Error Loading Image !</h5>
                <h5 v-if="!check.showCourseImage && !check.errorCourseImageLoad && courseData.courseImage " style="margin-left: 5px;" >Image Preview Loading ...</h5>
                <div v-show="check.showCourseImage" >
                    <div>
                        <img v-if="courseData.courseImage"
                            title="AspectRatio 9:4" 
                            :src="courseData.courseImage" 
                            @load="check.showCourseImage = true; check.errorCourseImageLoad = false" 
                            @error="check.errorCourseImageLoad = true"
                            alt="imageUnavailable" 
                            height="240" 
                            width="540"
                            style="margin:5px;"
                        >
                    </div>
                </div>
            </div>
            

            <h4 class="cc-section-title" title="Show/Hide Course Structure Details" 
                @click="this.check.showStructureDetails = this.check.showStructureDetails ? false : true " >
                <div class="arrow" :style="{transform: this.check.showStructureDetails ? 'rotate(0deg)' : 'rotate(-90deg)' }">&#9660;</div>
                Structure Details 
                <span v-if="!check.showStructureDetails" style="opacity: 50%;" >Collapsed</span>
            </h4>


            </div>
            <div v-show="check.showStructureDetails" class="cc-course-container">
            <div class="cc-focus">
                <div @click="toggleFocusMode" >Focus</div>
                <div v-if="check.focusMode" @click="toggleSectionsPanel" >Sections</div>
            </div>
           
            <div class="cc-sections" :style="this.$store.state.sectionsPanel ? 'display: block' : ''" >
                <div class="cc-sections-head">
                    Section Selector <br>
                    <button @click="addSection">Add Section</button>
                </div>
                <div class="cc-sections-body" :class="!check.focusMode ? 'cc-sections-body-not-focus' : ''">
                    <div  class="cc-section-container" v-if="structureData.sections[0].sectionName != null">
                    <div class="cc-section-item" v-for="section, index in structureData.sections"  >
                        <div class="cc-section-cross"> <button v-if="structureData.noOfSections != 0" @click="removeSection(index)">X</button> </div>
                        <div class="cc-section-text" @click="selectSection(index); this.$store.commit('sectionsPanelStatus', false)" >
                            <div class="cc-section-text-p">{{section.sectionName}}</div>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
            <div class="cc-viewport" :style="this.$store.state.sectionsPanel ? 'display: none' : ''" v-if="structureData.sections[0].sectionName != null">
                <div class="cc-viewport-head" >
                    Course Viewport: {{structureData.sections[currentSection] ? structureData.sections[currentSection].sectionName : ""}} <br>
                    <form class="cc-type-select" @submit.prevent="">
                        <div class="cc-type-item-container">
                            <label class="cc-type-ico" for="text-item" >
                                <img src="../assets/textico.svg">
                            </label>
                            <input type="radio" value="text" id="text-item" v-model="itemType">
                        </div>
                        <div class="cc-type-item-container">
                            <label class="cc-type-ico" for="image-item" >
                                <img src="../assets/imageico.svg">
                            </label>
                            <input type="radio" value="image" id="image-item" v-model="itemType">
                        </div>
                        <div class="cc-type-item-container">
                            <label class="cc-type-ico" for="video-item" >
                                <img src="../assets/videoico.svg">
                            </label>
                            <input type="radio" value="video" id="video-item" v-model="itemType">
                        </div>
                        <button @click="addItem">Add Item</button>
                    </form>
                </div>
                <div class="cc-viewport-body cc-sitem-container" :class="!check.focusMode ? 'cc-viewport-body-not-focus' : ''">
                    <div v-for="item, index in structureData.sections[currentSection] ? structureData.sections[currentSection].items : []">
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
        </div>
        <div class="cc-footer" >
            <hr>
            <button @click="postCourses">Post Course</button>
        </div>
    </div>
</template>

<style scoped>

.cc-section-title {
    background-color: var(--theme-color2);
    cursor: pointer;
}

.arrow {
    display: inline-block; 
    height: 20px; 
    width: 20px; 
    opacity: 50%;
}

.cc-content {
    margin-bottom: 70px;
}

.cc-footer {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 100%;
    max-width: var(--max-width);
    z-index: 40;
    padding-bottom:8px ;
    padding-left: 8px;
    background-color: var(--theme-color1);
}

.cc-course-details-container {
    background: var(--theme-color2);
    padding: 10px;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px;
}

.cc-course-details-items {
    flex: 1 0 var(--min-width-input);
    min-width: var(--min-width-input); 
}

.cc-course-container {
    display: flex;
    flex-direction: row;
    position: relative;
}

.cc-focus {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 30;
    border: 1px solid var(--theme-color3);
    cursor: pointer;
}

.cc-sections{
    flex-basis: auto;
    min-width: 250px;
    
}
.cc-sections-head {
    margin-bottom: 5px;

}
.cc-sections-body{
    max-height: calc(100vh - 150px);
    overflow-y: scroll;
    overflow-x: hidden;
}

.cc-viewport{
    flex-grow: 1;
    
}
.cc-viewport-head{
    margin-bottom: 5px;
}
.cc-viewport-body{
    max-height: calc(100vh - 150px);
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

.cc-section-cross {
    width: 70px;
    flex: none;
}

.cc-section-text {
    display: flex;
    flex: 1;
    align-items: center;
    width: 100%;
    height: 100%;
}
.cc-section-text-p {
    width: 100%;
    margin-left: 5px;
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
    gap: 5px;
    margin-right: 75px;
}

.cc-type-item-container {
    border: 1px solid var(--theme-color3);
    display: flex; place-items: center; 
}

.cc-type-ico{
    width: 30px;
    height: 30px;
}

@media (max-width: 600px) {
    .cc-sections {
        width: 100%;
        display: none;
        margin-right: 10%;
    }
    .cc-section-item {
        width: 100%;
        justify-content: center;
    }
    .cc-section-text {
        flex-grow: 1;  
        max-width: 75%;
        margin-left: auto;
        margin-right: 5%;
    }
    .cc-section-text-p {
        font-size: 20px;
        text-align: center;
    }

    .cc-sections-body-not-focus{
        max-height: calc(100vh - 220px);
    }
    .cc-viewport-body-not-focus{
        max-height: calc(100vh - 220px);
    }
}

</style>