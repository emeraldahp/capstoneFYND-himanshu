<script>
import CourseCreator from '../components/CourseCreator.vue'
export default {
    name: 'admin',
    components: {
        CourseCreator
    },
    created() {
        if(this.$store.state.adminData.loggedIn == false) {
            alert("Unauthorized")
            this.$router.push({path:'/'})
        }
    }

}
</script>

<template>
<div>
    <course-creator/>
</div>
</template>