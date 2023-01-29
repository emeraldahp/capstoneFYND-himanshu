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
        }
    }

}
</script>

<template>
    <div>
    Ask a Question: <br>
    <form @submit.prevent="">
        Question Name: <input type="text" v-model="this.questionData.questionName"> <br>
        Question Description: <input type="textbox" v-model="this.questionData.questionDesc"> <br>
        <button @click="postQuestion">Submit</button>
    </form>
    </div>
</template>