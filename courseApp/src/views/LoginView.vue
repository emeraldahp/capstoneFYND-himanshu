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
        {{this.control}}
        LoginView <br>
        <div v-if="this.control.type=='login'">
            {{ this.control.for }}Login <br>
            <login-comp :loginType="this.control.for"></login-comp>
            <button @click="this.control.type='register'">Register {{ this.control.for }}</button>
        </div>
        <div v-if="this.control.type=='register'">
            {{ this.control.for }}Register <br>
            <register-comp :registerType="this.control.for"></register-comp>
            <button @click="this.control.type='login'">Login {{ this.control.for }}</button>
        </div>

        <br>
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
</template>