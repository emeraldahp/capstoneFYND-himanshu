<script>
import axios from 'axios';

export default {
    data() {
        return {
            questions: [],
            expandStatus: []
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            this.$store.commit("loadingStatus", true)  
            axios.get(import.meta.env.VITE_API_URL + '/questions/user', {params:{userName:this.$store.state.userData.userName}}).then(res => {
                this.questions = res.data.data
                this.$store.commit("loadingStatus", false)  
            }).catch(err=>{
                alert('failed to load questions')
                this.$router.push({name:'home'})
            })
        },
        async removeQuestion(_id) {
            this.$store.commit("loadingStatus", true)  
            const response = await axios.delete(import.meta.env.VITE_API_URL + '/questions', {params:{_id}})
            this.questions= []
            this.$store.commit("loadingStatus", false)  
            this.load()
        }
    }
}
</script>
<template>
    <div>
        <h3>MyQuestions</h3>
        <div class="myquestions-container">
            <div class="myquestion-item" v-for="question, index in questions" :key="question._id" >
                <div class="myquestion-item-head" >
                    <div class="myquestion-item-course" >{{question.courseName}}</div>
                    <div class="myquestion-item-ans" v-if="question.answer==null">: NotAnswered</div>
                    <div class="myquestion-item-btns">
                        <button v-if="expandStatus[index]==null" class="myquestion-item-expand" @click="expandStatus[index]=true" >Expand</button>
                        <button v-else class="myquestion-item-expand" @click="expandStatus[index]=null" >Shrink</button>
                        <button class="myquestion-item-remove" @click="removeQuestion(question._id)" >Delete</button>
                    </div>
                </div>
                <hr>
                <div v-if="expandStatus[index]==null" class="myquestion-item-name">Question: {{question.questionName.slice(0,60)}}. . . <br></div>
                <div v-else class="myquestion-item-name2">Question: {{question.questionName}} <br></div>
                <div v-if="expandStatus[index]==true" >Description: {{question.questionName}}</div>
                <div class="myquestion-item-ans" v-if="expandStatus[index]==true && question.answer!=null" >Answer: {{question.answer}} </div>
                
            </div>
        </div>
        <hr>
    </div>
</template>

<style>

.myquestion-item {
    background-color: var(--theme-color2);
    margin: 5px;
    padding: 5px;
    padding-left: 10px;
    word-wrap: break-word;
}
.myquestion-item-head {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 5px;

}
.myquestion-item-btns {
    margin-left: auto;
}

</style>
