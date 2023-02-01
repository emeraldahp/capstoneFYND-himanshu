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
            axios.get(import.meta.env.VITE_API_URL + '/questions', {params:{tutorName: this.$store.state.tutorData.tutorName}}).then(res => {
                this.allQuestions = res.data.data 
                this.allQuestions.forEach(element => {
                    if(element.answer == null)
                        this.questions.unanswered.push(element)
                    else
                        this.questions.answered.push(element)
                })
            })
        },
        async ansQues(questionId) {
            this.answer = prompt("Enter Answer")
            console.log('hi',this.answer)
            if(this.answer != null) {
                const ansData = {
                    _id: questionId,
                    answer: this.answer
                }
                const response = await axios.patch(import.meta.env.VITE_API_URL + '/questions', ansData)
                console.log(response)
                this.questions.answered = []
                this.questions.unanswered = []
                this.answer = null
                this.load()

            }

        }
    }
}
</script>
<template>
    <div>
        <h4>Answer Questions</h4> <br>
        <div class="question-container">
        <div class="question-item" v-for="question in questions.unanswered" :key="question._id"> 
            {{question.questionName}}
            <button @click="ansQues(question._id)">AnswerThisQuestion</button><br>
        </div>
        </div>
        <hr>
        <h4>Answered Questions</h4> <br>
        <div class="question-container">
        <div class="question-item" v-for="question in questions.answered" :key="question._id"> 
            Question: {{question.questionName}} <br>
            Answer: {{question.answer}}
        </div>
        </div>
        <hr>
    </div>
</template>

<style>
.question-container {
    display: flex;
    flex-direction: column;
}
.question-item {
    background-color: var(--theme-color2);
    margin: 5px;
}
</style>