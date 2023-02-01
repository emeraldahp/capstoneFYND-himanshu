<script>
import AnsQuestion from '../components/AnsQuestion.vue'
export default {
    components:{
        AnsQuestion
    },
    created() {
        if(this.$store.state.tutorData.loggedIn == false) {
            alert("Unauthorized")
            this.$router.push({path:'/'})
        }
    }
}
</script>
<template>
    <div>
        <ans-question/>
    </div>
</template>