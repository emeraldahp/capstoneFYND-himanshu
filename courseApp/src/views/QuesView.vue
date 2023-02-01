<script>
import MyQuestions from '../components/MyQuestions.vue'
export default {
    components: {
        MyQuestions
    },
    created() {
        if(this.$store.state.userData.loggedIn == false) {
            alert("Unauthorized")
            this.$router.push({path:'/'})
        }
    }
}
</script>
<template>
    <my-questions/>
</template>