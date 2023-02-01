<script>
import axios from 'axios'
export default {
    data() {
        return {
            myKey: 0
        }
    },
    created() {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        console.log('app created')

        if(this.$store.state.userData.loggedIn == false && 
            this.$store.state.tutorData.loggedIn == false && 
            this.$store.state.adminData.loggedIn == false) {
            console.log("noOnelog")
            if(token != null) {
                console.log("token yes")

                axios.get(import.meta.env.VITE_API_URL + '/roles/name',{headers:{Authorization:token}}).then(res =>{
                    console.log(res)
                    if(res.data.data.role=='user') {
                        this.$store.commit("updateUser", res.data.data.name)
                        this.$store.commit("userLog", true)
                    }
                    else if(res.data.data.role=='tutor') {
                        this.$store.commit("updateTutor", res.data.data.name)
                        this.$store.commit("tutorLog", true)
                    }
                    else if(res.data.data.role=='admin') {
                        this.$store.commit("updateAdmin", res.data.data.name)
                        this.$store.commit("adminLog", true)
                    }
                    this.forceRerender()
                })

            }
        }
    },
    methods: {
        forceRerender() {
            this.myKey++
        }
    }
}
</script>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>


<template>    
    <nav-bar/>
    <RouterView :key="myKey" />
</template>

