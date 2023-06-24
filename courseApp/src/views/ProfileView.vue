<script>
import MyProfile from '../components/MyProfile.vue'
export default {
    components: {
        MyProfile
    },
    created() {
        this.$store.commit("updateCourse", 'none')
        if(this.$store.state.userData.loggedIn == false)
            this.$router.push({name:'home'})
        this.$store.commit("loadingStatus", true)  
    }
}
</script>
<template>
    <div>
        <div class="profile-view-container">
            <my-profile/> 
        </div>
    </div>
</template>