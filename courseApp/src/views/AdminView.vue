<script>
import CourseCreator from '../components/CourseCreator.vue'
export default {
    name: 'admin',
    components: {
        CourseCreator
    },
    created() {
        if(this.$store.state.adminData.loggedIn == false)
            this.$router.push({name:'home'})

    }

}
</script>

<template>
    <div>
        <div class="admin-view-container">
            <course-creator/>
        </div>
    </div>
</template>

<style>
@media (max-width: 600px) {
    .admin-view-container {
        margin-top: 77px;
    }
}
    
</style>