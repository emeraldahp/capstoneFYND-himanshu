<script>
import axios from 'axios'

export default {
    name: 'askquestion',
    data() {
        return {
            questionData: {
                questionName: '',
                questionDesc: '',
            }
        }
    },
    methods: {
        async postQuestion() {
            const questionPost = {
                userName: this.$store.state.userData.userName,
                courseName: this.$store.state.userData.courseName,
                questionName: this.questionData.questionName,
                questionDesc: this.questionData.questionDesc,
                answer: null
            }
            const response = await axios.post(import.meta.env.VITE_API_URL + '/questions', questionPost)
            console.log(response)
            if(response.data.status=="success sent"){ 
                alert("Question Added Successfully") 
                this.questionData.questionName = ""
                this.questionData.questionDesc = ""
            }
            else if(response.data.status=="failed") alert("Failed to Add Question")
        }
    }

}
</script>

<template>
    <div class="ask-question-container">
        <div class="ask-question-form">
            <h4>Ask Question:</h4> <br>
            <div>
                Question Name: <br>
                <input type="text" v-model="this.questionData.questionName"> <br> <br>
            </div>
            <div>
                Question Description: <br>
                <input type="text" v-model="this.questionData.questionDesc"> <br> <br>
            </div>
            <button @click="postQuestion">Submit</button>
        </div>
    </div>
</template>

<style>
.ask-question-container {
    display: flex;
    flex-direction: column;
    place-items: center;
}
.ask-question-form {
    display: flex;
    flex-direction: column;
    place-items: center;
    background-color: var(--theme-color2);
    width: 400px;
    padding-bottom: 10px;
}

</style>