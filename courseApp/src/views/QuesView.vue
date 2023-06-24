<script>
import MyQuestions from '../components/MyQuestions.vue'
export default {
    components: {
        MyQuestions
    },
    created() {
        this.$store.commit("updateCourse", 'none')
        if(this.$store.state.userData.loggedIn == false)
            this.$router.push({name:'home'})
    }
}
</script>
<template>
    <div>
        <div class="ques-view-container">
            <my-questions/>
        </div>
    </div>
</template>