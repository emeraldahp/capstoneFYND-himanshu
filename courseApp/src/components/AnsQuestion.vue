<script>
import axios from 'axios'
export default {
    data() {
        return {
            questions: {
                answered:[],
                unanswered: []
            },
            allQuestions: [],
            answer: null

        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            axios.get('http://localhost:8531/questions', {params:{tutorName: this.$store.state.tutorData.tutorName}}).then(res => {
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
                const response = await axios.patch('http://localhost:8531/questions', ansData)
                console.log(response)
            }

        }
    }
}
</script>
<template>
    {{allQuestions}} <br>
    {{this.ans}}
    AnswerQuestions <br>
    <div v-for="question in questions.unanswered" :key="question._id"> 
        {{question.questionName}}
        <button @click="ansQues(question._id)">AnswerThisQuestion</button><br>
    </div>

    AnsweredQuestions <br>
    <div v-for="question in questions.answered" :key="question._id"> 
        Question:{{question.questionName}} <br>
        Answer: {{question.answer}}
    </div>
</template>