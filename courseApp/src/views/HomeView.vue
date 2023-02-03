<script>
import CoursesList from "../components/CoursesList.vue"

export default {
    components:{
        CoursesList
    },
    mounted() {
        this.$store.commit("updateCourse", 'none')
        this.$store.commit("loadingStatus", true)

    }

}
</script>

<template>
    <div>
        <div class="home-view-container">
            <courses-list/>
        </div>
    </div>
</template>

<style>
@media (max-width: 600px) {
    .home-view-container {
        margin-top: 77px;
    }
}
</style>