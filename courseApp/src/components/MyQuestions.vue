<script>
import axios from 'axios';

export default {
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        axios.get(import.meta.env.VITE_API_URL + '/questions/user', {params:{userName:this.$store.state.userData.userName}}).then(res => {
            this.questions = res.data.data
        })
    }
}
</script>
<template>
    <div>
        <h4>MyQuestions</h4>
        <div v-for="question in questions" :key="question._id" >
            courseName: {{question.courseName}} <br>
            Question: {{question.questionName}} <br>
            <div v-if="question.answer!=null" >Answer: {{question.answer}} </div>
            <div v-else>NotAnswered</div>
            <br>
        </div>
        DeleteButton
    </div>
</template>