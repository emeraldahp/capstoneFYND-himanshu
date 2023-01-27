<script>
import CourseRender from "../components/CourseRender.vue"
import AskQuestion from "../components/AskQuestion.vue"

export default {
    name: "courseview",
    components: {
    CourseRender,
    AskQuestion
}
}
</script>
<template>
    <div>
        CourseView <br>
        <course-render/>
        <ask-question/>
    </div>

</template>