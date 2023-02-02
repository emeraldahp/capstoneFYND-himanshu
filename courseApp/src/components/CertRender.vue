<script>
import axios from 'axios'

export default {
    data() {
        return {
            enrollment: {},
            tutorName: ""
        }
    },
    mounted() {
        const _id = this.$route.query._id
        axios.get(import.meta.env.VITE_API_URL + '/enrollments/certificate', {params:{_id}}).then(res=>{
            this.enrollment = res.data.data
            axios.get(import.meta.env.VITE_API_URL + '/courses/tutor', {params:{courseName:this.enrollment.courseName}}).then(res=>{
                this.tutorName = res.data.data
            })
        })
    }
}

</script>
<template>
    <div>
        <div class="certificate-view">
            <div class="certificate-container">
                <div class="certificate-item" ><h1>Certificate of Completion</h1></div>
                <div class="certificate-item">This is to certify that</div>
                <div class="certificate-item"><h2>{{enrollment.userName}}</h2></div>
                <div class="certificate-item">has successfully completed the course</div>
                <div class="certificate-item"><h2>{{enrollment.courseName}}</h2></div>
                <div class="certificate-item">Completion Date:</div>
                <div class="certificate-item"><h3>{{enrollment.finishDate}}</h3></div>
                <div class="certificate-item">ID: {{enrollment._id}}</div>
                <div class="certificate-item">Issue Date: {{enrollment.finishDate}}</div>
                <div class="certificate-item">Tutor: {{tutorName}}</div>
            </div>  
        </div> 
        <br>
        <hr>
    </div>
</template>

<style>

.certificate-view {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-top: 20px;
}

.certificate-container {
    display: flex;
    flex-direction: column;
    place-items: center;
    background-color: var(--theme-color2);
    max-width: 800px;
    padding: 5% 10% 5% 10%;
}
.certificate-item {
    padding: 10px;
}

</style>