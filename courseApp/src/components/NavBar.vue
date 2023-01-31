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
<div class = "navbar-container">  

    <div class="navbar2-home-container">
        <img class="home-ico" src="../assets/homeico.svg">
        <RouterLink to="/"> Home </RouterLink> 
    </div>

    <div class="navbar2-container" v-if="this.$store.state.userData.loggedIn == true">
        <RouterLink to="/quesview"> MyQuestions </RouterLink>
        <RouterLink to="/profileview">MyProfile</RouterLink>
        <div class="navbar2-logout-item" >
            Welcome {{this.$store.state.userData.userName}}
            <button @click="logOut('user')">LogOut</button>
        </div>
    </div>
    <div class="navbar2-container" v-else-if="this.$store.state.tutorData.loggedIn == true">
        Welcome {{this.$store.state.tutorData.tutorName}}
        <button class="navbar2-logout-item" @click="logOut('tutor')">LogOut</button>
    </div>
    <div class="navbar2-container" v-else-if="this.$store.state.adminData.loggedIn == true">
        Welcome {{this.$store.state.adminData.adminName}}
        <button class="navbar2-logout-item" @click="logOut('admin')">LogOut</button>
    </div>

    <div class="navbar2-container" v-if="noOneLog()">
        <RouterLink to="/loginview"> Login </RouterLink>
    </div>

</div>
<hr>
</template>

<style>
.navbar-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 10px;
}

.navbar2-home-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 5px;
    flex-basis: auto;
}

.navbar2-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 10px;
    flex-grow: 1;
}

.navbar2-logout-item {
    display: flex;
    flex-direction: row;
    place-items: center;
    margin-left: auto; /*to place logout send to end*/
    gap: 10px;
}

.home-ico {
    width: 30px;
    height: 30px;
}



</style>