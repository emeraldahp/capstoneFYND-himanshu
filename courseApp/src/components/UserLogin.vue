<script>
import axios from 'axios'
export default {
    name: "userlogin",
    data() {
        return {
            loginData: {
                username:"",
                password:""
            }
        }
    },
    methods: {
        async login(){
            console.log("login function")
            const response = await axios.post('http://localhost:8531/users/login', this.loginData)
            console.log(response)
        }
    }
}
</script>

<template>
    <div>
        UserLogin {{loginData.password}} {{loginData.username}}
        <form @submit.prevent = "">
            Username: <input type="text" v-model="loginData.username">
            Password: <input type="text" v-model="loginData.password">
            <button v-on:click="login">Login</button>
        </form>
    </div>
</template>