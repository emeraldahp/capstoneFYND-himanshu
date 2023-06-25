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
        this.$store.commit("sectionsPanelStatus",true)
        this.$store.commit("loadingStatus", true)
    },
    methods: {
        toggleNavBar() {
            this.$emit('toggleNavBar');
        }
    },

}
</script>

<template>
    <div>
        <div class="admin-view-container">
            <course-creator @toggleNavBar="toggleNavBar" />
        </div>
    </div>
</template>