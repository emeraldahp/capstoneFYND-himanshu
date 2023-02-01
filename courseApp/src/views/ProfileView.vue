<script>
import MyProfile from '../components/MyProfile.vue'
export default {
    components: {
        MyProfile
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
    <my-profile/>
</template>