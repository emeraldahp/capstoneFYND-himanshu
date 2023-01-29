<script>
import axios from 'axios'

export default {
    name: "registercomp",
    props: {
        registerType:{}
    },
    data() {
        return {
            valid: {
                nameMsg: "none"
            },
            check: {
                typeList:[]
            },
            registerData: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    mounted() {
        if(this.registerType == "user") axios.get(import.meta.env.VITE_API_URL + '/users/list').then(res => {
            this.check.typeList = res.data.data
        })
        else if(this.registerType == "tutor") axios.get(import.meta.env.VITE_API_URL + '/tutors/list').then(res => {
            this.check.typeList = res.data.data
        })
        else if(this.registerType == "admin")axios.get(import.meta.env.VITE_API_URL + '/admins/list').then(res => {
            this.check.typeList = res.data.data
        })
    },
    watch: {
        "registerData.name": function(value) {
            if(this.check.typeList.includes(value))
                this.valid.nameMsg = 'notAvailable'
            else
                this.valid.nameMsg = 'available'
        }
    },
    methods: {
        async userRegister() {
            console.log("userRegister", this.registerData)
            if(this.valid.nameMsg == 'available') {
                let userPost = {
                    userName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                }    
                const response = await axios.post(import.meta.env.VITE_API_URL + '/users/register', userPost)
                console.log(response)
                this.$router.push({name: 'home'})
            }
        },
        async tutorRegister() {
            console.log("tutorRegister", this.registerData)
            if(this.valid.nameMsg == 'available') {
                let tutorPost = {
                    tutorName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                }    
                const response = await axios.post(import.meta.env.VITE_API_URL + '/tutors/register', tutorPost)
                console.log(response)
                this.$router.push({name: 'home'})
            }
        },
        async adminRegister() {
            console.log("adminRegister", this.registerData)
            if(this.valid.nameMsg == 'available') {
                let adminPost = {
                    adminName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                }    
                const response = await axios.post(import.meta.env.VITE_API_URL + '/admins/register', adminPost)
                console.log(response)
                this.$router.push({name: 'home'})
            }
            
        }

    }
}
</script>
<template>
    <div>
        Register Form
        <form @submit.prevent="">
        Enter {{registerType}}name: <input type="text" v-model="this.registerData.name"> {{valid.nameMsg}} <br>
        Enter email: <input type="text" v-model="this.registerData.email"> <br>
        Enter password: <input type="text" v-model="this.registerData.password"> <br>
        <button v-if="registerType=='user'" @click="userRegister">UserRegister</button>  
        <button v-if="registerType=='tutor'" @click="tutorRegister">TutorRegister</button>  
        <button v-if="registerType=='admin'" @click="adminRegister">AdminRegister</button>      
    </form> 
    </div>
</template>