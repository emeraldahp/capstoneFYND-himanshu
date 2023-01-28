<script>
import axios from 'axios'
export default{
    name:"coursecreator",
    data() {
        return {
            currentSection: 0,
            itemType: 'text',
            courseData: {},
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
    methods:{     
        async postCourses() {
            let coursePost = {
                courseName: "MEVN Stack134",
                adminName: "himanshu",
                tutorName: "arghya",
                courseDesc: "Learn web development with vue.",
                courseImage: "default Img",
                noOfSections: 3
            }
            const response = await axios.post('http://localhost:8531/courses', coursePost)
            console.log(response)
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
        }

    }
}
</script>
<template>
    <div>
        <div>
            {{structureData}} {{itemType}} <br>
            CourseCreator <br>
            SectionSelector------------------- <br>
            currentSection: {{currentSection}} <br>
            <button @click="addSection">AddSection</button>
            <div v-for="section, index in structureData.sections"  @click="selectSection(index)">
                {{section.sectionName}}
            </div>
        </div>
        <div v-if="structureData.sections[0].sectionName != null">
            CourseViewport------------------ <br>
            <form @submit.prevent="">
                SelectType: 
                Text:<input type="radio" value="text" v-model="itemType">
                Image:<input type="radio" value="image" v-model="itemType">
                Video:<input type="radio" value="video" v-model="itemType">
                <button @click="addItem">AddItem</button>
            </form>
            {{structureData.sections[currentSection].sectionName}}
            <div v-for="item in structureData.sections[currentSection].items">
                {{item.content}}
            </div>
        </div>
        ------------------------------- <br>
        <button @click="postCourses">PostACourse</button>
    </div>
</template>