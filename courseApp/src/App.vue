<script>
import axios from 'axios'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

export default {

    components: {
        NavBar
    },

    data() {
        return {
            myKey: 0,
            ready: false
        }
    },
    created() {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
     

        if(this.$store.state.userData.loggedIn == false && 
            this.$store.state.tutorData.loggedIn == false && 
            this.$store.state.adminData.loggedIn == false) {
    
            if(token != null) {
           

                axios.get(import.meta.env.VITE_API_URL + '/roles/name',{headers:{Authorization:token}})
                    .then(res =>{
                   
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
                            this.$store.commit("setAdminVerified", res.data.data.verified)
                        }
                        //this.forceRerender()
                        
                    })
                    .catch((err) => {
              
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



<template>   
    <div>
        <div class="nav-bar" >
            <nav-bar/>
        </div>
        <div class="router-area" >
            <div v-if="this.$store.state.loading==true" class="loading-container">
                <div class="spinner" ></div>
                <div class="loadtxt" >LOADING</div>
            </div>
            <div v-show="this.$store.state.loading==false" class="router-view" >
                <RouterView :key="myKey" />
            </div>
        </div>
    </div>
</template>

<style>

.nav-bar {
    height: 50px;
}

.loading-container {
    background-color:var(--theme-color1);
    width: 100%;
    height: auto;
    z-index: 20;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.spinner {
    border: 5px solid var(--theme-color2) ;
    border-bottom: 5px solid var(--theme-color3);
    animation: spin 2s linear infinite;
    margin-top: 50px;
    margin-bottom: 5px ;
    border-radius: 50%;
    height: 60px;
    width: 60px;
}
.loadtxt {
    animation: fadeIn .5s;
}

@media (max-width: 600px) {
    .nav-bar {
        position: fixed;
        width: 100%;
        height: 60px;
        top: 0;
        left: 0;
        min-width: var(--min-width-nav);
        z-index: 40;
        padding-top:8px ;
        padding-left: 8px;
        background-color: var(--theme-color1);
    }

    .router-area {
        margin-top: 77px;
    }

    .loading-container {
        margin-top: 77px;
    }

}

</style>