<script>
import AnsQuestion from '../components/AnsQuestion.vue'
export default {
    components:{
        AnsQuestion
    },
    created() {
        if(this.$store.state.tutorData.loggedIn == false)
            this.$router.push({name:'home'})
    }
}
</script>
<template>
    <div>
        <div class="tutor-view-container">
            <ans-question/>
        </div>
    </div>
</template>