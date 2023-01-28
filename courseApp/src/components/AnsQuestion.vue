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
            ans: null

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
                    if(element.ans == null)
                        this.questions.unanswered.push(element)
                    else
                        this.questions.answered.push(element)
                })
            })
        },
        async ansQues(questionId) {
            this.ans = prompt("Enter Answer")
            console.log('hi',this.ans)
            if(this.ans != null) {
                const ansData = {
                    _id: questionId,
                    ans: this.ans
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
        Answer: {{question.ans}}
    </div>
</template>