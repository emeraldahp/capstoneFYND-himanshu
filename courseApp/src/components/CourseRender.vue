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
            courseProgress:{
                sectionProgress:[]
            }
        }
    },
    mounted() {
        //for getting structure for selected course
        this.currentCourse = this.$store.state.userData.courseName
        axios.get(import.meta.env.VITE_API_URL + '/structures',{params:{currentCourse:this.currentCourse}}).then(res => {
            //console.log(res.data.data)
            this.structureData = res.data.data
            //for setting course status or progress
            axios.get(import.meta.env.VITE_API_URL + '/enrollments/course', {params:{userName: this.$store.state.userData.userName, courseName: this.currentCourse }}).then(res=>{
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
                this.$store.commit("loadingStatus", false)
            })
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
                    const response = await axios.patch(import.meta.env.VITE_API_URL + '/enrollments', {type:"firsttime_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
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
                    const response = await axios.patch(import.meta.env.VITE_API_URL + '/enrollments', {type:"not_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
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
                const response = await axios.patch(import.meta.env.VITE_API_URL + '/enrollments', {type:"already_complete", data:courseProgressPatch}, {params:{_id:this.courseProgress._id}})
                console.log(response)
            }

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
    <div>
        <h3>{{structureData.courseName}}</h3>
        <div class="course-container">
            <div class="sections"  :style="this.$store.state.sectionsPanel ? 'display: block' : ''" >
                Sections <br>
                <div class="section-container">
                    <div class="section-item" v-for="section, index in structureData.sections"  @click="selectSection(index); this.$store.commit('sectionsPanelStatus', false) ">
                        <div v-show="courseProgress.sectionProgress[index]==true" class="section-item-complete"></div>
                        <div class="section-text" >{{section.sectionName}}</div>
                    </div>
                </div>
            </div>
            <div class="viewport" :style="this.$store.state.sectionsPanel ? 'display: none' : ''" v-if="structureData.sections[0].sectionName != null" >
                {{structureData.sections[currentSection].sectionName}}
                <div class="sitem-container">
                <div v-for="item in structureData.sections[currentSection].items">
                    <div v-if="item.type=='text'" class="sitem-text" :class="item.content[0]=='#'? 'sitem-text-title' : '' ">
                        {{item.content}}
                    </div>
                    <div v-if="item.type=='image'" class="sitem-image-cont" >
                        <img class="sitem-image" :src="item.content" alt="ImageCantBeLoaded">
                    </div>
                    <div v-if="item.type=='video'" >
                        <iframe class="sitem-video" :src="'https://www.youtube.com/embed/'+ item.content"></iframe>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<style>
.course-container {
    display: flex;
    flex-direction: row;
}
.sections{
    flex-basis: auto;
    min-width: 250px;
    max-height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.viewport{
    flex-grow: 1;
    max-height: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
}


.section-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.section-item {
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

.section-item:hover {
    opacity: 0.8;
}

.section-item-complete {
    width: 3px;
    height: 50px;
    background-color: var(--theme-color3);
}

.section-text {
    margin-left: 7px;
    max-width: 220px;
    word-wrap: break-word;
}

.sitem-container {
    display: flex;
    flex-direction: column;
    background: var(--theme-color2);
    margin-top: 10px;
}

.sitem-text {
    word-wrap: break-word;
}

.sitem-text-title {
    font-size: 20px;
}

.sitem-image {
    max-width: 100%;
}
.sitem-video {
    width:1000px;
    aspect-ratio: 16/9;
    max-width: 100%;
}

@media (max-width: 600px) {
    .sections {
        display: none;
    }
}


</style>