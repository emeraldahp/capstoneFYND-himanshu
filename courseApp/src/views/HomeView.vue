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
        <courses-list/>
    </div>
</template>