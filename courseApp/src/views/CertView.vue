<script>
import CertRender from "../components/CertRender.vue"
export default {
    components: {
        CertRender
    },
    created() {
        if(this.$route.query._id==null)
            this.$router.push({name:'home'})
        this.$store.commit("loadingStatus", true)
    }
}

</script>
<template>
    <div>
        <div class="cert-view-container">
            <cert-render/>
        </div>
    </div>
</template>