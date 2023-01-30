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
        <course-render/>
        <ask-question/>
    </div>

</template>