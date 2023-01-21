<script>
import CoursesList from "../components/CoursesList.vue"
import CourseCreator from "../components/CourseCreator.vue"
import { RouterLink } from 'vue-router'

export default {
    components:{
        CoursesList,
        CourseCreator
    }

}
</script>

<template>
    <div>
        courseApp HomePage<RouterLink to="/userlogin"> Login </RouterLink>
        <courses-list/>
        <course-creator/>
        
    </div>
</template>