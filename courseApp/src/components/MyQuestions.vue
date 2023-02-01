<script>
import axios from 'axios';

export default {
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            axios.get(import.meta.env.VITE_API_URL + '/questions/user', {params:{userName:this.$store.state.userData.userName}}).then(res => {
                this.questions = res.data.data
            })
        },
        async removeQuestion(_id) {
            const response = await axios.delete(import.meta.env.VITE_API_URL + '/questions', {params:{_id}})
            this.questions= []
            this.load()
        }
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
            <div><button @click="removeQuestion(question._id)" >Delete</button></div>
            <br>
        </div>
    </div>
</template>