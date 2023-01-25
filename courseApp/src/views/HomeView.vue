<script>
import CoursesList from "../components/CoursesList.vue"
import { RouterLink } from 'vue-router'

export default {
    components:{
        CoursesList
    }

}
</script>

<template>
    <div>
        courseApp HomePage <br> 
        <RouterLink to="/userlogin"> Login </RouterLink> <br>
        <courses-list/>
        
    </div>
</template>