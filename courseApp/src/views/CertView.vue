<script>
import CertRender from "../components/CertRender.vue"
export default {
    components: {
        CertRender
    },
    created() {
        if(this.$route.query._id==null)
            this.$router.push({name:'home'})
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

<style>
@media (max-width: 600px) {
    .cert-view-container {
        margin-top: 77px;
    }
}
</style>