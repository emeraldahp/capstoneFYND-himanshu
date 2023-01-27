<script>

export default {
    name: "registercomp",
    props: {
        registerType:{}
    },
    data() {
        return {
            registerData: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async userRegister() {
            console.log("userRegister", this.registerData)
        },
        async tutorRegister() {
            console.log("tutorRegister", this.registerData)
        },
        async adminRegister() {
            console.log("adminRegister", this.registerData)
        }

    }
}
</script>
<template>
    <div>
        Register Form
        <form @submit.prevent="">
        Enter {{registerType}}name: <input type="text" v-model="this.registerData.name"> <br>
        Enter email: <input type="text" v-model="this.registerData.email"> <br>
        Enter password: <input type="text" v-model="this.registerData.password"> <br>
        <button v-if="registerType=='user'" @click="userRegister">UserRegister</button>  
        <button v-if="registerType=='tutor'" @click="tutorRegister">TutorRegister</button>  
        <button v-if="registerType=='admin'" @click="adminRegister">AdminRegister</button>      
    </form> 
    </div>
</template>