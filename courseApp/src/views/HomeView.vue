<script>
import CoursesList from "../components/CoursesList.vue"
import CourseCreator from "../components/CourseCreator.vue"
export default {
    components:{
        CoursesList,
        CourseCreator
    }

}
</script>

<template>
    <div>
        courseApp HomePage
        <courses-list/>
        <course-creator/>
    </div>
</template>