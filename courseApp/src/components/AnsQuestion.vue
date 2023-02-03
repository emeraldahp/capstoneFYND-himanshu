<script>
import axios from 'axios'
export default {
    data() {
        return {
            allQuestions: [],
            questions: {
                answered:[],
                unanswered: []
            },
            answer: null

        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            this.$store.commit("loadingStatus", true)
            axios.get(import.meta.env.VITE_API_URL + '/questions', {params:{tutorName: this.$store.state.tutorData.tutorName}}).then(res => {
                this.allQuestions = res.data.data 
                this.allQuestions.forEach(element => {
                    if(element.answer == null)
                        this.questions.unanswered.push(element)
                    else
                        this.questions.answered.push(element)
                })
                this.$store.commit("loadingStatus", false)
            }).catch(err=>{
                alert("failed to load questions")
                this.$router.push({name:'home'})
            })
        },
        async ansQues(questionId) {
            this.answer = prompt("Enter Answer")
            if(this.answer != null) {
                const ansData = {
                    _id: questionId,
                    answer: this.answer
                }
                this.$store.commit("loadingStatus", true)
                const response = await axios.patch(import.meta.env.VITE_API_URL + '/questions', ansData)
                this.questions.answered = []
                this.questions.unanswered = []
                this.answer = null
                this.$store.commit("loadingStatus", false)
                this.load()

            }

        }
    }
}
</script>
<template>
    <div>
        <h3>Answer Questions</h3> <br>
        <div class="question-container">
        <div class="question-item" v-for="question in questions.unanswered" :key="question._id"> 
            Question: {{question.questionName}} <br>
            Description: {{question.questionDesc}}
            <hr>
            <button @click="ansQues(question._id)">Answer This Question</button><br>
        </div>
        </div>
        <h3>Answered Questions</h3> <br>
        <div class="question-container">
        <div class="question-item" v-for="question in questions.answered" :key="question._id"> 
            Question: {{question.questionName}}
            <hr>
            Answer: {{question.answer}}
        </div>
        </div>
        <hr>
    </div>
</template>

<style>

.question-item {
    background-color: var(--theme-color2);
    margin: 5px;
    padding: 5px;
    word-wrap: break-word;
}
</style>