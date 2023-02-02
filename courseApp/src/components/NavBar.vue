<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            path: "",
            panel: false //using this to add disp flex in nav2-cont 
                         //...while its none in script tag media query (while width less then given px)
                         //since inline priority is more it will be applied regardless
                         //while its medaia not active flex is default in script
                         //allow you to see nav2 while media active
        }
    },

    methods: {
        logOut(type) {
            localStorage.removeItem("token")
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
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
    <div>
        <div class = "navbar-container">  
            <div class="navbar2-home-container">
                <div class="navbar2sec-item" v-if="(this.$store.state.userData.loggedIn == true && this.$store.state.userData.courseName != 'none') || this.$store.state.adminData.loggedIn == true  " > 
                    <img class="sec-ico" src="../assets/secico.svg" > | 
                </div>
                <img class="home-ico" src="../assets/homeico.svg">
                <RouterLink to="/"> Home </RouterLink> 
            </div>

            <div class="navbar2-container" :style="panel ? 'display: flex' : ''"  v-if="this.$store.state.userData.loggedIn == true">
                <RouterLink to="/quesview"> MyQuestions </RouterLink>
                <RouterLink to="/profileview">MyProfile</RouterLink>
                <div class="navbar2-logout-item" >
                    Welcome {{this.$store.state.userData.userName}}
                    <button @click="logOut('user')">LogOut</button>
                </div>
            </div>
            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-else-if="this.$store.state.tutorData.loggedIn == true">
                <RouterLink to="/tutorview">AnsQuestions</RouterLink>
                <div class="navbar2-logout-item" >
                    Welcome {{this.$store.state.tutorData.tutorName}}
                    <button class="navbar2-logout-item" @click="logOut('tutor')">LogOut</button>
                </div>
            </div>
            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-else-if="this.$store.state.adminData.loggedIn == true">
                <RouterLink to="/adminview">CourseCreator</RouterLink>
                <div class="navbar2-logout-item" >
                    Welcome {{this.$store.state.adminData.adminName}}
                    <button class="navbar2-logout-item" @click="logOut('admin')">LogOut</button>
                </div>
            </div>

            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-if="noOneLog()">
                <div class="navbar2-login-item">
                <RouterLink to="/loginview"> Login </RouterLink>
                </div>
            </div>

            <div class="navbar2opt-container">
                <img class="opt-ico" @click="panel = panel ? false : true" src="../assets/optico.svg">
            </div>

        </div>
        <hr>
    </div>
</template>

<style>
.navbar-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    height: 40px;
    gap: 10px;
}

.navbar2-home-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 5px;
    flex-basis: auto;
}

.navbar2sec-item {
    display: none;
    flex-direction: row;
    place-items: center;
    gap: 5px;
}

.navbar2-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 10px;
    flex-grow: 1;
}

.navbar2-login-item,
.navbar2-logout-item {
    display: flex;
    flex-direction: row;
    place-items: center;
    margin-left: auto; /*to place logout, login send to end*/
    gap: 10px;
}

.navbar2opt-container {
    display: none;
    flex-direction: row;
    place-items: center;
    margin-left: auto;
    gap: 5px;
    
}

.sec-ico {
    width: 35px;
    height: 35px;
}

.home-ico {
    width: 35px;
    height: 35px;
}

.opt-ico {
    width: 35px;
    height: 35px;
}

@media (max-width: 600px) {

    .navbar2sec-item{
        display: flex;
    }

    .navbar2opt-container{
        display: flex;
    }

    .navbar2-container{
        display: none;
    }

    .navbar2-container {
        background-color: var(--theme-color1);
        position: fixed;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        top: 60px;
        left: 0;
        z-index: 35;
        gap: 20px;
        padding-top: 20px;
        font-size: 24px;
    }
    .navbar2-login-item,
    .navbar2-logout-item {
        flex-direction: column;
    }

}




</style>