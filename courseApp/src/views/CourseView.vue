<script>
import CourseRender from "../components/CourseRender.vue"
import AskQuestion from "../components/AskQuestion.vue"

export default {
    name: "courseview",
    components: {
        CourseRender,
        AskQuestion
    },
    data() {
        return {
            askQuestionToggle: false,
            ready: false
        }
    },
    created() {

        if(this.$store.state.userData.courseName == 'none') {
            this.$router.push({path:'/'})
        }
        else {
            this.ready = true
        }
        this.$store.commit("sectionsPanelStatus",true)
        this.$store.commit("loadingStatus", true)
        
    }

}
</script>
<template>
    <div v-if="ready==true">
        <div class="course-view-container">
            <div class="course-render-comp"><course-render/>
                <button v-if="askQuestionToggle==false" @click="askQuestionToggle=true">Ask Question</button>
            </div>
            <div v-if="askQuestionToggle==true" class="bg-fade"></div>
            <div class="ask-question-comp" v-if="askQuestionToggle==true">
                <ask-question/>
                <div class="ask-question-comp-sepr" ></div>
                <div class="ask-question-comp-closebtn">
                    <button  v-if="askQuestionToggle==true" @click="askQuestionToggle=false">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.course-view-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.course-render-comp{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.bg-fade{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: black;
    opacity: 0.5;
    z-index: 5;
    animation: fadeInBG .5s;
}

.ask-question-comp {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    place-items: center;
    animation: fadeIn .5s;
}


.ask-question-comp-sepr {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 400px;
    background-color: var(--theme-color3);
    padding-bottom: 2px;
}

.ask-question-comp-closebtn {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 400px;
    background-color: var(--theme-color2);
    padding: 10px 0px 10px 0px;
}

@media (max-width: 600px) {
    .course-view-container {
        margin-top: 77px;
    }
}

</style>