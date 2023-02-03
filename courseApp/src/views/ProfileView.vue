<script>
import MyProfile from '../components/MyProfile.vue'
export default {
    components: {
        MyProfile
    },
    created() {
        
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

<style>

@media (max-width: 600px) {
    .profile-view-container {
        margin-top: 77px;
    }
}
</style>