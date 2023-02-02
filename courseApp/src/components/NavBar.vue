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
                    <img class="sec-ico" src="../assets/secico.svg" > Sections 
                </div>
                <img class="home-ico" src="../assets/homeico.svg">
                <RouterLink @click="panel=false" to="/"> Home </RouterLink> 
            </div>

            <div class="navbar2-container" :style="panel ? 'display: flex' : ''"  v-if="this.$store.state.userData.loggedIn == true">
                <RouterLink class="navbar2-link-item" @click="panel=false" to="/quesview"> MyQuestions </RouterLink>
                <RouterLink class="navbar2-link-item" @click="panel=false" to="/profileview">MyProfile</RouterLink>
                <div class="navbar2-logout-item" >
                    <div class="navbar2-logout-item-txt">Welcome {{this.$store.state.userData.userName}}</div>
                    <button @click="panel=false; logOut('user')">LogOut</button>
                </div>
            </div>
            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-else-if="this.$store.state.tutorData.loggedIn == true">
                <RouterLink class="navbar2-link-item" @click="panel=false" to="/tutorview">AnsQuestions</RouterLink>
                <div class="navbar2-logout-item" >
                    Welcome {{this.$store.state.tutorData.tutorName}}
                    <button @click="panel=false; logOut('tutor')">LogOut</button>
                </div>
            </div>
            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-else-if="this.$store.state.adminData.loggedIn == true">
                <RouterLink class="navbar2-link-item" @click="panel=false" to="/adminview">CourseCreator</RouterLink>
                <div class="navbar2-logout-item" >
                    Welcome {{this.$store.state.adminData.adminName}}
                    <button @click="panel=false; logOut('admin')">LogOut</button>
                </div>
            </div>

            <div class="navbar2-container" :style="panel ? 'display: flex' : ''" v-if="noOneLog()">
                <div class="navbar2-login-item">
                    <RouterLink class="navbar2-link-item" @click="panel=false" to="/loginview"> Login </RouterLink>
                </div>
            </div>

            <div @click="panel = panel ? false : true" class="navbar2opt-container">
                Options
                <img class="opt-ico"  src="../assets/optico.svg">
            </div>

        </div>
        <hr class="navbar-sepr">
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
    height: 37px;
    flex-basis: auto;
}

.navbar2sec-item {
    display: none;
    flex-direction: row;
    place-items: center;
    gap: 5px;
    font-size: 20px;
    text-decoration: underline;
}

.navbar2-container {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 5px;
    height: 37px;
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

.navbar2-logout-item-txt {
    overflow: hidden;
    max-width: 150px;
}

.navbar2opt-container {
    display: none;
    flex-direction: row;
    place-items: center;
    margin-left: auto;
    margin-right: 10px;
    gap: 5px;
    font-size: 20px;
    text-decoration: underline;
    
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
    .navbar-sepr {
        position: fixed;
        width: 100%;
        top: 48px;
        z-index: 2;
        background-color: var(--theme-color1);
    }

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
        z-index: 1;
        gap: 15px;
        padding-top: 20px;
        font-size: 24px;
    }

    .navbar2-logout-item {
        flex-direction: column;
        align-items: flex-end;
        margin-right:5px;
        padding: 5px 10px 10px 80px;
        border-right: solid 3px;
        border-color: var(--theme-color3);
        background-color: var(--theme-color2);
        background: linear-gradient(90deg, var(--theme-color1) 0%, var(--theme-color2) 100%);

    }

    .navbar2-link-item {
        margin-right:5px;
        border-right: solid 3px;
        padding: 5px 10px 10px 100px;
        border-color: var(--theme-color3);
        padding-right: 10px;
        background-color: var(--theme-color2);
        background: linear-gradient(90deg, var(--theme-color1) 0%, var(--theme-color2) 100%);
    }

    .navbar2-home-container {
        font-size: 20px;
    }

}




</style>