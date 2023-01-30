<script>
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            path: ""
        }
    },

    methods: {
        logOut(type) {
            this.$store.dispatch(type + "LogOut")
            this.$router.push({name:'home'})
        },
        noOneLog() {
            if(this.$store.state.userData.loggedIn == false && 
               this.$store.state.tutorData.loggedIn == false && 
               this.$store.state.adminData.loggedIn == false)
                return true
            else
                return false
        }
        
    }
}
</script>
<template>
<div class = "nav">    
    <RouterLink to="/"> Home </RouterLink> 
    <div v-if="this.$store.state.userData.loggedIn == true">
        Welcome {{this.$store.state.userData.userName}} <br>
        <RouterLink to="/quesview"> MyQuestions </RouterLink> <br>
        <RouterLink to="/profileview">MyProfile</RouterLink> <br>
        <button @click="logOut('user')">LogOut</button>
    </div>
    <div v-else-if="this.$store.state.tutorData.loggedIn == true">
        Welcome {{this.$store.state.tutorData.tutorName}} <br>
        <button @click="logOut('tutor')">LogOut</button>
    </div>
    <div v-else-if="this.$store.state.adminData.loggedIn == true">
        Welcome {{this.$store.state.adminData.adminName}} <br>
        <button @click="logOut('admin')">LogOut</button>
    </div>
    <div v-if="noOneLog()">
        <RouterLink to="/loginview"> Login </RouterLink> <br>
    </div>
    <hr>
</div>
</template>