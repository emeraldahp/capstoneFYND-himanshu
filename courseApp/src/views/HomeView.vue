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
        <RouterLink to="/loginview"> Login </RouterLink> <br>
        <RouterLink to="/quesview"> MyQuestions </RouterLink> <br>
        <courses-list/>
        
    </div>
</template>