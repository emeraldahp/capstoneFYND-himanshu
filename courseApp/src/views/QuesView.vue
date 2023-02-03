<script>
import MyQuestions from '../components/MyQuestions.vue'
export default {
    components: {
        MyQuestions
    },
    created() {
        
    }
}
</script>
<template>
    <div>
        <div class="ques-view-container">
            <my-questions/>
        </div>
    </div>
</template>

<style>
@media (max-width: 600px) {
    .ques-view-container{
        margin-top: 77px;
    }
}

</style>