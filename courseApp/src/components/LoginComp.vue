<script>
import axios from 'axios'
export default {
    name: "logincomp",
    props: {
        loginType:{}
    },
    data() {
        return {
            loginData: {
                name:"",
                password:""
            }
        }
    },
    methods: {
        async userLogin(){
            console.log("login function")
            const userData = {
                userName: this.loginData.name,
                password: this.loginData.password
            } 
            const response = await axios.post('http://localhost:8531/users/login', userData)
            console.log(response)
            alert(response.data.data.status)
            if(response.data.data.status == "loginsuccess") {   
                this.$store.commit("updateUser", response.data.data.userName)
                this.$store.commit("userLog", true)
                this.$router.push({name:'home'})
            }
        },
        async tutorLogin() {
            console.log("tutor login function")
            const tutorData = {
                tutorName: this.loginData.name,
                password: this.loginData.password
            }
            const response = await axios.post('http://localhost:8531/tutors/login', tutorData)
            console.log(response)
            alert(response.data.data.status)
            if(response.data.data.status == "loginsuccess") {
                this.$store.commit("updateTutor", response.data.data.tutorName)
                this.$store.commit("tutorLog", true)
            }
        },
        async adminLogin() {
            console.log("admin login function")
            const adminData = {
                adminName: this.loginData.name,
                password: this.loginData.password
            }
            const response = await axios.post('http://localhost:8531/admins/login', adminData)
            console.log(response)
            alert(response.data.data.status)
            if(response.data.data.status == "loginsuccess") {
                this.$store.commit("updateAdmin", response.data.data.adminName)
                this.$store.commit("adminLog", true)
            }
        }
    }
}
</script>

<template>
    <div>
        Login Form type:{{loginType}}
        <form @submit.prevent = "">
            {{loginType}}name: <input type="text" v-model="this.loginData.name"> <br>
            Password: <input type="text" v-model="this.loginData.password"> <br>
            <button v-if="loginType=='user'" v-on:click="userLogin">User Login</button>
            <button v-if="loginType=='tutor'" v-on:click="tutorLogin">Tutor Login</button>
            <button v-if="loginType=='admin'" v-on:click="adminLogin">Admin login</button>
        </form>      
    </div>
</template>