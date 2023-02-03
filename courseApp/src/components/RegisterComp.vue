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
                password: "",
                password2: ""
            }
        }
    },
    mounted() {
        this.$store.commit("loadingStatus", true)
        if(this.registerType == "user") axios.get(import.meta.env.VITE_API_URL + '/users/list').then(res => {
            this.check.typeList = res.data.data
            this.$store.commit("loadingStatus", false)
        }).catch(err=>{
            alert('failed to get userlist')
            this.$router.push({name:'home'})
        })
        else if(this.registerType == "tutor") axios.get(import.meta.env.VITE_API_URL + '/tutors/list').then(res => {
            this.check.typeList = res.data.data
            this.$store.commit("loadingStatus", false)
        }).catch(err=>{
            alert('failed to get tutor list')
            this.$router.push({name:'home'})
        })
        else if(this.registerType == "admin")axios.get(import.meta.env.VITE_API_URL + '/admins/list').then(res => {
            this.check.typeList = res.data.data
            this.$store.commit("loadingStatus", false)
        }).catch(err=>{
            alert('failed to get admin list')
            this.$router.push({name:'home'})
        })
    },
    watch: {
        "registerData.name": function(value) {
            if(this.check.typeList.includes(value))
                this.valid.nameMsg = 'notAvailable'
            else if(!value.trim().length) {
                this.valid.nameMsg = 'cantBeEmpty'
            }
            else if(value[0] == ' '){
                this.valid.nameMsg = 'firstCharEmpty'
            }
            else
                this.valid.nameMsg = 'available'
        }
    },
    methods: {
        async userRegister() {
          
            const err = this.validate()
            if(err != 'none'){
                alert(err)
                return
            }
            if(this.valid.nameMsg == 'available') {
                let userPost = {
                    userName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                } 
                this.$store.commit("loadingStatus", true)  
                const response = await axios.post(import.meta.env.VITE_API_URL + '/users/register', userPost)
                if(response.data.data.status = "success")
                    alert("User Registered Successfully.")
                else
                    alert("Failed.")
            
                this.$store.commit("loadingStatus", false)
                this.$router.push({name: 'home'})
            }
        },
        async tutorRegister() {
      
            const err = this.validate()
            if(err != 'none'){
                alert(err)
                return
            }
            if(this.valid.nameMsg == 'available') {
                let tutorPost = {
                    tutorName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                } 
                this.$store.commit("loadingStatus", true)   
                const response = await axios.post(import.meta.env.VITE_API_URL + '/tutors/register', tutorPost)
                if(response.data.data.status = "success")
                    alert("Tutor Registered Successfully.")
                else
                    alert("Failed.")
          
                this.$store.commit("loadingStatus", false)  
                this.$router.push({name: 'home'})
            }
        },
        async adminRegister() {
         
            const err = this.validate()
            if(err != 'none'){
                alert(err)
                return
            }
            if(this.valid.nameMsg == 'available') {
                let adminPost = {
                    adminName: this.registerData.name,
                    email: this.registerData.email,
                    password: this.registerData.password
                }    
                this.$store.commit("loadingStatus", true)  
                const response = await axios.post(import.meta.env.VITE_API_URL + '/admins/register', adminPost)
                if(response.data.data.status = "success")
                    alert("Admin Registered Successfully.")
                else
                    alert("Failed.")
              
                this.$store.commit("loadingStatus", true)  
                this.$router.push({name: 'home'})
            }
            
        },
        validate() {
            let err = "none"
            //Uppercase and lowercase letters (A-Z and a-z)
            //Numeric characters (0-9)
            //Special characters - ! # $ % & ' * + - / = ? ^ _ ` { | } ~
            //Period, dot, or full stop (.) with the condition that it cannot be the first or 
            //last letter of the email and cannot repeat one after another.
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!this.registerData.email.match(validRegex))
                err = "Invalid email."
            else if (this.registerData.password.length<6)
                err = "Password too small. Password min length is 6."
            else if (this.registerData.password.trim().length<6)
                err = "Password can't be empty."
            else if (this.registerData.password != this.registerData.password2)
                err = "Password didn't match."
            else if (this.registerData.name.trim() == '')
                err = "Please enter a name."
            else if (this.registerData.name.length > 30)
                err = "Name too long. Max Length 30."
            return err
        }

    }
}
</script>
<template>
    <div>
        <div class="register-form">
            <h3> <span class="register-type-text">{{registerType}}</span> Registration </h3>
            <form @submit.prevent="">
            Enter <span class="register-type-text">{{registerType}}</span>name <br>
            <input type="text" placeholder="Enter your name." v-model="this.registerData.name"> <br>Message: {{valid.nameMsg}} <br><br>
            Enter Email <br>
            <input type="text" placeholder="Enter your email." v-model="this.registerData.email"> <br> <br>
            Enter Password <br>
            <input type="password" placeholder="Enter your password." v-model="this.registerData.password"> <br> <br>
            Confirm Password <br>
            <input type="password" placeholder="Confirm password." v-model="this.registerData.password2"> <br> <br>
            <button v-if="registerType=='user'" @click="userRegister">User Register</button>  
            <button v-if="registerType=='tutor'" @click="tutorRegister">Tutor Register</button>  
            <button v-if="registerType=='admin'" @click="adminRegister">Admin Register</button>      
            </form> 
        </div>
    </div>
</template>

<style>
.register-type-text{
    text-transform: capitalize ;
}
.register-form {
    background: var(--theme-color2);
    padding: 10px 10px 10px 10px;
    margin: 5px;
}
</style>