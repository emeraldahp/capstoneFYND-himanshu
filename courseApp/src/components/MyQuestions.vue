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
        MyQuestions <br>
        {{questions}}
        DeleteButton
    </div>
</template>