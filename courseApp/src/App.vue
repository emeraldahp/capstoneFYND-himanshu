<script>
import axios from 'axios'
export default {
    data() {
        return {
            myKey: 0,
            ready: false
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

                axios.get(import.meta.env.VITE_API_URL + '/roles/name',{headers:{Authorization:token}})
                    .then(res =>{
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
                    .catch((err) => {
                        console.log(err)
                        alert("Error: login again")
                        localStorage.removeItem("token")
                        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
                        this.$router.push({name:'home'})
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
    <div>
        <nav-bar/>
        <div v-if="this.$store.state.loading==true" class="loading">
            <div>
                <div class="spinner" ></div>
                <div class="loadtxt" >LOADING</div>
            </div>
        </div>
        <div>
            <RouterView :key="myKey" />
        </div>
    </div>
</template>

<style>

.loading {
    background-color: var(--theme-color1);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 20;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

}
.spinner {
    border: 5px solid var(--theme-color2) ;
    border-bottom: 5px solid var(--theme-color3);
    animation: spin 2s linear infinite;
    margin-bottom: 5px ;
    border-radius: 50%;
    height: 60px;
    width: 60px;
}
.loadtxt {
    animation: fadeIn .5s;
}

</style>