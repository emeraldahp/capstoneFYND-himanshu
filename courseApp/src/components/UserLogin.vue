<script>
import axios from 'axios'
export default {
    name: "userlogin",
    data() {
        return {
            loginData: {
                userName:"",
                password:""
            }
        }
    },
    methods: {
        async login(){
            console.log("login function")
            const response = await axios.post('http://localhost:8531/users/login', this.loginData)
            console.log(response)
            alert(response.data.data.status)
            if(response.data.data.status == "loginsuccess") {   
                this.$store.commit("updateUser", response.data.data.userName)
                this.$router.push({name:'home'})
            }
        }
    }
}
</script>

<template>
    <div>
        UserLogin {{loginData.password}} {{loginData.userName}}
        <form @submit.prevent = "">
            Username: <input type="text" v-model="loginData.userName">
            Password: <input type="text" v-model="loginData.password">
            <button v-on:click="login">Login</button>
        </form>
    </div>
</template>