<script>
import LoginComp from '../components/LoginComp.vue'
import RegisterComp from '../components/RegisterComp.vue'


export default {
    name: 'loginview',
    components: {
        LoginComp,
        RegisterComp
    },
    data() {
        return {
            control: {
                type: 'login',
                for: 'user'
            }
        }
    }
}

</script>

<template>
    <div>
        <div class="login-container">
            <div v-if="this.control.type=='login'">
                <login-comp :loginType="this.control.for"></login-comp> <br>
                <button @click="this.control.type='register'">Register {{ this.control.for }}</button>
            </div>
            <div v-if="this.control.type=='register'">
                <register-comp :registerType="this.control.for"></register-comp> <br>
                <button @click="this.control.type='login'">Login {{ this.control.for }}</button>
            </div>
        </div>
        <br>
        <div class="login-options">
            <div v-if="this.control.for == 'user' || this.control.for == 'admin'">
                <button @click="this.control.for = 'tutor' ">Login as Tutor</button>
            </div>
            <div v-if="this.control.for == 'user' || this.control.for == 'tutor'">
                <button @click="this.control.for = 'admin'">Login as Admin</button>
            </div>
            <div v-if="this.control.for == 'tutor' || this.control.for == 'admin'">
                <button @click="this.control.for = 'user'">Login as User</button>
            </div>
        </div>
    </div>
    <div>
        <hr>
        Debug:
        login Info User {{this.$store.state.userData}} <br>
        login Info tutor {{this.$store.state.tutorData}} <br>
        login Info admin {{this.$store.state.adminData}} <br>
        {{this.control}}
    </div>
</template>

<style>
.login-options {
    display:flex ;
    flex-direction: row;
    justify-content: center;
}
.login-container {
    display:flex;
    justify-content: center;
}
</style>