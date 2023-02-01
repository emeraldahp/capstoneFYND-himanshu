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
                <div class="login-reg-btn-item">
                    Create an account. <br>
                    <button @click="this.control.type='register'">Register {{ this.control.for }}</button>
                </div>
            </div>
            <div v-if="this.control.type=='register'">
                <register-comp :registerType="this.control.for"></register-comp> <br>
                <div class="login-reg-btn-item">
                    Already have an account?<br>
                    <button @click="this.control.type='login'">Login {{ this.control.for }}</button>
                </div>
            </div>
        </div>
        <br>
        <div class="login-options-container">
            <div>Other login options.</div>
            <div class="login-options">
                <div v-if="this.control.for == 'user' || this.control.for == 'admin'">
                    <button @click="this.control.for = 'tutor'; this.control.type ='login'">Login as Tutor</button>
                </div>
                <div v-if="this.control.for == 'user' || this.control.for == 'tutor'">
                    <button @click="this.control.for = 'admin'; this.control.type ='login'">Login as Admin</button>
                </div>
                <div v-if="this.control.for == 'tutor' || this.control.for == 'admin'">
                    <button @click="this.control.for = 'user'; this.control.type ='login'">Login as User</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.login-options-container {
    display: flex;
    flex-direction: column;
    place-items: center;
    background-color: var(--theme-color2);
    gap: 5px;
}
.login-options {
    display:flex ;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    padding: 5px;
}
.login-container {
    display:flex;
    justify-content: center;
    animation: fadeIn 1s;
}
.login-reg-btn-item {
    background-color: var(--theme-color2);
    padding: 10px 10px 10px 10px;
    margin: 5px;
}
</style>