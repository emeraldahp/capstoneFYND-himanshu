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
            this.$store.commit("loadingStatus", true)
            try {
                const userData = {
                    userName: this.loginData.name,
                    password: this.loginData.password
                } 
                const response = await axios.post(import.meta.env.VITE_API_URL + '/users/login', userData)
    
                alert(response.data.data.status)
                if(response.data.data.status == "loginsuccess") {   
                    localStorage.setItem('token', response.data.data.token)
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                    this.$store.commit("updateUser", response.data.data.userName)
                    this.$store.commit("userLog", true)
                    this.$store.commit("loadingStatus", false)
                    this.$router.push({name:'home'})
                }
                this.$store.commit("loadingStatus", false)
            }
            catch(err) {
                alert(err.message)
                this.$store.commit("loadingStatus", false)
            }
        },
        async tutorLogin() {
            this.$store.commit("loadingStatus", true)
            try {
                const tutorData = {
                    tutorName: this.loginData.name,
                    password: this.loginData.password
                }
                const response = await axios.post(import.meta.env.VITE_API_URL + '/tutors/login', tutorData)
    
                alert(response.data.data.status)
                if(response.data.data.status == "loginsuccess") {
                    localStorage.setItem('token', response.data.data.token)
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                    this.$store.commit("updateTutor", response.data.data.tutorName)
                    this.$store.commit("tutorLog", true)
                    this.$store.commit("loadingStatus", false)
                    this.$router.push({name:'tutorview'})
                }
                this.$store.commit("loadingStatus", false)
            }
            catch(err) {
                alert(err.message)
                this.$store.commit("loadingStatus", false)
            }
        },
        async adminLogin() {
            this.$store.commit("loadingStatus", true)
            try {
                const adminData = {
                    adminName: this.loginData.name,
                    password: this.loginData.password
                }
                const response = await axios.post(import.meta.env.VITE_API_URL + '/admins/login', adminData)
        
                alert(response.data.data.status)
                if(response.data.data.status == "loginsuccess") {
                    localStorage.setItem('token', response.data.data.token)
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                    this.$store.commit("updateAdmin", response.data.data.adminName)
                    this.$store.commit("adminLog", true)
                    this.$store.commit("setAdminVerified", response.data.data.verified)
                    if(response.data.data.verified==false) alert('NotVerified: Only testing allowed and cannot post courses. Please Contact: SuperAdmin')
                    this.$router.push({name:'adminview'})
                    
                }
                this.$store.commit("loadingStatus", false)
            }
            catch(err) {
                alert(err.message)
                this.$store.commit("loadingStatus", false)
            }
            
        }
    }
}
</script>

<template>
    <div>
        <div class="login-form">
            <h3> <span class="login-type-text">{{loginType}}</span> Login </h3>
            <form @submit.prevent = "">
                <span class="login-type-text">{{loginType}}</span>name: <br> 
                <input type="text" placeholder="Enter your name." v-model="this.loginData.name"> <br> <br>
                Password: <br> 
                <input type="password" placeholder="Enter your password." v-model="this.loginData.password"> <br> <br>
                <button v-if="loginType=='user'" v-on:click="userLogin">User Login</button>
                <button v-if="loginType=='tutor'" v-on:click="tutorLogin">Tutor Login</button>
                <button v-if="loginType=='admin'" v-on:click="adminLogin">Admin login</button>
            </form>      
        </div>
    </div>
</template>

<style>

.login-type-text {
    text-transform: capitalize ;
}
.login-form {
    background: var(--theme-color2);
    padding: 10px 10px 10px 10px;
    margin: 5px;
}

</style>